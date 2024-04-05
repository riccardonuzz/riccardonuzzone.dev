import type { Metadata } from "next";
import localFont from 'next/font/local'
import { ReactNode, Suspense } from "react";

import "./globals.css";
import Flashlight from "@/components/flashlight/flashlight";
import SideMenu from "@/components/side-menu/side-menu";


export const metadata: Metadata = {
  title: "Riccardo Nuzzone",
  description: "Riccardo Nuzzone: a passionate front-end developer!",
};

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body >
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
          <filter id='grain'>
            <feTurbulence
              type='turbulence'
              baseFrequency='0.75'
            />
          </filter>
        </svg>

      </body>
    </html>
  );
}

export default RootLayout