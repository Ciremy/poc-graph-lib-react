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

const AppCustom = () => {
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

    // ------
    // HOST
    // ------
    { id: "3", type:"textUpdater", data:{name:"192.168.130.1/24", role:"host", emoji:"🖥️"},position},
    { id: "4", type:"textUpdater", data:{name:"192.168.130.20/24", role:"host", emoji:"🖥️"},position},
    { id: "5", type:"textUpdater", data:{name:"192.168.130.30/24", role:"host", emoji:"🖥️"},position},

    { id: "6", type:"textUpdater", data:{name:"192.168.132.1/24", role:"host", emoji:"🖥️",extra_data:{is_port_scanned:true}},position},
    { id: "7", type:"textUpdater", data:{name:"192.168.132.2/24", role:"host", emoji:"🖥️"},position},
    { id: "8", type:"textUpdater", data:{name:"192.168.132.101/24", role:"host", emoji:"🖥️"},position},
    { id: "9", type:"textUpdater", data:{name:"192.168.132.102/24", role:"host", emoji:"🖥️",extra_data:{is_port_scanned:true}},position},
    { id: "10", type:"textUpdater", data:{name:"192.168.132.103/24", role:"host", emoji:"🖥️"},position},
    { id: "11", type:"textUpdater", data:{name:"192.168.132.104/24", role:"host", emoji:"🖥️"},position},
    { id: "12", type:"textUpdater", data:{name:"192.168.132.200/24", role:"host", emoji:"🖥️"},position},
    { id: "13", type:"textUpdater", data:{name:"192.168.132.201/24", role:"host", emoji:"🖥️"},position},

    // ------
    // PORT
    // ------
    { id: "14", type:"textUpdater", data:{name:"3389", role:"port", emoji:"⚓", extra_data:{exploitation_state:"undetermined", protocol:"tcp", port_state:"OPEN", vulnerability:"undetermined"}},position},
    { id: "15", type:"textUpdater", data:{name:"53", role:"port", emoji:"⚓", extra_data:{exploitation_state:"vulnerable", protocol:"tcp", port_state:"OPEN", vulnerability:"vulnerable"}},position},
    { id: "16", type:"textUpdater", data:{name:"80", role:"port", emoji:"⚓", extra_data:{exploitation_state:"undetermined", protocol:"tcp", port_state:"OPEN", vulnerability:"vulnerable"}},position},

    // ------
    // SERVICE
    // ------
    { id: "17", type:"textUpdater", data:{name:"domain", role:"service", emoji:"🔖", extra_data:{product:"Unbound", version:"1.8.1", exploitation_state:"vulnerable", state:"open"}},position},
    { id: "18", type:"textUpdater", data:{name:"mb-wbt-server", role:"service", emoji:"🔖", extra_data:{product:"Microsoft Terminal Services", version:"", exploitation_state:"undetermined", state:"open"}},position},

    // ------
    // CPE
    // ------
    { id: "19", type:"textUpdater", data:{name:"cpe:/a:nlnetlabs:unbound:1.8.1", role:"cpe", emoji:"🔴"},position},
    { id: "20", type:"textUpdater", data:{name:"cpe:/o:microsoft:windows", role:"cpe", emoji:"🔴"},position},

    // 
    { id: "21", type: "textUpdater", data: { name: "192.168.132.21/24", role: "host", emoji: "🖥️" }, position },
    { id: "22", type: "textUpdater", data: { name: "192.168.132.22/24", role: "host", emoji: "🖥️" }, position },
    { id: "23", type: "textUpdater", data: { name: "192.168.132.23/24", role: "host", emoji: "🖥️" }, position },
    { id: "24", type: "textUpdater", data: { name: "192.168.132.24/24", role: "host", emoji: "🖥️" }, position },
    { id: "25", type: "textUpdater", data: { name: "192.168.132.25/24", role: "host", emoji: "🖥️" }, position },
    { id: "26", type: "textUpdater", data: { name: "192.168.132.26/24", role: "host", emoji: "🖥️" }, position },
    { id: "27", type: "textUpdater", data: { name: "192.168.132.27/24", role: "host", emoji: "🖥️" }, position },
    { id: "28", type: "textUpdater", data: { name: "192.168.132.28/24", role: "host", emoji: "🖥️" }, position },
    { id: "29", type: "textUpdater", data: { name: "192.168.132.29/24", role: "host", emoji: "🖥️" }, position },
    { id: "30", type: "textUpdater", data: { name: "192.168.132.30/24", role: "host", emoji: "🖥️" }, position },
    { id: "31", type: "textUpdater", data: { name: "192.168.132.31/24", role: "host", emoji: "🖥️" }, position },
    { id: "32", type: "textUpdater", data: { name: "192.168.132.32/24", role: "host", emoji: "🖥️" }, position },
    { id: "33", type: "textUpdater", data: { name: "192.168.132.33/24", role: "host", emoji: "🖥️" }, position },
    { id: "34", type: "textUpdater", data: { name: "192.168.132.34/24", role: "host", emoji: "🖥️" }, position },
    { id: "35", type: "textUpdater", data: { name: "192.168.132.35/24", role: "host", emoji: "🖥️" }, position },
    { id: "36", type: "textUpdater", data: { name: "192.168.132.36/24", role: "host", emoji: "🖥️" }, position },
    { id: "37", type: "textUpdater", data: { name: "192.168.132.37/24", role: "host", emoji: "🖥️" }, position },
    { id: "38", type: "textUpdater", data: { name: "192.168.132.38/24", role: "host", emoji: "🖥️" }, position },
    { id: "39", type: "textUpdater", data: { name: "192.168.132.39/24", role: "host", emoji: "🖥️" }, position },
    { id: "40", type: "textUpdater", data: { name: "192.168.132.40/24", role: "host", emoji: "🖥️" }, position },
    { id: "41", type: "textUpdater", data: { name: "192.168.132.41/24", role: "host", emoji: "🖥️" }, position },
    { id: "42", type: "textUpdater", data: { name: "192.168.132.42/24", role: "host", emoji: "🖥️" }, position },
    { id: "43", type: "textUpdater", data: { name: "192.168.132.43/24", role: "host", emoji: "🖥️" }, position },
    { id: "44", type: "textUpdater", data: { name: "192.168.132.44/24", role: "host", emoji: "🖥️" }, position },
    { id: "45", type: "textUpdater", data: { name: "192.168.132.45/24", role: "host", emoji: "🖥️" }, position },
    { id: "46", type: "textUpdater", data: { name: "192.168.132.46/24", role: "host", emoji: "🖥️" }, position },
    { id: "47", type: "textUpdater", data: { name: "192.168.132.47/24", role: "host", emoji: "🖥️" }, position },
    { id: "48", type: "textUpdater", data: { name: "192.168.132.48/24", role: "host", emoji: "🖥️" }, position },
    { id: "49", type: "textUpdater", data: { name: "192.168.132.49/24", role: "host", emoji: "🖥️" }, position },
    { id: "50", type: "textUpdater", data: { name: "192.168.132.50/24", role: "host", emoji: "🖥️" }, position },
    { id: "51", type: "textUpdater", data: { name: "192.168.132.51/24", role: "host", emoji: "🖥️" }, position },
    { id: "52", type: "textUpdater", data: { name: "192.168.132.52/24", role: "host", emoji: "🖥️" }, position },
    { id: "53", type: "textUpdater", data: { name: "192.168.132.53/24", role: "host", emoji: "🖥️" }, position },
    { id: "54", type: "textUpdater", data: { name: "192.168.132.54/24", role: "host", emoji: "🖥️" }, position },
    { id: "55", type: "textUpdater", data: { name: "192.168.132.55/24", role: "host", emoji: "🖥️" }, position },
    { id: "56", type: "textUpdater", data: { name: "192.168.132.56/24", role: "host", emoji: "🖥️" }, position },
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
    { id: "1->3", source: "1", target: "3",
      markerEnd:{ type: MarkerType.ArrowClosed, width:20, hieght:20, color: '#3ED'},    
      style: {
        strokeWidth: 2,
        stroke: '#3ED',
      }  
    },    
    { id: "1->4", source: "1", target: "4",
      markerEnd:{ type: MarkerType.ArrowClosed, width:20, hieght:20, color: '#3ED'},    
      style: {
        strokeWidth: 2,
        stroke: '#3ED',
      }
    },
    { id: "1->5", source: "1", target: "5", 
      markerEnd:{ type: MarkerType.ArrowClosed, width:20, hieght:20, color: '#3ED'},    
      style: {
        strokeWidth: 2,
        stroke: '#3ED',
      }
    },

    // (2) NETWORK -> HOST
    { id: "2->6", source: "2", target: "6" },
    { id: "2->7", source: "2", target: "7" },
    { id: "2->8", source: "2", target: "8" },
    { id: "2->9", source: "2", target: "9" },
    { id: "2->10", source: "2", target: "10" },
    { id: "2->11", source: "2", target: "11" },
    { id: "2->12", source: "2", target: "12" },
    { id: "2->13", source: "2", target: "13" },

    // 
    { id: "2->21", source: "2", target: "21" },
    { id: "2->22", source: "2", target: "22" },
    { id: "2->23", source: "2", target: "23" },
    { id: "2->24", source: "2", target: "24" },
    { id: "2->25", source: "2", target: "25" },
    { id: "2->26", source: "2", target: "26" },
    { id: "2->27", source: "2", target: "27" },
    { id: "2->28", source: "2", target: "28" },
    { id: "2->29", source: "2", target: "29" },
    { id: "2->30", source: "2", target: "30" },
    { id: "2->31", source: "2", target: "31" },
    { id: "2->32", source: "2", target: "32" },
    { id: "2->33", source: "2", target: "33" },
    { id: "2->34", source: "2", target: "34" },
    { id: "2->35", source: "2", target: "35" },
    { id: "2->36", source: "2", target: "36" },
    { id: "2->37", source: "2", target: "37" },
    { id: "2->38", source: "2", target: "38" },
    { id: "2->39", source: "2", target: "39" },
    { id: "2->40", source: "2", target: "40" },
    { id: "2->41", source: "2", target: "41" },
    { id: "2->42", source: "2", target: "42" },
    { id: "2->43", source: "2", target: "43" },
    { id: "2->44", source: "2", target: "44" },
    { id: "2->45", source: "2", target: "45" },
    { id: "2->46", source: "2", target: "46" },
    { id: "2->47", source: "2", target: "47" },
    { id: "2->48", source: "2", target: "48" },
    { id: "2->49", source: "2", target: "49" },
    { id: "2->50", source: "2", target: "50" },
    { id: "2->51", source: "2", target: "51" },
    { id: "2->52", source: "2", target: "52" },
    { id: "2->53", source: "2", target: "53" },
    { id: "2->54", source: "2", target: "54" },
    { id: "2->55", source: "2", target: "55" },
    { id: "2->56", source: "2", target: "56" },

    // (1) HOST -> PORT
    { id: "9->14", source: "9", target: "14" },

    // (2) HOST -> PORT
    { id: "6->15", source: "6", target: "15" },
    { id: "6->16", source: "6", target: "16" },

    // (1) PORT -> SERVICE
    { id: "14->18", source: "14", target: "18" },
    { id: "15->17", source: "15", target: "17" },

    // (1) SERVICE -> CPE
    { id: "17->19", source: "17", target: "19" },
    { id: "18->20", source: "18", target: "20" },

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

export default AppCustom;
