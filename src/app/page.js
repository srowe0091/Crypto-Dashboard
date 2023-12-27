import { Card } from "@/ui/components/Card";

// API does not provide the name for the crypto. So mapping names here, in order to save on API request to not get throttled
const symbols = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  SOL: "Solana",
  MATIC: "Polygon",
  XRP: "Ripple",
  LTC: "Litecoin",
  ADA: "Cardano",
  DOGE: "Dogecoin",
  MLN: "Enzyme",
};

export default async function Home() {
  // creating the URL to fetch the symbols
  const url = new URL(process.env.NEXT_PUBLIC_API + "/pricemultifull");
  // using the symbols object to get the keys and join them for the searchParam
  url.searchParams.append("fsyms", Object.keys(symbols).join(","));
  url.searchParams.append("tsyms", "USD");

  // fetch the data server side, for quicker response time to the client
  const data = await fetch(url);

  if (data.ok) {
    const { RAW } = await data.json();

    const _data = Object.values(RAW).map(({ USD }) => ({
      // mapping only the data we need
      name: symbols[USD.FROMSYMBOL],
      ticker: USD.FROMSYMBOL,
      toSymbol: USD.TOSYMBOL,
      high: USD.HIGHDAY,
      low: USD.LOWDAY,
      currentPrice: USD.PRICE,
      dayChange: USD.CHANGEDAY,
      percentDayChange: USD.CHANGEPCTDAY,
    }));

    const { positive, negative } = _data.reduce(
      (acc, curr) => {
        const _acc = structuredClone(acc);
        const sign = Math.sign(curr.dayChange);

        if (sign === 1 || sign === 0) _acc.positive += 1;
        if (sign === -1) _acc.negative += 1;

        return _acc;
      },
      { positive: 0, negative: 0 }
    );

    const backgroundStyle =
      positive > negative ? "bg-positive-radial" : "bg-negative-radial";

    return (
      <main
        className={`min-h-screen justify-center align-center p-16 m-auto ${backgroundStyle}`}
      >
        <p className="text-3xl font-bold text-center mb-10">Crypto Dashboard</p>
        <div className="grid gap-1 grid-cols-[repeat(auto-fill,minmax(370px,1fr))]">
          {_data.map((cryptoData) => (
            <Card key={cryptoData.ticker} data={cryptoData} />
          ))}
        </div>
      </main>
    );
  }

  return <div>something went wrong :(</div>;
}
