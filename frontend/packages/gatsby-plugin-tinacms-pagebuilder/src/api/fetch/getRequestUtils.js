import { isLoggedIn } from "@powerstack/drupal-oauth-connector"

/**
 * Checks the headers provided from the getServerData() function from a cookie and returns a bearer token object.
 *
 * @param headers
 * @returns {Promise<{headers: {Authorization: string}}>}
 */

export const getRequestHeaders = async (headers) => {
  const token = await isLoggedIn(Object.fromEntries(headers).cookie)

  return {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }
}

/**
 * Perform multiple Drupal API GET requests (using fetch) based on a key/value store object.
 *
 * @param headers
 * @param requests key/value store.  The key is a label and the value is the Drupal API request path.
 * @returns {Promise<{success: {}, errors: {}}|{props: {goto: string}}>}
 */
export const getRequestFetchMultiple = async (headers, requests) => {
  const requestHeaders = await getRequestHeaders(headers)

  const requestsData = {
    success: {},
    errors: {},
  }

  // Iterate over endpoints and attempt to request
  for (const [key, value] of Object.entries(requests)) {
    try {
      const data = await fetch(
        process.env.GATSBY_DRUPAL_HOST + `/jsonapi/${value}`,
        requestHeaders
      )

      // If the user is logged out set goto header
      if (data.status === 401) {
        return {
          props: {
            goto: "page/edit/" + params["*"],
          },
        }
      }
      if (!data.ok) {
        throw new Error(`${key} Response failed`)
      }

      const dataJson = await data.json()
      requestsData["success"][`${key}`] = dataJson
    } catch (error) {
      console.log(error)
      requestsData["errors"][`${key}`] = error
    }
  }
  return requestsData
}
