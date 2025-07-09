import Image from "next/image";

import DashboardMain from "./dashboard/main";
import ChartPage from "./dashboard/testChart"


export default function Information_Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">可拖曳排序區塊</h1>
      <ChartPage />
    </main>
  );
}
