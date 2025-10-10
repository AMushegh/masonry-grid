import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #fafafa;
  align-items: center;
`;

export const BackButton = styled(Link)`
  align-self: flex-start;
  background: none;
  border: none;
  color: #007aff;
  font-size: 1rem;
  margin-bottom: 12px;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    text-decoration: underline;
  }
`;

export const ImageWrapper = styled.div<{ aspectratio: number }>`
  position: relative;
  width: 100%;
  max-width: 900px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #eee;

  &::before {
    content: "";
    display: block;
    padding-top: ${({ aspectratio }) => 100 / aspectratio}%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoBox = styled.div`
  max-width: 900px;
  margin-top: 16px;
  border-radius: 12px;
  padding: 16px;

  h2 {
    margin: 0 0 8px;
    font-size: 1.2rem;
    color: #333;
  }

  p {
    margin: 0;
    color: #555;
    a {
      color: #007aff;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 1.1rem;
  margin-top: 40px;
  text-align: center;
`;
