import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
  border: 2px solid indianred;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 3px rgb(231, 80, 80);
  }
`;

export const SubmitButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  background-color: indianred;
  border: unset;
  cursor: pointer;
  color: honeydew;
`;
