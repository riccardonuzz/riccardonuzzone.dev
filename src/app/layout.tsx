import type { Metadata, Viewport } from "next";
import { ReactNode, Suspense } from "react";

import "./globals.css";
import Flashlight from "@/components/flashlight/flashlight";
import SideMenu from "@/components/side-menu/side-menu";


export const metadata: Metadata = {
  metadataBase: new URL('https://www.riccardonuzzone.dev'),
  title: "Riccardo Nuzzone",
  description: "Riccardo Nuzzone: a passionate front-end developer!",
  openGraph: {
    title: "Riccardo Nuzzone",
    description: "Riccardo Nuzzone: a passionate front-end developer!",
    images: ['/opengraph-cover.png']
  },
};

export const viewport: Viewport = {
  themeColor: "#000056",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <link rel="icon" href="/icon.ico" sizes="any" />
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <link
        rel="apple-touch-icon"
        href="/apple-icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body>
        <div className="layout w-full z-10 h-full max-md:overflow-y-auto max-md:before:h-full max-md:after:h-full">
          <Suspense>
            <Flashlight />
          </Suspense>
          <div className="grid grid-cols-12 w-full">
            <div className="flex col-span-4 max-md:col-span-12 max-lg:col-span-5">
              <SideMenu />
            </div>
            <div className="col-span-8 max-md:col-span-12 max-lg:col-span-7">
              {children}
            </div>
          </div>
        </div>

        <svg className="fixed">
          <filter id="grain">
            <feTurbulence type="turbulence" baseFrequency="0.75" />
          </filter>
        </svg>
      </body>
    </html>
  );
};

export default RootLayout;
