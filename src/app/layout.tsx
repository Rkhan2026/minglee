import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ClerkProvider,} from '@clerk/nextjs'
import { ThemeProvider } from "@/components/Themeprovider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Minglee",
  description: "Modern Social Media Application Powered By Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning={true}>{/* supressHydrationWarning is use dto prevent hyderation error*/}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {/*Purpose: Acts as the container for the entire visible content*/}
          <div className="min-h-screen"> 
            <Navbar/>
            {/*Purpose: Wraps the content of the page to ensure consistent alignment and spacing.*/ }
              <main className="py-8"> 
                  {/*Purpose: Container to center the content*/}
                  <div className="max-w-7xl mx-auto px-4">
                    {/*Purpose: Creates a grid-based layout for arranging content, enabling a sidebar and main content area.*/ }
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6"> 
                    {/*Purpose: Defines the sidebar space.*/}
                        <div className="hidden lg:block lg:col-span-3"> 
                              <Sidebar/>
                        </div>
                        {/*Purpose: Defines the main content area where dynamic content (children) is rendered. */}
                        <div className="lg:col-span-9">{children}</div>
                    </div>
                  </div>                
                </main>
              </div>       
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
{/*

  +------------------------------------------------+
  | Navbar                                         |
  +------------------------------------------------+
  | Sidebar (3 columns) | Main Content (9 columns) |
  +------------------------------------------------+

*/}
