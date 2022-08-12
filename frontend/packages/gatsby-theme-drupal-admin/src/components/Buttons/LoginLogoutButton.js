/** @jsx jsx */
import { jsx } from "theme-ui"
import { Button } from "theme-ui"
import React, { useEffect, useState } from "react"
import { isLoggedIn } from "@powerstack/drupal-oauth-connector"

export const LoginLogoutButton = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    isLoggedIn().then((result) => {
      setLoggedIn(result)
    })
  }, [])
  return (
    <li
      sx={{
        listStyleType: `none`,
        display: "inline",
        pl: 3,
      }}
    >
      {loggedIn ? (
        <Button variant="outline" sx={{ display: "inline" }}>
          {" "}
          Log out
        </Button>
      ) : (
        <Button>Login</Button>
      )}
    </li>
  )
}

export default LoginLogoutButton
