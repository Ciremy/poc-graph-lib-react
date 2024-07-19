import type { Node, NodeTypes, BuiltInNode } from "@xyflow/react";
import { PositionLoggerNode } from "./PositionLoggerNode";

export type PositionLoggerNode = Node<
  {
    label?: string;
  },
  "position-logger"
>;

export type AppNode = BuiltInNode | PositionLoggerNode;

export const initialNodes: AppNode[] = [
  { id: "a", type: "input", position: { x: 0, y: 0 }, data: { label: "Bloodhound" } },
  {
    id: "b",
    type: "position-logger",
    position: { x: -100, y: 100 },
    data: { label: "drag me!" },
  },
  { id: "c", position: { x: 100, y: 100 }, data: { label: "your ideas" } },
  {
    id: "d",
    type: "output",
    position: { x: 0, y: 200 },
    data: { label: "with React Flow" },
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
} satisfies NodeTypes;
