"use client";
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import "@/styles/globals.css";
import StoreProvider from "./StoreProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from '@/components/footer/Footer';
import MiniNavbar from '@/components/navbar/MiniNavbar';
import NavbarMobile from '@/components/navbar/NavbarMobile';
import { usePathname } from 'next/navigation';

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSellerChannel = pathname === "/seller/auth/login" || pathname === "/seller/auth/register";

  return (
    <html lang="en">
      <body
        className={cn(
          'antialiased min-h-screen bg-[#e8fef1] lg:text-[0.75rem] md:bg-gradient-to-b md:from-[#e8fef1] md:to-white',
          fontHeading.variable,
          fontBody.variable,
          'flex flex-col' // Add Flexbox layout
        )}
      >
        <div>
          <MiniNavbar />
        </div>
        
        <StoreProvider>
          <Navbar />
          <main className={`flex-grow ${isSellerChannel ? "flex justify-center items-center":""}`}> {children} </main> {/* Main content takes up remaining space */}
          <NavbarMobile />
        </StoreProvider>
        
        <div className="md:mb-16 z-10">
              <Footer />{/* Ensure Footer has lower z-index */}
          </div> 
      </body>
    </html>
  );
}
