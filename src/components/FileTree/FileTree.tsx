// import * as React from "react";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { MUI_X_PRODUCTS } from "../../mock/fileTree";

export default function FileTree() {
  return (
    <Box sx={{ minHeight: 352, minWidth: 250, color: "dv-fg" }}>
      <RichTreeView items={MUI_X_PRODUCTS} />
    </Box>
  );
}
