import styled from "styled-components";

export const MasonryContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const MasonryItemsWrapper = styled.div<{ height: number }>`
    position: relative;
    width: 100%;
    height: ${({ height }) => height + "px"};,
`;

export const Sentinel = styled.div<{ height: number }>`
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  transform: ${({ height }) => `translateY(${height}px)`};
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

export const MasonryItem = styled.div<{ x: number; y: number; width: number }>`
  position: absolute;
  will-change: transform, height;
  width: ${({ width }) => `${width}px`};
  transform: ${({ x, y }) => `translate(${x}px, ${y}px)`};
`;
