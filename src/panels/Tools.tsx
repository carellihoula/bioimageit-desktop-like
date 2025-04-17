import { SearchBar } from "@/components/common/SearchBar";
import FileTree from "../components/FileTree/FileTree";
import { Button } from "@chakra-ui/react";

export function Tools() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className=" flex justify-center items-center mt-4 w-full">
        <Button
          style={{
            width: "95%",
            marginTop: "1rem",
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
        <SearchBar />
      </div>

      <div className="w-[98%] dv-fg">
        <FileTree />
      </div>
    </div>
  );
}
