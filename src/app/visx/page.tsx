import Navbar from "../components/Navbar";
import Visx from "../components/Visx/Visx";

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-center items-center">
      <Navbar/>
      <h1 className="font-bold text-2xl">VISX</h1>
      <Visx width={1000} height={800} />
    </div>
  );
}
