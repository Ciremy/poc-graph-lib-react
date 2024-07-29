import React, { useState, useEffect, useRef } from 'react';
import { Edge, Network, Node } from 'vis-network';
import { DataSet } from 'vis-data/peer/esm/vis-data'

const VisNetwork = () => {
  const container = useRef(null);

  const nodes:Node[]=[
    { id: 1, label: 'Node 1', hidden:false },
    { id: 2, label: 'Node 2', hidden:false },
    { id: 3, label: 'Node 3', hidden:false },
    { id: 4, label: 'Node 4', hidden:false },
    { id: 5, label: 'Node 5', hidden:false }
  ]

  const edges:Edge[]=[
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 }
  ]

  const options = {};

  useEffect(() => {
    if(container.current){
      const nodesDataSet = new DataSet(nodes)
      const edgesDataSet = new DataSet(edges)


      const network:Network = new Network(container.current, { nodes:nodesDataSet, edges:edgesDataSet }, options)
      network.setOptions({
        autoResize:false
      })
        network.on("click",event=>{
          
          nodesDataSet.update([    
            { id: 1, label: 'Node 1', hidden:false },
            { id: 2, label: 'Node 2', hidden:false },
            { id: 3, label: 'Node 3', hidden:false },
            { id: 4, label: 'Node 4', hidden:true },
            { id: 5, label: 'Node 5', hidden:true }
        ]
        )
          
          // const nodeId = event.nodes[0]

        })
    }
  }, [container, nodes, edges]);

  return <div ref={container} className='w-full h-full border border-white' />;
};

export default VisNetwork;
