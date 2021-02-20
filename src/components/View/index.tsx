import React from "react";
import styled from "styled-components";
import { Link, RouteComponentProps } from "@reach/router";
import { CenteredBox } from "../Layout";
import { useGameState } from "../../hooks";

const MenuContainer = styled.div`
  display: flex;
`;

const Menu = () => (
  <MenuContainer>
    <Link to="/">Home</Link>
    <Link to="/new">End Game</Link>
  </MenuContainer>
);

interface ViewProps extends RouteComponentProps {
  store: Storage;
  gameId?: string;
}

const View = ({ store, gameId }: ViewProps) => {
  const { players, state } = useGameState(store, gameId);
  console.log(players, state);
  return (
    <CenteredBox>
      {players}
      {state}
      <Menu />
    </CenteredBox>
  );
};

export default View;
