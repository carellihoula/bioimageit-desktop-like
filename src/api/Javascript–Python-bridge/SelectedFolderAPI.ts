// src/utils/pywebviewUtils.ts

/**
 * Opens a native folder selection dialog via the pywebview API.
 * * @returns A Promise that resolves to the selected folder path (string)
 * or null if the dialog was cancelled, an error occurred,
 * or the pywebview API is not available.
 */
export const selectFolderViaPywebview = async (): Promise<string | null> => {
  if (
    window.pywebview &&
    window.pywebview.api &&
    typeof window.pywebview.api.selectFolderDialog === "function"
  ) {
    try {
      //   console.log(
      //     "Frontend Util: Calling window.pywebview.api.selectFolderDialog()"
      //   );

      const path: string | null =
        await window.pywebview.api.selectFolderDialog();

      if (path) {
        // console.log("Frontend Util: Folder path received from Python:", path);
        return path;
      } else {
        // console.log(
        //   "Frontend Util: No folder selected or dialog cancelled by user."
        // );
        return null;
      }
    } catch (error) {
      //   console.error(
      //     "Frontend Util: Error calling selectFolderDialog via pywebview API:",
      //     error
      //   );
      alert(
        `Error selecting folder: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      return null;
    }
  } else {
    // This case handles when running in a standard browser or if the API isn't exposed
    alert(
      "Folder selection feature is only available when running within the Pywebview desktop application."
    );
    // console.warn(
    //   "Frontend Util: window.pywebview.api.selectFolderDialog is not available."
    // );
    return null;
  }
};
