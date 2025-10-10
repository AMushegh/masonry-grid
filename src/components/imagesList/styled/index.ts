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

export const GridImage = styled.img.withConfig({
  shouldForwardProp: (prop) => !["width", "height"].includes(prop),
})<{ height: number; width: number }>`
  width: 100%;
  display: block;
  border-radius: 12px;
  aspect-ratio: ${({ width, height }) => `${width} / ${height}`};
  object-fit: cover;
`;

export const ImageListWrapper = styled.div`
  padding-top: 70px;
  flex: 1;
  overflow: auto;
`;
