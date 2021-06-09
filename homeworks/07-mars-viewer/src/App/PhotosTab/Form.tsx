import { ChangeEvent, FC, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSol, loadPhotos } from 'reducers/photos';
import { selectedSolSelector } from 'reducers/selectors';
import { FormContainer, FormTitle, Input, Button } from './PhotosTab.styled';

const Form: FC = () => {
  const dispatch = useDispatch();
  const sol = useSelector(selectedSolSelector);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSolValue = Number(event.target.value);
    if (newSolValue >= 0) {
      dispatch(setSol(event.target.value));
    } else {
      dispatch(setSol('0'));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(loadPhotos(sol));
  };

  return (
    <FormContainer>
      <FormTitle>Select Sol and press &ldquo;load&rdquo;</FormTitle>
      <form onSubmit={handleSubmit}>
        <Input type="number" value={sol} onChange={handleChange} step={1} min={0} />
        <Button type="submit">load</Button>
      </form>
    </FormContainer>
  );
};

export default Form;
