import styled from "styled-components";

export const BarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  padding: 12px;
`;

export const TopBlur = styled.div`
  z-index: 15;
  position: absolute;
  bottom: -80px;
  left: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  pointer-events: none;
`;

export const InputWrapper = styled.div`
  width: 100%;
  z-index: 20;
  justify-content: center;
  display: flex;
`;
