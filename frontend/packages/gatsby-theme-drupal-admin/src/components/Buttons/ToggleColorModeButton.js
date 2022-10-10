/** @jsx jsx */
import { jsx, Button, useColorMode } from "theme-ui"
import { FiSun, FiMoon } from "react-icons/fi"

export const ToggleColorModeButton = (props) => {
  const [mode, setMode] = useColorMode()

  return (
    <Button
      variant="clear"
      {...props}
      onClick={(e) => {
        const next = mode === "dark" ? "light" : "dark"
        setMode(next)
      }}
    >
      {mode === "dark" ? <FiSun /> : <FiMoon />}
    </Button>
  )
}

export default ToggleColorModeButton
