import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/signin" },
  callbacks: {
    authorized({ token }) {
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/designer", "/plans"],
};
