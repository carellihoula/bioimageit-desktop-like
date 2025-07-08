import { renderHook } from "@testing-library/react";
import { useCopyPaste } from "./useCopyPaste";
import { act } from "react";
import { vi, describe, expect, it, beforeEach } from "vitest";
import type { ReactFlowInstance, Node } from "@xyflow/react";

const mockGetNodes = vi.fn<() => Node[]>(() => []);
const mockSetNodes =
  vi.fn<(payload: Node[] | ((nodes: Node[]) => Node[])) => void>();

const mockRfInstance: Partial<ReactFlowInstance> = {
  getNodes: mockGetNodes,
  setNodes: mockSetNodes,
};

describe("useCopyPaste hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers copy and paste event listeners", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() =>
      useCopyPaste(mockRfInstance as ReactFlowInstance)
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "copy",
      expect.any(Function)
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "paste",
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "copy",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "paste",
      expect.any(Function)
    );
  });

  it("copies selected nodes to clipboard on copy", () => {
    const selectedNodes: Node[] = [
      { id: "1", selected: true, position: { x: 0, y: 0 }, data: {} },
      { id: "2", selected: false, position: { x: 0, y: 0 }, data: {} },
    ];
    mockGetNodes.mockReturnValue(selectedNodes);

    renderHook(() => useCopyPaste(mockRfInstance as ReactFlowInstance));

    const clipboardData = {
      setData: vi.fn(),
    };

    const event = new ClipboardEvent("copy", {
      clipboardData: clipboardData as any,
    });

    act(() => {
      window.dispatchEvent(event);
    });

    expect(clipboardData.setData).toHaveBeenCalledWith(
      "flowchart:nodes",
      JSON.stringify([
        { id: "1", selected: true, position: { x: 0, y: 0 }, data: {} },
      ])
    );
  });

  it("does nothing on paste if no data", () => {
    const getData = vi.fn().mockReturnValue(null);

    const clipboardData = {
      getData,
    };

    const event = new ClipboardEvent("paste", {
      clipboardData: clipboardData as any,
    });

    renderHook(() => useCopyPaste(mockRfInstance as ReactFlowInstance));

    act(() => {
      window.dispatchEvent(event);
    });

    expect(mockSetNodes).not.toHaveBeenCalled();
  });
  it("pastes nodes from clipboard with updated positions and IDs", () => {
    const copiedNodes: Node[] = [
      {
        id: "a1",
        selected: true,
        position: { x: 100, y: 200 },
        data: {},
        type: "default",
      },
    ];

    const getData = vi.fn().mockReturnValue(JSON.stringify(copiedNodes));
    const clipboardData = { getData };

    const event = new ClipboardEvent("paste", {
      clipboardData: clipboardData as any,
    });

    renderHook(() => useCopyPaste(mockRfInstance as ReactFlowInstance));

    act(() => {
      window.dispatchEvent(event);
    });

    // Check that you first call setNodes to deselect
    expect(mockSetNodes).toHaveBeenNthCalledWith(1, expect.any(Function));

    // Check that we then call setNodes with the new nodes
    const secondCall = mockSetNodes.mock.calls[1][0] as (
      nodes: Node[]
    ) => Node[];
    const result = secondCall([]);

    expect(result).toHaveLength(1);
    expect(result[0].position).toEqual({ x: 120, y: 220 });
    expect(result[0].selected).toBe(true);
    expect(result[0].id).not.toBe("a1");
  });
});
