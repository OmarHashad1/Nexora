

declare module "next-auth" {
  interface User {
    user: {
      email: string;
      password: string;
      name: string;
    };
    token: string;
  }

  interface Session {
    user: User["user"];
    userId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User["user"];
    token: string;
    userId?: string;
  }
}
