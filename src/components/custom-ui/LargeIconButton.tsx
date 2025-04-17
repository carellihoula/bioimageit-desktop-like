// src/components/custom-ui/LargeIconButton.tsx
import { Button } from "@chakra-ui/react";
import React from "react";

// This component is a large icon button that can be used in various parts of the application.
// It is styled using Chakra UI and accepts props for label, icon, onClick handler, and additional class names.
export interface LargeIconButtonProps {
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
      width="95%"
      borderRadius="sm"
      size="sm"
      mt={2}
      display="flex"
      justifyContent="center"
      onClick={onClick}
      bg="dvBackground"
      color="dvForeground"
      borderColor="dvSeparatorBorder"
      _hover={{
        bg: "dvHoverBg",
      }}
      className={className}
    >
      {icon}
      <span style={{ marginLeft: "0.5rem" }}>{label}</span>
    </Button>
  );
};
