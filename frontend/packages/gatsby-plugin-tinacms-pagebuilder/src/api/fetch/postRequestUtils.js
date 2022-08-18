import axios from "axios"
import qs from "qs"
import { isTinaWindow } from "../../utils/tinaUtils"

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
        isTinaWindow && window.tinacms.alerts.success("Saved!")
      },
      (error) => {
        isTinaWindow && window.tinacms.alerts.error("Error saving")
      }
    )
}
