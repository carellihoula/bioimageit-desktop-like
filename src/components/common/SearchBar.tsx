import { ISearch } from "@/types";
import { Input, InputGroup } from "@chakra-ui/react";
import { FC } from "react";
import { LuSearch } from "react-icons/lu";

/**
 * SearchBar component that renders an input field with a search icon
 * @param value - The current value of the search input
 * @param onChange - Function to handle input changes
 * @param placeholder - Placeholder text for the input
 * @param size - Size of the input field
 */

export const SearchBar: FC<ISearch> = ({
  value,
  onChange,
  placeholder,
  size,
}) => (
  <InputGroup
    startElement={<LuSearch color="" className="dv-fg" />}
    style={{ width: "95%" }}
  >
    <Input
      value={value}
      placeholder={placeholder}
      color={"dvForeground"}
      onChange={onChange}
      size={size}
      borderColor={"dvSeparatorBorder"}
      _focus={{ borderColor: "dvForeground" }}
    />
  </InputGroup>
);
