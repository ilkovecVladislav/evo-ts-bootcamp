import styled from "@emotion/styled";

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-auto-rows: 100px;
  grid-auto-flow: dense;
`;

export const ImageContainer = styled.figure<{ w: number; h: number }>`
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  ${({ w }) => (w > 1 ? `grid-column: span ${w}` : "")};
  ${({ h }) => (h > 1 ? `grid-row: span ${h};` : "")};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
