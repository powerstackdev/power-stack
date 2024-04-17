import axios from "axios"
import { isLoggedIn } from "@powerstack/drupal-oauth-connector"

export default class DrupalMediaStore {
  accept = "text/*,  application/*, image/*"
  multiple = true
  async persist(files) {
    for (const { file } of files) {
      let formData = new FormData()
      formData.append("file", file)

      await axios
        .post(
          process.env.GATSBY_DRUPAL_HOST + `/api/tinacms/media/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .catch((error) => {
          console.log(error)
        })
    }
  }
  async previewSrc(src) {
    return src
  }

  async list() {
    const data = await mediaData()
    const items = data.props.media.data.map((mediaItem) => {
      return {
        id: mediaItem.drupal_internal__mid,
        vid: mediaItem.drupal_internal__vid,
        type: "file",
        filename: mediaItem.name,
        src:
          process.env.GATSBY_DRUPAL_HOST + mediaItem.field_media_image.uri.url,
        previewSrc:
          process.env.GATSBY_DRUPAL_HOST + mediaItem.thumbnail.uri.url,
      }
    })
    return {
      items,
      offset: 0,
      limit: 10,
      totalCount: 0,
    }
  }
  async delete() {
    alert("Cannot delete files without a backend")
  }
}

export async function mediaData() {
  const token = await isLoggedIn()

  const requestHeaders = {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }

  const currentRoute = `jsonapi/media?include=field_media_image,thumbnail&jsonapi_include=1&sort=-created`

  try {
    const [media] = await Promise.all([
      fetch(
        process.env.GATSBY_DRUPAL_HOST + `/` + currentRoute,
        requestHeaders
      ),
    ])

    // if (
    //   adminMenu.status !== 200 ||
    //   adminMenu.status !== 403 ||
    //   content.status !== 200 ||
    //   content.status !== 403
    // ) {
    //   throw new Error(`Response failed`);
    // }

    if (!media.ok) {
      throw new Error(`Response failed`, media.status)
    }
    return {
      props: {
        media: await media.json(),
      },
    }
  } catch (error) {
    console.log(error)
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
