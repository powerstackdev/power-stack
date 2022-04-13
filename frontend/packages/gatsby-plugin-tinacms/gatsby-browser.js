import * as React from "react"
import { TinaProvider, TinaCMS } from "tinacms"
import DrupalMediaStore from './src/DrupalMediaStore';

export const wrapRootElement = ({ element }, {
  editPath,
  enabled,
  toolbar,
  sidebar
}) => {
  if (window.location.pathname.startsWith(editPath)){
    window.tinacms = new TinaCMS({
      enabled,
      toolbar,
      sidebar,
      media: new DrupalMediaStore(),
    })
    return <TinaProvider cms={window.tinacms}>{element}</TinaProvider>
  }

}
