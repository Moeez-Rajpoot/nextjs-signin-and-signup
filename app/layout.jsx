import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from '../app/StoreProvider';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Record Store",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <StoreProvider>
        
        {children}
        
        </StoreProvider>
        </body>
    </html>
  );
}
