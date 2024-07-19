/* eslint-disable react/no-unstable-nested-components */
import React from "react";
import { DefaultNode, Graph } from "@visx/network";
import data from "../../const/data.json";

export type NetworkProps = {
  width: number;
  height: number;
};

interface CustomNode {
  x?: number;
  y?: number;
  color?: string;
}

interface CustomLink {
  source: CustomNode;
  target: CustomNode;
  dashed?: boolean;
}

const nodes: CustomNode[] = [
  { x: 0, y: 0, color:"#346C80" },
  { x: 400, y: 450, color:"#346C80" },
  { x: 500, y: 300, color: "#BCE8F0" },
  { x: 700, y: 500, color: "#4290A4" },

];

const links: CustomLink[] = [
  { source: nodes[0], target: nodes[1] },
  { source: nodes[1], target: nodes[2] },
  { source: nodes[2], target: nodes[0], dashed: true },
  { source: nodes[3], target: nodes[1] },
];

const graph = {
  nodes,
  links,
};

export const background = "#1C3144";

export default function Example({ width, height }: NetworkProps) {
  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={background} />
      <Graph<CustomLink, CustomNode>
        graph={graph}
        top={20}
        left={100}
        nodeComponent={({ node: { color } }) =>
          color ? <DefaultNode fill={color} /> : <DefaultNode />
        }
        linkComponent={({ link: { source, target, dashed } }) => (
          <line
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            strokeWidth={2}
            stroke="#999"
            strokeOpacity={0.6}
            strokeDasharray={dashed ? "8,4" : undefined}
          />
        )}
      />
    </svg>
  );
}
