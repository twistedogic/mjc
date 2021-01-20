import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { useGameState } from "../../hooks";

const Grid = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuContainer = styled.div`
  display: flex;
`;

const Menu = () => (
  <MenuContainer>
    <Link to="/">Home</Link>
    <Link to="/new">End Game</Link>
  </MenuContainer>
);

const View = ({ store, gameId }) => {
  const { players, state } = useGameState(store, gameId);
  console.log(players, state);
  return (
    <Grid>
      {players}
      {state}
      <Menu />
    </Grid>
  );
};

export default View;
