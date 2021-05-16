import React, { MouseEvent } from "react";
import styled from "styled-components";

const Box = styled.div`
  box-shadow: 2px 6px;
`;

interface PlayerProps {
  name: string;
  onPress(e: MouseEvent): void;
}

const Player = ({ name, onPress }: PlayerProps) => {
  return <Box onClick={onPress}>{name}</Box>;
};

export default Player;
