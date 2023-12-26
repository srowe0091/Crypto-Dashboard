import '@/ui'

export const metadata = {
  title: "Crypto Dashboard",
  description: "View historical data for various crypto currencies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
