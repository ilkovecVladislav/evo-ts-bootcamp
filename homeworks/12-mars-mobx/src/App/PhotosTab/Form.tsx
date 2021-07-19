import { ChangeEvent, FC, FormEvent } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import { FormContainer, FormTitle, Input, Button } from "./PhotosTab.styled";

const Form: FC = observer(() => {
  const { selectedSol, setSol, loadSolPhotos } = useStore("Sols");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSolValue = Number(event.target.value);
    if (newSolValue >= 0) {
      setSol(event.target.value);
    } else {
      setSol("0");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loadSolPhotos();
  };

  return (
    <FormContainer>
      <FormTitle>Select Sol and press &ldquo;load&rdquo;</FormTitle>
      <form onSubmit={handleSubmit}>
        <Input
          type="number"
          value={selectedSol}
          onChange={handleChange}
          step={1}
          min={0}
        />
        <Button type="submit">load</Button>
      </form>
    </FormContainer>
  );
});

export default Form;
