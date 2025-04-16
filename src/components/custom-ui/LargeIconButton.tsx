import { Button } from "@chakra-ui/react";
import React from "react";

interface LargeIconButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const LargeIconButton: React.FC<LargeIconButtonProps> = ({
  label,
  icon,
  onClick,
  className = "",
}) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      width="95%"
      borderRadius="sm"
      mt={2}
      color="white"
      display="flex"
      justifyContent="center"
      className={className}
    >
      {icon}
      {label}
    </Button>
  );
};
