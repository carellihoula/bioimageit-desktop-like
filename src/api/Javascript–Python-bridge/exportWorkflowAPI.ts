/**
 * Initiates the export and save dialog for a workflow directly via Python API.
 * @param {string} workflowFullPath The full path of the workflow to export.
 * @param {string} workflowName The simple name of the workflow (used for the suggested save filename).
 */
export async function exportAndSaveWorkflow(
  workflowFullPath: string,
  workflowName: string
): Promise<void> {
  if (!workflowFullPath || !workflowFullPath.trim()) {
    console.error("exportAndSaveWorkflow: workflowFullPath is required.");
    alert("Workflow path is missing. Cannot start export.");
    return;
  }
  if (!workflowName || !workflowName.trim()) {
    // Fallback for the name if not provided, although it's better if the UI knows it
    workflowName =
      workflowFullPath.substring(workflowFullPath.lastIndexOf("/") + 1) ||
      "workflow";
  }

  // console.log(
  //   `Frontend: Calling window.pywebview.api.export_workflow_direct_save for: ${workflowName}`
  // );

  if (
    window.pywebview &&
    window.pywebview.api &&
    typeof window.pywebview.api.exportWorkflowDirectSave === "function"
  ) {
    try {
      // Call the Python method that handles everything (zip creation, reading, encoding, save dialog)
      const result = await window.pywebview.api.exportWorkflowDirectSave(
        workflowFullPath
      );

      if (result && result.path) {
        // console.log(
        //   "Frontend: Workflow exported and saved successfully via Python API to:",
        //   result.path
        // );
        alert(
          `Workflow '${workflowName}' exported and saved successfully to: ${result.path}`
        );
        // Update UI if needed
      } else if (result && result.error) {
        // console.error(
        //   "Frontend: Error returned by Python API during export/save:",
        //   result.error
        // );
        alert(`Failed to export workflow '${workflowName}': ${result.error}`);
      } else {
        // console.warn(
        //   "Frontend: Unexpected response from Python API for export/save."
        // );
        alert(
          `Failed to export workflow '${workflowName}': Unexpected server response.`
        );
      }
    } catch (error) {
      // console.error(
      //   "Frontend: JavaScript error when calling export_workflow_direct_save:",
      //   error
      // );
      alert(
        `JavaScript error while exporting workflow '${workflowName}': ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  } else {
    // console.warn(
    //   "Frontend: window.pywebview.api.export_workflow_direct_save is not available."
    // );
    alert("Export functionality is not available in this environment.");
  }
}
