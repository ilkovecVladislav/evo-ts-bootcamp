import { ChangeEvent, Component } from "react";

import Controllers from "Controllers";
import Settings from "Settings";
import Bar from "Bar";
import { generateArray, sortArray } from "./utils";
import style from "./styles.module.css";
import { AppState } from "../types";

const DEFAULT_ARRAY_LENGTH = 30;
const DEFAULT_SORT_SPEED = 50;

class App extends Component<{}, AppState> {
  settings = {
    speed: DEFAULT_SORT_SPEED,
    pause: false,
    isActive: false,
  };

  constructor(props: {}) {
    super(props);
    const initialData = generateArray(DEFAULT_ARRAY_LENGTH);

    this.state = {
      arraylength: DEFAULT_ARRAY_LENGTH,
      speed: DEFAULT_SORT_SPEED,
      data: initialData,
      renderData: initialData,
      sorting: false,
      pause: false,
      solved: false,
    };
  }

  handleNewSet = () => {
    this.settings.isActive = false;
    this.settings.pause = false;
    const newArray = generateArray(this.state.arraylength);
    this.setState({
      data: newArray,
      renderData: newArray,
      sorting: false,
      solved: false,
      pause: false,
    });
  };

  handlePause = () => {
    this.settings.pause = true;
    this.setState({ pause: true });
  };

  handleResume = () => {
    this.settings.pause = false;
    this.setState({ pause: false });
  };

  handleSort = () => {
    const { data } = this.state;
    const updateStateCallback = <K extends keyof AppState>(
      newState: Pick<AppState, K>
    ) => this.setState(newState);

    this.settings.isActive = true;
    this.setState({ sorting: true });

    sortArray(data, updateStateCallback, this.settings);
  };

  handleChangeArrayLength = (event: ChangeEvent<HTMLInputElement>) => {
    const newArrayLength = Number(event.target.value);
    const newArr = generateArray(newArrayLength);
    this.setState({
      arraylength: newArrayLength,
      data: newArr,
      renderData: newArr,
    });
  };

  handleChangeSpeed = (event: ChangeEvent<HTMLInputElement>) => {
    const newSortingSpeed = Number(event.target.value);
    this.settings.speed = newSortingSpeed;
    this.setState({
      speed: newSortingSpeed,
    });
  };

  render() {
    const { arraylength, speed, renderData, sorting, pause, solved } =
      this.state;

    return (
      <section>
        <div className={style.container}>
          {renderData.map((item) => (
            <Bar key={item} value={item} arraylength={arraylength} />
          ))}
        </div>
        {!solved && !sorting && <p className={style.status}>Not solved</p>}
        {sorting && <p className={style.status}>Sorting in process</p>}
        {solved && <p className={style.status}>Solved</p>}
        <Settings
          sorting={sorting}
          speed={speed}
          arraylength={arraylength}
          onChangeSpeed={this.handleChangeSpeed}
          onChangeArrayLength={this.handleChangeArrayLength}
        />
        <Controllers
          sorting={sorting}
          pause={pause}
          solved={solved}
          onNewSetClick={this.handleNewSet}
          onPauseClick={this.handlePause}
          onResumeClick={this.handleResume}
          onSortClick={this.handleSort}
        />
      </section>
    );
  }
}

export default App;
