import { ChangeEvent, Component } from "react";

import Controllers from "./Controllers";
import Settings from "./Settings";
import Bar from "./Bar";

const generateArray = (length: number = 30): number[] =>
  Array.from(Array(length))
    .map((_, index) => (index + 1) * 3)
    .sort(() => Math.random() - 0.5);

const swap = (arr: number[], a: number, b: number): void => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

const delay = (timer: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 400 - timer));
const sortArray = async (
  array: number[],
  updateState: <K extends keyof State>(state: Pick<State, K>) => void,
  settings: { speed: number; pause: boolean; isActive: boolean }
) => {
  const copyArr = [...array];
  const arrLength = copyArr.length;

  function pause(): Promise<void> {
    return new Promise((resolve) => {
      if (settings.pause) {
        return setTimeout(() => resolve(pause()), 300);
      } else {
        return resolve();
      }
    });
  }

  for (let i = 0; i < arrLength; i++) {
    for (let j = 0; j < arrLength - i - 1; j++) {
      if (settings.pause) {
        await pause();
      }
      if (!settings.isActive) {
        break;
      }

      const a = copyArr[j];
      const b = copyArr[j + 1];
      if (a > b && settings.isActive) {
        swap(copyArr, j, j + 1);
        updateState({ renderData: [...copyArr] });
        await delay(settings.speed);
      }
    }
  }

  if (settings.isActive) {
    updateState({
      sorting: false,
      solved: true,
    });
  }
};

const DEFAULT_ARRAY_LENGTH = 30;
const DEFAULT_SORT_SPEED = 50;

type State = {
  arraylength: number;
  speed: number;
  data: number[];
  renderData: number[];
  pause: boolean;
  sorting: boolean;
  solved: boolean;
};

class App extends Component<{}, State> {
  settings = {
    speed: DEFAULT_SORT_SPEED,
    pause: false,
    isActive: false,
  };

  state: State = {
    arraylength: DEFAULT_ARRAY_LENGTH,
    speed: DEFAULT_SORT_SPEED,
    data: generateArray(DEFAULT_ARRAY_LENGTH),
    renderData: [],
    sorting: false,
    pause: false,
    solved: false,
  };

  componentDidMount() {
    const { data } = this.state;
    this.setState({ renderData: [...data] });
  }

  handleNewSet = () => {
    this.settings.isActive = false;
    this.settings.pause = false;
    const newArray = generateArray();
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
    const updateState = this.setState.bind(this);
    this.settings.isActive = true;
    this.setState({ sorting: true });

    sortArray(data, updateState, this.settings);
  };

  handleChangeArrayLength = (event: ChangeEvent<HTMLInputElement>) => {
    const newArr = generateArray(Number(event.target.value));
    this.setState({
      arraylength: Number(event.target.value),
      data: newArr,
      renderData: newArr,
    });
  };

  handleChangeSpeed = (event: ChangeEvent<HTMLInputElement>) => {
    this.settings.speed = Number(event.target.value);
    this.setState({
      speed: Number(event.target.value),
    });
  };

  render() {
    const {
      arraylength,
      speed,
      renderData,
      sorting,
      pause,
      solved,
    } = this.state;

    return (
      <section>
        <div className="container">
          {renderData.map((item) => (
            <Bar key={item} value={item} arraylength={arraylength} />
          ))}
        </div>
        {!solved && !sorting && <p className="status">Not solved</p>}
        {sorting && <p className="status">Sorting in process</p>}
        {solved && <p className="status">Solved</p>}
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
