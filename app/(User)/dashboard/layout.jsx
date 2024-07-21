import Navbar from "@/components/navbar";

export const metadata = {
  title: "Book Store",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className='mt-[73px]'>
        {children}

        </div>
        
        </body>
    </html>
  );
}
