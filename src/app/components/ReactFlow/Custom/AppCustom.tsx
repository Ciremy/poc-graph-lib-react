import React, { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
} from '@xyflow/react';

import '@xyflow/react/dist/base.css';
import data from '../../../../const/react-flow.json'
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initNodes = data

const initEdges = [
    {
        id: 'e1-0999',
        source: '999',
        target: '0',
  },
  {
        id: 'e1-1999',
        source: '999',
        target: '1',
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
  },
  {
    id: 'e1-5',
    source: '2',
    target: '5',
  },
  {
    id: 'e1-6',
    source: '2',
    target: '6',
  },
];

const AppCustom = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params:any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      className="bg-teal-50"
    >
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
};

export default AppCustom;
