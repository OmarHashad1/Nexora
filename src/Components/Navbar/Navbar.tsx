"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import logo from "../../../public/NexoraLogo.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import {
  LogOut,
  UserPen,
  UserRound,
  ShoppingCart,
  ShoppingBasket,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
export default function Navbar() {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    {
      path: "/categories",
      name: "Categories",
    },
    {
      path: "/brands",
      name: "Brand",
    },
    {
      path: "/products",
      name: "Products",
    },
  ];

  const logout = function () {
    signOut({ callbackUrl: "/" });
  };

  const { data: session, status } = useSession();
  return (
    <>
      <nav className="w-full py-2 shadow-lg shadow-white/10 ">
        <div className="container ">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="nav-logo flex justify-center items-center">
                <Image width="60" src={logo} alt="Website Logo" />
                <h1 className="text-3xl font-bold uppercase -m-px">exora</h1>
              </div>
            </Link>
            <div className="nav-links xsm:hidden lg:block">
              <ul className="flex justify-center items-center gap-25">
                {links.map((link) => {
                  const active = link.path == path;
                  return (
                    <li
                      className="font-light uppercase relative group"
                      key={link.path}
                    >
                      <Link
                        href={link.path}
                        className={`${
                          active && "active"
                        } transition-colors duration-300 hover:text-nexora-orange`}
                      >
                        {link.name}
                      </Link>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-nexora-orange transition-all duration-300 group-hover:w-full"></span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="nav-btns xsm:hidden lg:flex justify-center items-center gap-5">
              {status == "authenticated" ? (
                <div className="flex justify-center items-center gap-5">
                  <div className="drop-down">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="default"
                          className="bg-(--main) rounded-full py-6 cursor-pointer hover:bg-orange-700"
                          style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
                        >
                          <UserRound></UserRound>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuItem className="flex justify-center items-center text-gray-500">
                          <span>{`Hi ${session.user.name}`}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <Link href="/profile">
                          <DropdownMenuItem className="cursor-pointer">
                            <span>Profile Setting</span> <UserPen></UserPen>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logout()}>
                          <span className="text-red-500 cursor-pointer flex gap-1 justify-between items-center">
                            Logout
                            <LogOut className="text-red-500"></LogOut>
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="icons flex justify-center items-center gap-5">
                    <Link href="/cart">
                      <div
                        className="bg-(--main) rounded-full py-4 cursor-pointer hover:bg-orange-700"
                        style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
                      >
                        <ShoppingCart
                          className="text-whit"
                          size={18}
                        ></ShoppingCart>
                      </div>
                    </Link>

                    <Link href="/wishlist">
                      <div
                        className="bg-(--main) rounded-full py-4 cursor-pointer hover:bg-orange-700"
                        style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
                      >
                        <ShoppingBasket
                          className="text-whit"
                          size={18}
                        ></ShoppingBasket>
                      </div>
                    </Link>
                  </div>
                </div>
              ) : (
                <Link href={"/login"}>
                  <Button
                    variant={"default"}
                    className="bg-(--main) px-8  uppercase hover:bg-orange-600 cursor-pointer"
                  >
                    Join Us
                  </Button>
                </Link>
              )}
            </div>
            <div className="lg:hidden z-50">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 group cursor-pointer"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <span
                  className={`w-full h-0.5 bg-white transition-all duration-300 group-hover:bg-nexora-orange origin-center ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-white transition-all duration-300 group-hover:bg-nexora-orange ${
                    isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  }`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-white transition-all duration-300 group-hover:bg-nexora-orange origin-center ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`${
          isMenuOpen || "hidden"
        } w-80 h-screen z-30 absolute bg-nexora-black right-0 lg:hidden`}
      >
        <div className="flex flex-col justify-between items-center w-full h-[95%]">
          <div className="nav-links w-full px-4">
            <ul className="flex flex-col justify-center items-start gap-15 mt-30 px-2 py-5 border-t-2 border-orange-700 ">
              {links.map((link) => {
                const active = link.path == path;
                return (
                  <li
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="font-light uppercase relative group"
                    key={link.path}
                  >
                    <Link
                      href={link.path}
                      className={`${
                        active && "active"
                      } transition-colors duration-300 hover:text-nexora-orange`}
                    >
                      {link.name}
                    </Link>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-nexora-orange transition-all duration-300 group-hover:w-full"></span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="pt-3 w-full flex justify-center  border-orange-700  border-t-2">
            {status == "authenticated" ? (
              <div className="flex justify-center items-center gap-5">
                <div className="drop-down">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="default"
                        className="bg-(--main) rounded-full py-6 cursor-pointer hover:bg-orange-700"
                        style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
                      >
                        <UserRound></UserRound>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <Link href="/profile">
                        <DropdownMenuItem className="cursor-pointer">
                          <span>Profile Setting</span> <UserPen></UserPen>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => logout()}>
                        <span className="text-red-500 cursor-pointer flex gap-1 justify-between items-center">
                          Logout
                          <LogOut className="text-red-500"></LogOut>
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="icons flex justify-center items-center gap-5">
                  <Link href="/cart">
                    <div
                      className="bg-(--main) rounded-full py-4 cursor-pointer hover:bg-orange-700"
                      style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
                    >
                      <ShoppingCart
                        className="text-whit"
                        size={18}
                      ></ShoppingCart>
                    </div>
                  </Link>

                  <Link href="/wishlist">
                    <div
                      className="bg-(--main) rounded-full py-4 cursor-pointer hover:bg-orange-700"
                      style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
                    >
                      <ShoppingBasket
                        className="text-whit"
                        size={18}
                      ></ShoppingBasket>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <Link href={"/login"}>
                <Button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  variant={"default"}
                  className="bg-(--main) px-8 uppercase hover:bg-orange-600 cursor-pointer"
                >
                  Join Us
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
