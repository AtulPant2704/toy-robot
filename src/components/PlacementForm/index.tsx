import { FormEvent } from "react";
import {
  DIRECTION_TYPES,
  PLACEMENT_POSITION_HANDLER_INTERFACE,
  PLACEMENT_POSITION_INTERFACE,
} from "utils/commonTypes";

import styles from "./styles.module.css";

interface PlacementFormInterface {
  placementHandler: (event: FormEvent<HTMLFormElement>) => void;
  placementPositionHandler: (
    event: PLACEMENT_POSITION_HANDLER_INTERFACE
  ) => void;
  placementPosition: PLACEMENT_POSITION_INTERFACE;
  matrix: number;
}

const PlacementForm = ({
  placementHandler,
  placementPositionHandler,
  placementPosition,
  matrix,
}: PlacementFormInterface) => {
  const optionsArr = new Array(matrix).fill(0);

  return (
    <div className={styles.placementContainer}>
      Placement
      <form onSubmit={placementHandler}>
        <label htmlFor="x">X Coordinate:</label>
        <select
          name="x-coordinate"
          id="x"
          value={placementPosition.x}
          onChange={(e) =>
            placementPositionHandler({
              key: "x",
              value: Number(e.target.value),
            })
          }
        >
          {optionsArr.map((item, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>
        <label htmlFor="y">Y Coordinate:</label>
        <select
          name="y-coordinate"
          id="y"
          value={placementPosition.y}
          onChange={(e) =>
            placementPositionHandler({
              key: "y",
              value: Number(e.target.value),
            })
          }
        >
          {optionsArr.map((item, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>
        <label htmlFor="direction">Direction:</label>
        <select
          name="direction"
          id="direction"
          value={placementPosition.direction}
          onChange={(e) =>
            placementPositionHandler({
              key: "direction",
              value: e.target.value as DIRECTION_TYPES,
            })
          }
        >
          <option value="EAST">EAST</option>
          <option value="NORTH">NORTH</option>
          <option value="SOUTH">SOUTH</option>
          <option value="WEST">WEST</option>
        </select>
        <button type="submit">Place</button>
      </form>
    </div>
  );
};

export default PlacementForm;
