import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
// import { useWorkflowStore } from "@/store/useWorkflowStore";
import * as workflowStore from "@/store/useWorkflowStore";
import { CreateToolDialog } from "./CreateToolDialog";
import { Provider } from "../ui/provider";

// Mock the store
vi.mock("@/store/useWorkflowStore", () => {
  const actual = vi.importActual<typeof import("@/store/useWorkflowStore")>(
    "@/store/useWorkflowStore"
  );
  return {
    ...actual,
    useWorkflowStore: vi.fn(),
  };
});

describe("CreateToolDialog", () => {
  const mockOnCreate = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    const mockedUseWorkflowStore = vi.mocked(workflowStore.useWorkflowStore);
    mockedUseWorkflowStore.mockImplementation((selector) =>
      selector({
        selectedPath: "/path/to/workflow",
        paths: [],
        setPaths: vi.fn(),
        setSelectedPath: vi.fn(),
      })
    );
  });

  it("calls onCreate with correct data", () => {
    render(
      <Provider>
        <CreateToolDialog onCreate={mockOnCreate} onCancel={mockOnCancel} />
      </Provider>
    );

    // Check that the field is pre-filled with the workflow
    expect(screen.getByPlaceholderText("New Tool Folder")).toHaveValue(
      "/path/to/workflow"
    );

    // Enter tool name
    fireEvent.change(screen.getByPlaceholderText("New Tool Name"), {
      target: { value: "MyTool" },
    });

    // Click on Create button
    fireEvent.click(screen.getByText("Create"));

    // Check that onCreate is called with the right parameters
    expect(mockOnCreate).toHaveBeenCalledWith("MyTool", "/path/to/workflow");
  });

  it("disables Create button if tool name is empty", () => {
    render(
      <Provider>
        <CreateToolDialog onCreate={mockOnCreate} onCancel={mockOnCancel} />
      </Provider>
    );

    const createButton = screen.getByText("Create");
    expect(createButton).toBeDisabled();
  });

  it("calls onCancel when Cancel is clicked", () => {
    render(
      <Provider>
        <CreateToolDialog onCreate={mockOnCreate} onCancel={mockOnCancel} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
