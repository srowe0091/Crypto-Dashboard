import "@/ui";
import { ReactQueryProvider } from "@/libs/ReactQuery";

export const metadata = {
  title: "Crypto Dashboard",
  description: "View historical data for various crypto currencies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
