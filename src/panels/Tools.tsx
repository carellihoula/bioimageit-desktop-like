import { SearchBar } from "@/components/common/SearchBar";
import FileTree from "@/components/FileTree/FileTree";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

/**
 * Tools component provides a panel for managing and searching tools.
 * It includes a create tool button, a search bar for filtering tools,
 * and a file tree view that displays the available tools.
 */

export function Tools() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className=" flex justify-center items-center mt-2 w-full">
        <Button
          style={{
            width: "95%",
            borderRadius: "4px",
          }}
          bg="dvBackground"
          color="dvForeground"
          borderColor="dvSeparatorBorder"
          _hover={{
            bg: "dvHoverBg",
          }}
        >
          Create Tool
        </Button>
      </div>
      <div className=" flex justify-center items-center w-full">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="sm"
          placeholder="Search tools"
        />
      </div>

      <div className="w-full dv-fg overflow-y-auto flex-1">
        <FileTree search={searchTerm} />
      </div>
    </div>
  );
}
