import { Card } from "@/ui/components/Card";

import data from "./data.json";

export default function Home() {
  return (
    <main className="min-h-screen justify-center align-center p-10 m-auto">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {data.slice(0, 6).map((cryptoData) => (
          <Card key={cryptoData.id} data={cryptoData} />
        ))}
      </div>
    </main>
  );
}
