import React from "react";
import { Link, RouteComponentProps } from "@reach/router";
import { CenteredBox } from "../Layout";
import { useIndex } from "../../hooks";

interface ItemProps {
  id: string;
  name: string;
}

const Item = ({ id, name }: ItemProps) => {
  const link = `/game/${id}`;
  return (
    <li>
      <Link to={link}>{name}</Link>
    </li>
  );
};

interface HomeProps extends RouteComponentProps {
  store: Storage;
}

const Home = ({ store }: HomeProps) => {
  const { index } = useIndex(store);
  const items = index.map(({ name, gameId: id }) => (
    <Item key={id} id={id} name={name} />
  ));
  return (
    <CenteredBox>
        <ul className="nes-list">{items}</ul>
        <Link className="nes-btn" to={"/new"}>
          new
        </Link>
    </CenteredBox>
  );
};

export default Home;
