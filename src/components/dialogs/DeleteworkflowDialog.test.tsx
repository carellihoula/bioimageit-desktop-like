import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteWorkflowDialog } from "./DeleteWorkflowDialog";
import { Provider } from "../ui/provider";
import * as workflowStore from "@/store/useWorkflowStore";

// store Zustand Mock
vi.mock("@/store/useWorkflowStore", async () => {
  const actual = await vi.importActual<
    typeof import("@/store/useWorkflowStore")
  >("@/store/useWorkflowStore");

  return {
    ...actual,
    useWorkflowStore: vi.fn(),
  };
});

describe("DeleteWorkflowDialog", () => {
  const mockOnDelete = vi.fn();
  const mockOnCancel = vi.fn();
  const mockSetSelectedPath = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock Zustand selector
    const mockedUseWorkflowStore = vi.mocked(workflowStore.useWorkflowStore);
    mockedUseWorkflowStore.mockImplementation((selector) =>
      selector({
        selectedPath: "/workflow/to/delete",
        paths: [],
        setPaths: vi.fn(),
        setSelectedPath: mockSetSelectedPath,
      })
    );
  });

  it("displays workflow name in confirmation text", () => {
    render(
      <Provider>
        <DeleteWorkflowDialog
          workflow="Testworkflow"
          onDelete={mockOnDelete}
          onCancel={mockOnCancel}
        />
      </Provider>
    );

    expect(
      screen.getByText(/are you sure you want to delete "Testworkflow"/i)
    ).toBeInTheDocument();
  });

  it("calls onDelete and resets selectedPath when Delete button is clicked", () => {
    render(
      <Provider>
        <DeleteWorkflowDialog
          workflow="my-workflow"
          onDelete={mockOnDelete}
          onCancel={mockOnCancel}
        />
      </Provider>
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(mockOnDelete).toHaveBeenCalled();
    expect(mockSetSelectedPath).toHaveBeenCalledWith(null);
  });

  it("calls onCancel when Cancel button is clicked", () => {
    render(
      <Provider>
        <DeleteWorkflowDialog
          workflow="my-workflow"
          onDelete={mockOnDelete}
          onCancel={mockOnCancel}
        />
      </Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  //   it("does not call setSelectedPath if Delete is not clicked", () => {
  //     render(
  //       <Provider>
  //         <DeleteWorkflowDialog
  //           workflow="no-click"
  //           onDelete={mockOnDelete}
  //           onCancel={mockOnCancel}
  //         />
  //       </Provider>
  //     );

  //     expect(mockSetSelectedPath).not.toHaveBeenCalled();
  //   });
});
