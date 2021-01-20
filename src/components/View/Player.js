import styled from "styled-components";

const Box = styled.div`
  box-shadow: 2px 6px;
`;

const Player = ({ name, onPress }) => {
  return <Box onClick={onPress}>{name}</Box>;
};

export default Player;
