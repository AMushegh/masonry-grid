import React from "react";

import { Input } from "@/components/shared/uiKit/Input";

import { BarContainer, InputWrapper, TopBlur } from "./styled";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const ImagesListFilterInput: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <BarContainer>
      <TopBlur />
      <InputWrapper>
        <Input
          type="text"
          name="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </InputWrapper>
    </BarContainer>
  );
};
