import axios from "axios"
import qs from "qs"

export const submitTinaDataToDrupal = (data) => {
  axios
    .post(
      process.env.GATSBY_DRUPAL_HOST + `/api/tinacms/page/create`,
      qs.stringify({
        json_data: data,
      })
    )
    .then(
      (response) => {
        isWindow && window.tinacms.alerts.success("Saved!")
      },
      (error) => {
        isWindow && window.tinacms.alerts.error("Error saving")
      }
    )
}
