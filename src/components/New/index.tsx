import React from "react";
import styled from "styled-components";
import { Link, navigate, RouteComponentProps } from "@reach/router";
import { Formik, Form, useField } from "formik";
import { CenteredBox } from "../Layout";
import { useIndex, useGameState } from "../../hooks";
import { defaultConfig } from "../../hooks/state.hook";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
`;

const uuid = (now: Date) => `game-${now.getTime()}`;

interface InputProps {
  name: string;
  displayName?: string;
  value?: string | number;
  checked?: boolean;
}

const TextInput = (props: InputProps) => {
  const { name, displayName } = props;
  const display = displayName || name;
  const [field] = useField(props);
  return (
    <div className="nes-field is-inline">
      <label htmlFor={display}>{display}</label>
      <input {...field} className="nes-input" type="text" />
    </div>
  );
};

const NumberInput = (props: InputProps) => {
  const { name, displayName } = props;
  const display = displayName || name;
  const [field] = useField(props);
  return (
    <div className="nes-field is-inline">
      <label htmlFor={display}>{display}</label>
      <input {...field} className="nes-input" type="number" />
    </div>
  );
};

const RadioInput = (props: InputProps) => {
  const { name, displayName } = props;
  const display = displayName || name;
  const [field] = useField(props);
  return (
    <label htmlFor={display}>
      <input {...field} className="nes-radio" type="radio" />
      <span>{display}</span>
    </label>
  );
};

const CheckBox = (props: InputProps) => {
  const { name, displayName } = props;
  const display = displayName || name;
  const [field] = useField(props);
  return (
    <label htmlFor={display}>
      <input {...field} type="checkbox" className="nes-checkbox" />
      <span>{display}</span>
    </label>
  );
};

const NewGameForm = () => (
  <Form>
    <Column>
      <Row>
        <TextInput name="p1" value="" />
        <TextInput name="p2" value="" />
      </Row>
      <Row>
        <TextInput name="p3" value="" />
        <TextInput name="p4" value="" />
      </Row>
      <Row>
        <NumberInput name="base" value={1} />
        <NumberInput name="minScore" value={3} />
        <NumberInput name="maxScore" value={10} />
      </Row>
      <RadioInput name="mode" value="half" displayName="half" checked />
      <RadioInput name="mode" value="double" displayName="double" />
      <CheckBox name="selfDrawn" displayName="Full pay for self-drawn" />
      <Row>
        <button type="submit" className="nes-btn is-primary">
          Start
        </button>
        <Link to="/" type="button" className="nes-btn">
          Back
        </Link>
      </Row>
    </Column>
  </Form>
);

interface NewProps extends RouteComponentProps {
  store: Storage;
  now?: Date;
}

interface FormValue {
  name: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  maxScore: number;
  minScore: number;
  selfDrawnPayRatio: number;
  mode: string;
  base: number;
}

const useForm = (now: Date, store: Storage) => {
  const id = uuid(now);
  const { add } = useIndex(store);
  const { setConfig } = useGameState(store, id);
  const initialValues = {
    name: now.toString(),
    p1: "",
    p2: "",
    p3: "",
    p4: "",
    ...defaultConfig,
  };
  const onSubmit = (values: FormValue) => {
    const { name, p1, p2, p3, p4, ...config } = values;
    const players = [p1, p2, p3, p4];
    add(id, name);
    setConfig({
      players,
      ...config,
    });
    navigate(`/game/${id}`);
  };
  return {
    initialValues,
    onSubmit,
  };
};

const New = ({ store, now = new Date() }: NewProps) => {
  const formProps = useForm(now, store);
  return (
    <CenteredBox>
      <Formik {...formProps}>
        <NewGameForm />
      </Formik>
    </CenteredBox>
  );
};

export default New;
