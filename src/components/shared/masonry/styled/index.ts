import styled from "styled-components";

export const MasonryContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const MasonryItemsWrapper = styled.div.attrs<{ height: number }>((props) => ({
  style: {
    height: `${props.height}px`,
  },
}))`
  position: relative;
  width: 100%;
`;

export const Sentinel = styled.div.attrs<{ height: number }>((props) => ({
  style: {
    transform: `translateY(${props.height}px)`,
  },
}))`
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

export const MasonryItem = styled.div.attrs<{
  x: number;
  y: number;
  width: number;
}>((props) => ({
  style: {
    transform: `translate(${props.x}px, ${props.y}px)`,
    width: `${props.width}px`,
  },
}))`
  position: absolute;
  will-change: transform, height;
  transition:
    transform 0.25s ease,
    height 0.25s ease;
`;
