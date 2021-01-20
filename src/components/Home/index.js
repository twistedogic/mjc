import React from "react";
import { Link } from "@reach/router";
import { CenteredBox } from "../Layout";
import { useIndex } from "../../hooks";

const Item = ({ id, name }) => {
  const link = `/game/${id}`;
  return (
    <li>
      <Link to={link}>{name}</Link>
    </li>
  );
};

const Home = ({ store }) => {
  const { index } = useIndex(store);
  const items = Object.entries(index).map((id, name) => (
    <Item key={id} id={id} name={name} />
  ));
  return (
    <CenteredBox>
      <ul>{items}</ul>
      <Link to={"/new"}>new</Link>
    </CenteredBox>
  );
};

export default Home;
