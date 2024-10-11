"use client";

import Link from "next/link";
import { House, ShoppingCart, PhoneCall  } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-full h-16 bg-white px-4">
      <header className="flex justify-center h-full items-center gap-12 border-b-2">
        <Link href="/">
          {/* Conditionally set color based on pathname */}
          <House size={32} color={pathname === "/" ? "#4a47ff" : "#454545"} />
        </Link>
        <Link href="/shopping-cart">
          {/* Conditionally set color based on pathname */}
          <ShoppingCart size={32} color={pathname === "/shopping-cart" ? "#4a47ff" : "#454545"} />
        </Link>
        <Link href="/accounts">
          {/* Conditionally set color based on pathname */}
          <PhoneCall size={32} color={pathname === "/accounts" ? "#4a47ff" : "#454545"} />
        </Link>
      </header>
    </div>
  );
}
