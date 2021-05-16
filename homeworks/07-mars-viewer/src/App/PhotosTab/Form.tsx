import { ChangeEvent, FC, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { setSol, loadPhotos } from 'reducers/photos';
import { useSelectedSol } from 'reducers/selectors';
import { FormContainer, FormTitle, Input, Button } from './PhotosTab.styled';

const Form: FC = () => {
  const dispatch = useDispatch();
  const sol = useSelectedSol();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSol(event.target.value));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(loadPhotos(sol));
  };

  return (
    <FormContainer>
      <FormTitle>Select Sol and press &ldquo;load&rdquo;</FormTitle>
      <form onSubmit={handleSubmit}>
        <Input type="number" value={sol} onChange={handleChange} step={1} />
        <Button type="submit">load</Button>
      </form>
    </FormContainer>
  );
};

export default Form;
