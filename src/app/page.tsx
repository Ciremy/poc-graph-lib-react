import Visx from "./components/Visx";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Visx width={1500} height={1000} />
    </main>
  );
}
