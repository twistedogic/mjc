import styled from "styled-components";

export const Grid = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  flex: none;
  width: 80%;
  background: #fff;
  border-width: 2px 0;
  border-style: dotted;
  border-style: solid;
  position: relative;
  text-align: center;
`;

export const CenteredBox = ({ children }) => (
  <Grid>
    <Box>{children}</Box>
  </Grid>
);
