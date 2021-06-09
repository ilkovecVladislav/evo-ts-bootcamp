import styled from '@emotion/styled';

export const Figure = styled.figure`
  background-color: #645f5f;
  padding: 5px;
  position: relative;
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  min-height: 100px;
  border-radius: 5px;
`;

export const FigureCaption = styled.figcaption`
  color: #fff;
  font-size: 16px;
  padding: 5px;
`;

export const FavouriteButton = styled.button`
  width: 44px;
  height: 44px;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;

  svg {
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: 0.5;
  }

  svg:hover {
    transform: scale(1.3);
  }

  svg.active {
    opacity: 1;
  }
`;
