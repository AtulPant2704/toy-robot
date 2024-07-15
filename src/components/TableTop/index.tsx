import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import PlacementForm from "../PlacementForm";
import {
  DIRECTION_TYPES,
  PLACEMENT_POSITION_HANDLER_INTERFACE,
  PLACEMENT_POSITION_INTERFACE,
} from "utils/commonTypes";

import robot from "../../assets/robot.svg";
import styles from "./styles.module.css";

const TableTop = ({ matrix = 5 }) => {
  const [position, setPosition] = useState([0, 0]); //[x, y]
  const [direction, setDirection] = useState<DIRECTION_TYPES>("EAST");
  const [placementPosition, setPlacementPosition] =
    useState<PLACEMENT_POSITION_INTERFACE>({
      x: 0,
      y: 0,
      direction: "EAST",
    });
  const [showPosition, setShowPosition] = useState(false);
  const [placementCompleted, setPlacementCompleted] = useState(false);

  const getSquares = useMemo(() => {
    const squaresArr = new Array(matrix);
    for (let i = 0; i < matrix; i++) {
      squaresArr[i] = new Array(matrix).fill(0);
    }
    return squaresArr;
  }, [matrix]);

  const isRobotPresent = useCallback(
    (xIndex: number, yIndex: number) => {
      return position[0] === xIndex && position[1] === yIndex;
    },
    [position]
  );

  const robotClassName = useMemo(() => {
    if (direction === "EAST") {
      return styles.robotEast;
    }
    if (direction === "WEST") {
      return styles.robotWest;
    }
    if (direction === "NORTH") {
      return styles.robotNorth;
    }
    return "";
  }, [direction]);

  const placementPositionHandler = ({
    key,
    value,
  }: PLACEMENT_POSITION_HANDLER_INTERFACE) => {
    setPlacementPosition((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const placementHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPosition([placementPosition.x, placementPosition.y]);
    setDirection(placementPosition.direction);
    setPlacementPosition({
      x: 0,
      y: 0,
      direction: "EAST",
    });
    setPlacementCompleted(true);
  };

  const moveHandler = () => {
    switch (direction) {
      case "EAST":
        if (position[0] < matrix - 1) setPosition(([x, y]) => [x + 1, y]);
        break;
      case "WEST":
        if (position[0] > 0) setPosition(([x, y]) => [x - 1, y]);
        break;
      case "NORTH":
        if (position[1] < matrix - 1) setPosition(([x, y]) => [x, y + 1]);
        break;
      case "SOUTH":
        if (position[1] > 0) setPosition(([x, y]) => [x, y - 1]);
        break;
      default:
        break;
    }
  };

  const leftHandler = () => {
    switch (direction) {
      case "EAST":
        setDirection("NORTH");
        break;
      case "NORTH":
        setDirection("WEST");
        break;
      case "WEST":
        setDirection("SOUTH");
        break;
      case "SOUTH":
        setDirection("EAST");
        break;
      default:
        break;
    }
  };

  const rightHandler = () => {
    switch (direction) {
      case "EAST":
        setDirection("SOUTH");
        break;
      case "SOUTH":
        setDirection("WEST");
        break;
      case "WEST":
        setDirection("NORTH");
        break;
      case "NORTH":
        setDirection("EAST");
        break;
      default:
        break;
    }
  };

  const getColumnIndex = (index: number) => {
    return matrix - (index + 1);
  };

  useEffect(() => {
    setShowPosition(false);
  }, [position, direction]);

  return (
    <>
      <div
        className={styles.tableTop}
        style={{ gridTemplateColumns: `repeat(${matrix}, 60px)` }}
      >
        {getSquares.map((item, yIndex: number) =>
          item.map((_element: number, xIndex: number) => (
            <div key={yIndex + xIndex} className={styles.square}>
              <div className={styles.boxIndex}>
                {xIndex}, {getColumnIndex(yIndex)}
              </div>
              {isRobotPresent(xIndex, getColumnIndex(yIndex)) && (
                <img src={robot} alt="->" className={robotClassName} />
              )}
            </div>
          ))
        )}
      </div>

      <PlacementForm
        placementHandler={placementHandler}
        placementPositionHandler={placementPositionHandler}
        placementPosition={placementPosition}
        matrix={matrix}
      />

      <div className={styles.actionBtns}>
        <button disabled={!placementCompleted} onClick={moveHandler}>
          MOVE
        </button>
        <button disabled={!placementCompleted} onClick={leftHandler}>
          LEFT
        </button>
        <button disabled={!placementCompleted} onClick={rightHandler}>
          RIGHT
        </button>
        <button
          disabled={!placementCompleted}
          onClick={() => setShowPosition(true)}
        >
          REPORT
        </button>
      </div>

      {showPosition && (
        <div className={styles.currentPosition}>
          Robot current position is: {position[0]}, {position[1]}, {direction}
        </div>
      )}
    </>
  );
};

export default TableTop;
