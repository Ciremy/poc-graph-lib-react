'use client'
import { useState } from "react";
import Navbar from "../components/Navbar";
import AppBasic from "../components/ReactFlow/Basic/AppBasic";
import AppCustom from "../components/ReactFlow/Custom/AppCustom";

export default function Home() {
  const [page, setPage]= useState<number>(0)
  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <Navbar/>
        <div className="w-full h-4/5 mb-12">
            <h1 className="text-center font-bold text-2xl">React Flow</h1>    
            <div>
                <p className="text-center font-bold my-2">Examples</p>
                <div className="flex justify-center gap-10 border-b-2 pb-2">
                    <button className="border border-black p-2 bg-white hover:bg-gray" onClick={()=> setPage(1)}>#1 Basic</button>
                    <button className="border border-black p-2 bg-white hover:bg-gray" onClick={()=> setPage(2)}>#2 Custom</button>
                </div>
            </div>
            {page ==1 &&
                (
                    <AppBasic/>
                )
            }
            {page ==2 &&
                (
                    <AppCustom/>
                )
            }
        </div>
    </div>
  );
}
