import { Archivo, Lobster_Two } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const lobster = Lobster_Two({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-display",
});
