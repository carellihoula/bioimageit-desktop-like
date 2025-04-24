import { ISearch } from "@/types";
import { Input, InputGroup } from "@chakra-ui/react";
import { FC } from "react";
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

export const SearchBar2: FC<ISearch> = ({
  value,
  onChange,
  placeholder,
  size,
}) => (
  <InputGroup
    startElement={<LuSearch color="" className="dv-fg" />}
    // endElement={<Kbd>⌘K</Kbd>}
    style={{ width: "95%" }}
  >
    <Input
      value={value}
      placeholder={placeholder}
      color={"dvForeground"}
      border={"dvSeparatorBorder"}
      onChange={onChange}
      size={size}
      // outline={"--dv-paneview-active-outline-color"}
    />
  </InputGroup>
);
