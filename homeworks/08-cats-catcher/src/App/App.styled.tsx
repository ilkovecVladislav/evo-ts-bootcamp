import styled from "@emotion/styled";

import wallIcon from "assets/icons/wall.svg";

import { WINDOW_SIZE } from "./contants";

export const Container = styled.div`
  width: 800px;
  height: 800px;
  border: 2px solid hotpink;
  margin: 0 auto;
  position: relative;
  background-image: url(${wallIcon});
  background-repeat: round;
  background-size: 80px;
`;

export const IconWrapper = styled.span<{ x: number; y: number }>`
  width: ${WINDOW_SIZE}px;
  height: ${WINDOW_SIZE}px;
  position: absolute;
  top: ${({ y }) => `${y}px`};
  left: ${({ x }) => `${x}px`};
  opacity: 1;

  &.hide {
    opacity: 0;
  }
`;

export const ControllersContainer = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
`;
