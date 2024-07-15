export type DIRECTION_TYPES = "NORTH" | "SOUTH" | "EAST" | "WEST";

export interface PLACEMENT_POSITION_INTERFACE {
  x: number;
  y: number;
  direction: DIRECTION_TYPES;
}

export interface PLACEMENT_POSITION_HANDLER_INTERFACE {
  key: "x" | "y" | "direction";
  value: number | DIRECTION_TYPES;
}
