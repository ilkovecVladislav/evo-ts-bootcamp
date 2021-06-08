import { FC } from "react";
import Button from "components/Button";
import style from "./styles.module.css";

type Props = {
  pause: boolean;
  sorting: boolean;
  solved: boolean;
  onNewSetClick: () => void;
  onResumeClick: () => void;
  onPauseClick: () => void;
  onSortClick: () => void;
};

const Controllers: FC<Props> = (props) => {
  const {
    sorting,
    pause,
    solved,
    onNewSetClick,
    onResumeClick,
    onPauseClick,
    onSortClick,
  } = props;

  return (
    <div className={style.controllers}>
      <Button text="New set" onClick={onNewSetClick} />

      {sorting && pause && <Button text="Resume" onClick={onResumeClick} />}
      {sorting && !pause && <Button text="Pause" onClick={onPauseClick} />}
      {!sorting && (
        <Button text="Start" disabled={solved} onClick={onSortClick} />
      )}
    </div>
  );
};

export default Controllers;
