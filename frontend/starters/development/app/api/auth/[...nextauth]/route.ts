import NextAuth, { Session } from "next-auth"
import type { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtDecode as jwt_decode } from "jwt-decode"

interface ExtendedSession extends Session {
  accessToken?: string | unknown
  error?: string | unknown
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Drupal",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const formData = new URLSearchParams()
        formData.append("grant_type", "password")
        formData.append("client_id", process.env.NEXT_PUBLIC_DRUPAL_CLIENT_ID)
        formData.append(
          "client_secret",
          process.env.NEXT_PUBLIC_DRUPAL_CLIENT_SECRET
        )
        formData.append("username", credentials.username)
        formData.append("password", credentials.password)

        // Get access token from Drupal.
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DRUPAL_HOST}/oauth/token`,
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )

        if (!response.ok) {
          return null
        }

        return await response.json()
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (
        account &&
        user &&
        "access_token" in user &&
        "expires_in" in user &&
        "refresh_token" in user
      ) {
        token.accessToken = user.access_token
        token.accessTokenExpires =
          Date.now() + (user.expires_in as number) * 1000
        token.refreshToken = user.refresh_token
      }

      // If token has not expired, return it,
      if (
        token.accessTokenExpires &&
        typeof token.accessTokenExpires === "number" &&
        Date.now() < token.accessTokenExpires
      ) {
        return token
      }

      // Otherwise, refresh the token.
      return refreshAccessToken(token)
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession
      token: JWT
    }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
        const decoded = jwt_decode<{ email: string; username: string }>(
          token.accessToken as string
        )
        session.user.email = decoded.email
        session.user.name = decoded.username
        session.error = token.error
      }
      return session
    },
  },
})

// Helper to obtain a new access_token from a refresh token.
async function refreshAccessToken(token) {
  try {
    const formData = new URLSearchParams()

    formData.append("grant_type", "refresh_token")
    formData.append("client_id", process.env.NEXT_PUBLIC_DRUPAL_CLIENT_ID)
    formData.append(
      "client_secret",
      process.env.NEXT_PUBLIC_DRUPAL_CLIENT_SECRET
    )
    formData.append("refresh_token", token.refreshToken)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DRUPAL_HOST}/oauth/token`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error()
    }

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
      refreshToken: data.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export { handler as GET, handler as POST }
