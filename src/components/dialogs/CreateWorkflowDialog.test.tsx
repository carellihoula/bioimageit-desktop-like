import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreateWorkflowDialog } from "./CreateWorkflowDialog";
import { Provider } from "../ui/provider"; // ChakraProvider wrapper
import * as folderApi from "@/api/Javascript–Python-bridge/SelectedFolderAPI";

// Mock the folder selection API
vi.mock("@/api/Javascript–Python-bridge/SelectedFolderAPI", () => {
  return {
    selectFolderViaPywebview: vi.fn(),
  };
});

describe("CreateWorkflowDialog", () => {
  const mockOnCreate = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls onCreate with workflow name and selected path", async () => {
    const mockPath = "/selected/path";
    const mockSelectFolder = vi.mocked(folderApi.selectFolderViaPywebview);
    mockSelectFolder.mockResolvedValue(mockPath);

    render(
      <Provider>
        <CreateWorkflowDialog onCreate={mockOnCreate} onCancel={mockOnCancel} />
      </Provider>
    );

    // Click on "Browse..."
    fireEvent.click(screen.getByText("Browse..."));

    // Wait for the path to be set
    await waitFor(() =>
      expect(screen.getByPlaceholderText("Path to file")).toHaveValue(mockPath)
    );

    // Enter a workflow name
    fireEvent.change(screen.getByPlaceholderText("New Workflow Name"), {
      target: { value: "TestWorkflow" },
    });

    // Click on Create button
    fireEvent.click(screen.getByText("Create"));

    // Check that onCreate is called with the right parameters
    expect(mockOnCreate).toHaveBeenCalledWith("TestWorkflow", mockPath);
  });

  it("disables Create button if name or path is missing", () => {
    render(
      <Provider>
        <CreateWorkflowDialog onCreate={mockOnCreate} onCancel={mockOnCancel} />
      </Provider>
    );

    // Create button should be disabled initially
    expect(screen.getByText("Create")).toBeDisabled();
  });

  it("calls onCancel when Cancel is clicked", () => {
    render(
      <Provider>
        <CreateWorkflowDialog onCreate={mockOnCreate} onCancel={mockOnCancel} />
      </Provider>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
