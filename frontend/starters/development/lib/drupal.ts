
import { NextDrupal } from "next-drupal"

const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_HOST as string
const clientId = process.env.NEXT_PUBLIC_DRUPAL_CLIENT_ID as string
const clientSecret = process.env.NEXT_PUBLIC_DRUPAL_CLIENT_SECRET as string

export const drupal = new NextDrupal(baseUrl, {
  auth: {
    clientId,
    clientSecret,
  }
  // debug: true,
  // useDefaultResourceTypeEntry: true,
})
