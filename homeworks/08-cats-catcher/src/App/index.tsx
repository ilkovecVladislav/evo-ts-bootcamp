import { FC, useState, useEffect, useRef } from "react";
import { of, interval, fromEvent, combineLatest } from "rxjs";
import { map, filter, switchMap, startWith } from "rxjs/operators";
import random from "lodash/random";

import { ReactComponent as WindowIcon } from "assets/icons/window.svg";
import { ReactComponent as CatIcon } from "assets/icons/kitty.svg";
import { Container, IconWrapper, ControllersContainer } from "./App.styled";
import { useGenerateWindowsPositions } from "./generateFiled";

const App: FC = () => {
  const catRef = useRef<HTMLSpanElement>(null);
  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const { positions, onReset } = useGenerateWindowsPositions();
  const [catPosition, setCatPosition] = useState<null | number[]>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const positions$ = of(positions);
    const interval$ = interval(1000);

    const catPosition$ = of(positions).pipe(
      filter(Boolean),
      map((pos) => pos[random(0, 11)])
    );

    const cat$ = combineLatest([positions$, interval$])
      .pipe(
        startWith([0, 0]),
        switchMap(() => catPosition$)
      )
      .subscribe((val) => setCatPosition(val));

    const shoot$ = fromEvent(catRef.current!, "click").subscribe(() =>
      setScore((prevState) => prevState + 1)
    );

    return () => {
      cat$.unsubscribe();
      shoot$.unsubscribe();
    };
  }, [positions]);

  useEffect(() => {
    const reset$ = fromEvent(resetButtonRef.current!, "click").subscribe(() => {
      onReset();
      setScore(0);
      setCatPosition(null);
    });

    return () => {
      reset$.unsubscribe();
    };
  }, [onReset]);

  return (
    <div>
      <Container className="game-field">
        {positions &&
          positions.map(([x, y], index) => (
            <IconWrapper key={index} x={x} y={y}>
              <WindowIcon />
            </IconWrapper>
          ))}
        <IconWrapper
          className={catPosition ? "" : "hide"}
          ref={catRef}
          x={catPosition ? catPosition[0] : 0}
          y={catPosition ? catPosition[1] : 0}
        >
          <CatIcon />
        </IconWrapper>
      </Container>
      <ControllersContainer>
        <p>Score: {score}</p>
        <button ref={resetButtonRef}>Restart</button>
      </ControllersContainer>
    </div>
  );
};

export default App;
