import styled from '@emotion/styled';

export const Navigation = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style-type: none;
  padding-top: 20px;
  margin-bottom: 20px;
`;

export const NavigationItem = styled.li`
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s;
  border: 2px solid transparent;

  &:hover {
    color: hotpink;
  }

  &.active {
    border-color: hotpink;
    color: hotpink;
  }

  & + & {
    margin-left: 10px;
  }
`;

export const PhotosContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => `repeat(auto-fill, minmax(${theme.imageWidth}, auto))`};
  grid-gap: 10px;
  width: 100%;
  margin: auto;
`;

export const TextLabel = styled.p`
  text-align: center;
`;
