import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = [
  "/cart",
  "/wishlist",
  "/profile",
  "/profile/allorders",
  "/profile/address",
  "/checkout",
  "/allorders",
];
const authRoutes = [
  "/login",
  "/register",
  "/forgetPassword",
  "/forgetPasswordCode",
  "/resetPassword",
];

export default async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgetPassword",
    "/forgetPasswordCode",
    "/resetPassword",
    "/cart",
    "/wishlist",
    "/profile",
    "/profile/allorders",
    "/profile/address",
    "/checkout",
    "/allorders",
  ],
};
