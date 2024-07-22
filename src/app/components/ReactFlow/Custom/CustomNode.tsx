import React from "react";
import { Handle, Position } from "reactflow";

const CustomNode = (props: { data: {name:string, role:string, emoji:string, extra_data:any, style:any} }) => {
  const dragHandleStyle = {
    display: 'inline-block',
    width: 25,
    height: 25,
    backgroundColor: 'teal',
    marginLeft: 5,
    borderRadius: '50%',
  };
  
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
    <div
      className="px-2 py-2 shadow-md rounded-md bg-white border-2 border-stone-400"
      style={{ backgroundColor: props.data.style?.backgroundColor || "white" }}
    >
      <div className="flex">
        <div className="rounded-full w-6 h-6 flex justify-center items-center bg-gray-100">
          {props.data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{props.data.name}</div>
          <div className="text-gray-500">{props.data.role}</div>
          {props.data.role == 'port'? (<>
            <p>Exploitation state : <strong>{props.data.extra_data?.exploitation_state}</strong></p>
            <p>protocol : <strong>{props.data.extra_data?.protocol}</strong></p>
            <p>Port state : <strong>{props.data.extra_data?.port_state}</strong></p>
            <p>Vulnerability :  : <strong>{props.data.extra_data?.vulnerability}</strong></p>
          </>):(<></>)}
          {props.data.role == 'service'? (<>
            <p>Product: <strong>{props.data.extra_data?.product}</strong></p>
            <p>Version : <strong>{props.data.extra_data?.version}</strong></p>
            <p>Vulnerable : <strong>{props.data.extra_data?.vulnerable}</strong></p>
            <p>State :  : <strong>{props.data.extra_data?.state}</strong></p>
          </>):(<></>)}
        </div>
      </div>
      {props.data.role == 'host'? (<>
          {props.data.extra_data?.is_port_scanned && (
            <p className="text-center">
              ⬇️
            </p>)}
          </>):(<></>)}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
      </>
  );
};

export default CustomNode;