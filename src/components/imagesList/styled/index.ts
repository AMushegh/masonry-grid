import styled from "styled-components";

export const BarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 12px 8px;
`;

export const TopBlur = styled.div`
  z-index: 15;
  position: absolute;
  top: -55px;
  left: 0;
  width: 100%;
  height: 140px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
  pointer-events: none;
`;

export const InputWrapper = styled.div`
  width: 100%;
  z-index: 20;
  justify-content: center;
  display: flex;
`;
