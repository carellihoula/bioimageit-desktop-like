import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

export const SearchBar = () => (
  <InputGroup
    startElement={<LuSearch />}
    endElement={<Kbd>⌘K</Kbd>}
    style={{ width: "95%" }}
  >
    <Input placeholder="Search tools" />
  </InputGroup>
);
