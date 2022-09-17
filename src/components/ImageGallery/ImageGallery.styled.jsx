import styled from "@emotion/styled";

export const Gallery = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-auto-rows: 240px;
  grid-gap: 20px;
  justify-content: center;
  margin: 0 auto;
`;