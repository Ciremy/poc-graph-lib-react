'use client'
import Navbar from "../components/Navbar";
import VisNetwork from "../components/VisNetwork/VisNetwork";

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <Navbar/>

        <div className="w-full h-4/5 mb-12">
            <h1 className="text-center font-bold text-2xl">Vis Network</h1>   
            <div className="w-full h-full">
                <VisNetwork/>
            </div>
        </div>
    </div>
  );
}