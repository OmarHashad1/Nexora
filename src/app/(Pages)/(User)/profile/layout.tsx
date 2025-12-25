"use client";

import React from "react";
import { UserRound, User, MapPin, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/profile",
      label: "User Info",
      icon: User,
    },
    {
      href: "/profile/address",
      label: "Address",
      icon: MapPin,
    },
    {
      href: "/profile/allorders",
      label: "Orders",
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-80 w-full">
          <div className="bg-[#252525] border border-white/5 rounded-[--radius] p-6 sticky top-24">
            <div className="flex justify-center mb-6">
              <div className="bg-(--main) rounded-full p-8">
                <UserRound className="w-16 h-16 text-white" />
              </div>
            </div>

            <div className="space-y-3">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 ${
                      isActive
                        ? "bg-(--main) text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-[#252525] border border-white/5 rounded-[--radius] p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
