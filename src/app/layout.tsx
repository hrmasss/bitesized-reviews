import "@/styles/globals.css";
import { archivo } from "@/styles/fonts";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "BiteSized Revies",
  description: "Share your bite experiences.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${archivo.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
