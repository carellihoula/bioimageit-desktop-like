import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { RenameWorkflowDialog } from "./RenameWorkflowDialog";
import { Provider } from "../ui/provider";
import * as workflowStore from "@/store/useWorkflowStore";

// Mock Zustand store
vi.mock("@/store/useWorkflowStore", async () => {
  const actual = await vi.importActual<
    typeof import("@/store/useWorkflowStore")
  >("@/store/useWorkflowStore");

  return {
    ...actual,
    useWorkflowStore: vi.fn(),
  };
});

describe("RenameWorkflowDialog", () => {
  const mockOnRename = vi.fn();
  const mockOnCancel = vi.fn();
  const mockSetSelectedPath = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock Zustand selector
    const mockedStore = vi.mocked(workflowStore.useWorkflowStore);
    mockedStore.mockImplementation((selector) =>
      selector({
        selectedPath: "/some/path",
        paths: [],
        setPaths: vi.fn(),
        setSelectedPath: mockSetSelectedPath,
      })
    );
  });

  it("pre-fills the field with the initial name", () => {
    render(
      <Provider>
        <RenameWorkflowDialog
          workflow="my-workflow"
          onRename={mockOnRename}
          onCancel={mockOnCancel}
        />
      </Provider>
    );

    expect(screen.getByPlaceholderText("New name")).toHaveValue("my-workflow");
  });

  it("calls onRename and setSelectedPath when Rename button is clicked", () => {
    render(
      <Provider>
        <RenameWorkflowDialog
          workflow="my-workflow"
          onRename={mockOnRename}
          onCancel={mockOnCancel}
        />
      </Provider>
    );

    const input = screen.getByPlaceholderText("New name");

    // Simulate changing the input value
    fireEvent.change(input, { target: { value: "renamed-workflow" } });

    fireEvent.click(screen.getByText("Rename"));

    expect(mockOnRename).toHaveBeenCalledWith("renamed-workflow");
    expect(mockSetSelectedPath).toHaveBeenCalledWith("renamed-workflow");
  });

  it("disables the Rename button if the name is empty", () => {
    render(
      <Provider>
        <RenameWorkflowDialog
          workflow=""
          onRename={mockOnRename}
          onCancel={mockOnCancel}
        />
      </Provider>
    );

    expect(screen.getByText("Rename")).toBeDisabled();
  });

  it("calls onCancel when Cancel button is clicked", () => {
    render(
      <Provider>
        <RenameWorkflowDialog
          workflow="my-workflow"
          onRename={mockOnRename}
          onCancel={mockOnCancel}
        />
      </Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
