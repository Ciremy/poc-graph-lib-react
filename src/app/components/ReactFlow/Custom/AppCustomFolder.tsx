import React, { useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  getOutgoers,
  getConnectedEdges,
  Background,
  MiniMap,
  Controls,
  MarkerType,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import CustomNode from './CustomNode';

const nodeTypes = { textUpdater: CustomNode };

const AppCustomFolder = () => {
  const position = { x: 0, y: 0 };

  const initialNodes = [
    // ------
    // AUDIT
    // ------
    { id: "0", type:"textUpdater", data:{name:"2024-07-04 05:43:57", role:"audit", emoji:"📜"},position},
    { id: "999", type:"textUpdater", data:{name:"2024-07-07 05:43:57", role:"audit", emoji:"📜"},position},

    // ------
    // NETWORK
    // ------
    { id: "1", type:"textUpdater", data:{name:"192.168.130.0", role:"network", emoji:"🛜"},position},
    { id: "2", type:"textUpdater", data:{name:"192.168.132.0", role:"network", emoji:"🛜"},position},

  ];

  const initialEdges = [
    // AUDIT -> NETWORK
    { id: "0->1", source: "0", target: "1",
      markerEnd:{ type: MarkerType.ArrowClosed, width:20, hieght:20, color: '#FF0072'},    
      style: {
        strokeWidth: 2,
        stroke: '#FF0072',
      } 
    },
    { id: "0->2", source: "0", target: "2",
      markerEnd:{ type: MarkerType.ArrowClosed, width:20, hieght:20, color: '#FF0072'},    
      style: {
        strokeWidth: 2,
        stroke: '#FF0072',
      }
    },
    { id: "999->2", source: "999", target: "2",
      markerEnd:{ type: MarkerType.ArrowClosed, width:20, hieght:20, color: '#FF0072'},    
      style: {
        strokeWidth: 2,
        stroke: '#FF0072',
      }  
    },

    // (1) NETWORK -> HOST 
    { id: "1->2", source: "1", target: "2",
      markerEnd:{ type: MarkerType.ArrowClosed, width:20, hieght:20, color: '#3ED'},    
      style: {
        strokeWidth: 2,
        stroke: '#3ED',
      }  
    },    

  ];

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const getLayoutedElements = (nodes:any, edges:any, direction = "LR") => {

    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node:any) => {
      const nodeWidth = 200;
      const nodeHeight = 150;
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight} );
    });

    edges.forEach((edge:any) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node:any) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      // const nodeWidth = 200;
      // const nodeHeight = 150;
      const nodeWidth = Number(node.id)%2 == 1 ?180:200;
      const nodeHeight = Number(node.id)%2 == 1 ?100:150;
      node.targetPosition = isHorizontal ? "left" : "top";
      node.sourcePosition = isHorizontal ? "right" : "bottom";

      console.log("this node : ", node)
      node.position = {
        x: nodeWithPosition.x + nodeWidth,
        y: nodeWithPosition.y + nodeHeight,
      };

      return node;
    });

    return { nodes, edges };
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges,
    "TB"
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [hidden, setHidden] = useState(true);

  const hide = (hidden:any, childEdgeID:any, childNodeID:any) => (nodeOrEdge:any) => {
    if (
      childEdgeID.includes(nodeOrEdge.id) ||
      childNodeID.includes(nodeOrEdge.id)
    )
      nodeOrEdge.hidden = hidden;
    return nodeOrEdge;
  };

  const checkTarget = (edge:any, id:any) => {
    let edges = edge.filter((ed:any) => {
      return ed.target !== id;
    });
    return edges;
  };

  let outgoers:any[] = [];
  let connectedEdges:any[] = [];
  let stack = [];

  const nodeClick = (some:any, node:any) => {
    let currentNodeID = node.id;
    node.draggable=true

    stack.push(node);
    while (stack.length > 0) {
      let lastNOde = stack.pop();
      let childnode = getOutgoers(lastNOde, nodes, edges);
      let childedge = checkTarget(
        getConnectedEdges([lastNOde], edges),
        currentNodeID
      );
      childnode.map((goer, key) => {
        stack.push(goer);
        outgoers.push(goer);
      });
      childedge.map((edge:any, key:any) => {
        connectedEdges.push(edge);
      });
    }

    let childNodeID = outgoers.map((node) => {
      return node.id;
    });
    let childEdgeID = connectedEdges.map((edge) => {
      return edge.id;
    });

    setNodes((node) => node.map(hide(hidden, childEdgeID, childNodeID)));
    setEdges((edge) => edge.map(hide(hidden, childEdgeID, childNodeID)));
    setHidden(!hidden);
  };

  return (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        nodesDraggable={true}
        onNodeClick={nodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
  );
};

export default AppCustomFolder;
