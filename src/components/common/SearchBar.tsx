import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

export const SearchBar = () => (
  <InputGroup
    startElement={<LuSearch color="" className="dv-fg" />}
    // endElement={<Kbd>⌘K</Kbd>}
    style={{ width: "95%" }}
  >
    <Input
      placeholder="Search tools"
      color={"dvForeground"}
      border={"dvSeparatorBorder"}
      // outline={"--dv-paneview-active-outline-color"}
    />
  </InputGroup>
);
