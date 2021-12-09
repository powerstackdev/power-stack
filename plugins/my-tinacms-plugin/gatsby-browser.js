import * as React from "react"
import { TinaProvider, TinaCMS } from "tinacms"
import DummyMediaStore from '../../src/mediaStore';

export const wrapRootElement = ({ element }, options) => {
  window.tinacms = new TinaCMS({
    enabled: options.enabled,
    toolbar: true,
    media: new DummyMediaStore(),
  })
  return <TinaProvider cms={window.tinacms}>{element}</TinaProvider>
}
