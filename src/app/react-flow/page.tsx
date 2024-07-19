'use client'
import Navbar from "../components/Navbar";
import App from "../components/ReactFlow/App";

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <Navbar/>
        <div className="w-full h-4/5 mb-12">
            <h1 className="text-center font-bold text-2xl">React Flow</h1>    
            <App/>
        </div>
    </div>
  );
}
