import React from "react";
import styled from "styled-components";

export const Grid = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

interface CenteredBoxProps {
  title?: string;
  children: React.ReactNode;
}

export const CenteredBox = ({ children, title }: CenteredBoxProps) => (
  <Grid>
    <div className="nes-container">{children}</div>
  </Grid>
);
