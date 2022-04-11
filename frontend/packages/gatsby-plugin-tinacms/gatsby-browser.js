import * as React from "react"
import { TinaProvider, TinaCMS } from "tinacms"
import { DragDropContext } from 'react-beautiful-dnd';
import DrupalMediaStore from './src/DrupalMediaStore';

export const wrapRootElement = ({ element }, options) => {
  if (window.location.pathname.startsWith('/edit/page/')){
    window.tinacms = new TinaCMS({
      enabled: options.enabled,
      toolbar: true,
      sidebar: options.sidebar,
      media: new DrupalMediaStore(),
    })
    return <TinaProvider cms={window.tinacms}><DragDropContext>{element}</DragDropContext></TinaProvider>
  }

}
