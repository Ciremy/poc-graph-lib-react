'use client'
import Navbar from "../components/Navbar";
import { Nivo } from "../components/Nivo/Nivo";

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <Navbar/>
      <h1 className="font-bold text-2xl">NIVO</h1>
      <Nivo widthClass="w-[800px]" heightClass="h-[800px]" />
    </div>
  );
}
