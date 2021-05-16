import React from "react";
import Link from "next/link";
import { Button, ElementsGroup, Table } from "@mantine/core";
import { useIndex } from "../../hooks";

interface ItemProps {
  id: string;
  name: string;
}

const Item = ({ id, name }: ItemProps) => {
  const link = `/game/${id}`;
  return (
    <li>
      <Link href={link}>{name}</Link>
    </li>
  );
};

interface HomeProps {
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
      <Link href={"/new"}>new</Link>
    </CenteredBox>
  );
};

export default Home;
