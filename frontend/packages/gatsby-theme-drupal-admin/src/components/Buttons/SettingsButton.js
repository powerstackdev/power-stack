/** @jsx jsx */
import { jsx, Button } from "theme-ui"
import { FiSettings } from "react-icons/fi"

export const SettingsButton = () => (
  <Button variant="clear">
    <FiSettings />
  </Button>
)

export default SettingsButton
