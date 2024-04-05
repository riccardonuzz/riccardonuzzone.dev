"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  "introduction",
  "work-experiences",
  "personal-projects",
  "wrong-link",
];

const MenuLinks = () => {
  const pathname = usePathname();
  let [activeSection, setActiveSection] = useState<string>("introduction");

  useEffect(() => {
    let sections = [
      document.getElementById("introduction"),
      document.getElementById("work-experiences"),
      document.getElementById("personal-projects"),
    ];

    if (pathname === `/${links[3]}`) {
      setActiveSection("wrong-link");
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === links[0]) {
            setActiveSection(links[0]);
            document.location.hash = links[0];
          }
          if (entry.target.id === links[1]) {
            setActiveSection(links[1]);
            document.location.hash = links[1];
          }
          if (entry.target.id === links[2]) {
            setActiveSection(links[2]);
            document.location.hash = links[2];
          }
        }
      });
    }, observerOptions);

    sections?.forEach((section) => {
      section && observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  const isActive = (link: string) =>
    link === activeSection ? "text-white" : "text-white/45";

  return (
    <menu className="pl-2 mt-8 text-xl text-end z-0 max-md:text-center">
      <li
        className={classNames(
          "hover:text-white transition hover:scale-125 duration-500",
          isActive(links[0])
        )}
      >
        <Link href="/#introduction">introduction /</Link>
      </li>
      <li
        className={classNames(
          "hover:text-white transition hover:scale-125 duration-500",
          isActive(links[1])
        )}
      >
        <Link href="/#work-experiences">work experiences /</Link>
      </li>
      <li
        className={classNames(
          "hover:text-white transition hover:scale-125 duration-500",
          isActive(links[2])
        )}
      >
        <Link href="/#personal-projects">personal projects /</Link>
      </li>
      <li
        className={classNames(
          "text-red-600 transition hover:scale-125 duration-500",
          isActive(links[3])
        )}
      >
        <Link href="/wrong-link">wrong link /</Link>
      </li>
    </menu>
  );
};

export default MenuLinks;
