import { AuthOptions } from "next-auth/core/types";
import type { JWT, JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt/types";
import type { GetServerSidePropsContext, NextApiRequest } from "next";
import type { NextRequest } from "next/server";

declare module "next-auth" {
  export type { AuthOptions as NextAuthOptions };
  export * from "next-auth/core/types";
}

declare module "next-auth/jwt" {
  export * from "next-auth/jwt/types";

  export function encode(params: JWTEncodeParams): Promise<string>;
  export function decode(params: JWTDecodeParams): Promise<JWT | null>;

  export interface GetTokenParams<R extends boolean = false> {
    req: GetServerSidePropsContext["req"] | NextRequest | NextApiRequest;
    secureCookie?: boolean;
    cookieName?: string;
    raw?: R;
    secret?: string;
  }

  export function getToken<R extends boolean = false>(
    params: GetTokenParams<R>
  ): Promise<R extends true ? string : JWT | null>;
}
