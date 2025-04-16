import { SearchBar } from "@/components/common/SearchBar";
import FileTree from "../components/FileTree/FileTree";
import { Button } from "@chakra-ui/react";

export function Tools() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className=" flex justify-center items-center mt-4 w-full">
        <Button
          colorPalette="gray"
          style={{
            width: "95%",
            marginTop: "1rem",
            borderRadius: "4px",
            color: "black",
          }}
        >
          Create Tool
        </Button>
      </div>
      <div className=" flex justify-center items-center w-full">
        <SearchBar />
      </div>

      <div style={{ width: "98%" }}>
        <FileTree />
      </div>
    </div>
  );
}
