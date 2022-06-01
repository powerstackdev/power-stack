/** @jsx jsx */
import React from 'react'
import { jsx, Button, Badge } from "theme-ui";
import { FiBell } from "react-icons/fi";

export const NotificationsButton = () => (
  <>
    <Button variant="clear">
      <FiBell />
      <Badge variant='circle' ml={-2} mt={-3}>16</Badge>
    </Button>

  </>

)

export default NotificationsButton