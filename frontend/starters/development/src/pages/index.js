import { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { isBrowser } from "@powerstack/utils"
import { isLoggedIn } from "@powerstack/drupal-oauth-connector"

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    isLoggedIn().then(result => {
      setLoggedIn(result)
    })
  })
  loggedIn
    ? isBrowser && navigate("/admin/content")
    : isBrowser && navigate("/admin/login")
  return null
}

export default Home
