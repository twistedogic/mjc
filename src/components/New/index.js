import React from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { Formik, Form, useField } from "formik";
import { CenteredBox } from "../Layout";
import { useIndex, useGameState } from "../../hooks";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
`;

const uuid = (now) => `game-${now.getTime()}`;

const Input = (props) => {
  const { name, type, displayName } = props;
  const display = displayName || name;
  const [field] = useField(props);
  return (
    <label htmlFor={display}>
      {display}
      <input {...field} type={type} />
    </label>
  );
};

const NewGameForm = () => (
  <Form>
    <Column>
      <Input name="p1" type="text" value="" />
      <Input name="p2" type="text" value="" />
      <Input name="p3" type="text" value="" />
      <Input name="p4" type="text" value="" />
      <Input name="base" type="number" value={1} />
      <Input name="minScore" type="number" value={3} />
      <Input name="maxScore" type="number" value={10} />
      <Input name="mode" type="radio" value="half" displayName="half" checked />
      <Input name="mode" type="radio" value="double" displayName="double" />
      <button type="submit">Start</button>
    </Column>
  </Form>
);

const New = ({ store, now = new Date() }) => {
  const id = uuid(now);
  const { add } = useIndex(store);
  const { setConfig } = useGameState(store, id);
  const formProps = {
    initialValues: {
      name: now.toString(),
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      maxScore: 10,
      minScore: 3,
      mode: "half",
      base: 1,
    },
    onSubmit: (values) => {
      const { name, p1, p2, p3, p4, maxScore, minScore, mode, base } = values;
      add(id, name);
      setConfig({
        players: [p1, p2, p3, p4],
        maxScore,
        minScore,
        mode,
        base,
      });
      navigate(`/game/${id}`);
    },
  };
  return (
    <CenteredBox>
      <Formik {...formProps}>
        <NewGameForm />
      </Formik>
    </CenteredBox>
  );
};

export default New;
