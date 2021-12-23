import * as React from "react"
import { TinaProvider, TinaCMS } from "tinacms"
import { DragDropContext } from 'react-beautiful-dnd';
import DummyMediaStore from '../../src/mediaStore';

export const wrapRootElement = ({ element }, options) => {
  if (window.location.pathname.startsWith('/edit/page/')){
    window.tinacms = new TinaCMS({
      enabled: options.enabled,
      toolbar: true,
      media: new DummyMediaStore(),
    })
    return <TinaProvider cms={window.tinacms}><DragDropContext>{element}</DragDropContext></TinaProvider>
  }
  
}
