"use client";

import { ModeToggle } from "@/components/themes/theme";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HomeIcon, CheckCircle, Info } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between p-5">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-black dark:text-white">
          HEALTHCARE
        </h1>
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        <Button className="hidden md:block" variant="link">
          <Link href="/">Home</Link>
        </Button>
        <Button className="block md:hidden" variant="link">
          <Link href="/">
            <HomeIcon />
          </Link>
        </Button>
        <Button className="hidden md:block" variant="link">
          <Link href="/appointments">Appointments</Link>
        </Button>
        <Button className="block md:hidden" variant="link">
          <Link href="/appointments">
            <CheckCircle />
          </Link>
        </Button>
        <Button className="hidden md:block" variant="link">
          <Link href="/about">About</Link>
        </Button>
        <Button className="block md:hidden" variant="link">
          <Link href="/about">
            <Info />
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
