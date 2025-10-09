import React from "react";
import { StyledInput } from "./styled";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  if (label) {
    return (
      <label>
        {label}
        <StyledInput {...props} />
      </label>
    );
  }

  return <StyledInput {...props} />;
};
