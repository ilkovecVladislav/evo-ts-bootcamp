import { ChangeEvent, FormEvent, Component } from "react";
import Input from "components/Input";
import style from "./styles.module.css";

type Props = {
  arraylength: number;
  sorting: boolean;
  speed: number;
  onChangeArrayLength: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeSpeed: (event: ChangeEvent<HTMLInputElement>) => void;
};

class Settings extends Component<Props> {
  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  render() {
    const { arraylength, sorting, speed, onChangeArrayLength, onChangeSpeed } =
      this.props;

    return (
      <form className={style.settings} onSubmit={this.handleSubmit}>
        <Input
          label="Number of elements"
          type="number"
          min="5"
          step="1"
          name="arraylength"
          value={arraylength}
          onChange={onChangeArrayLength}
          disabled={sorting}
        />
        <Input
          label="Sorting speed"
          type="range"
          name="speed"
          min="1"
          max="400"
          step="10"
          value={speed}
          onChange={onChangeSpeed}
        />
      </form>
    );
  }
}

export default Settings;
