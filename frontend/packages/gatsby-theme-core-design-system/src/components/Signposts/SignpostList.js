/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useEffect, useState } from "react";
import { BlocksControls, InlineBlocks } from "react-tinacms-inline";
import { isLoggedIn } from "@powerstack/drupal-oauth-connector";

const SignpostList = ({ data, index }) => {
  const SIGNPOST_BLOCKS = GenerateSignpostBlocks()
  const columns = `1fr `.repeat(data.columns ? data.columns : 2)

  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <div
        sx={{
          width: `100%`,
          maxWidth: `1200px`,
          m: `0 auto`,
          p: `5rem 4rem`,
        }}
      >
        <InlineBlocks
          name="signposts"
          blocks={SIGNPOST_BLOCKS}
          direction="horizontal"
          className="signpost-list"
          sx={{
            display: `grid`,
            gridTemplateColumns: columns,
            gridGap: `3rem`,
            gridTemplateRows: `auto`,
          }}
        />
      </div>

    </BlocksControls>
  );
}

const GenerateSignpostBlocks = () => {
  const [types, setTypes] = useState({});

  useEffect( () => {
    let isSubscribed = true;

    const fetchData = async () =>  {
      const token = await isLoggedIn(document.cookie);

      const requestHeaders = {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      };
        fetch(
          process.env.GATSBY_DRUPAL_HOST + `/jsonapi/field_config/field_config?api-key=${process.env.GATSBY_DRUPAL_KEY}&filter[drupal_internal__id]=paragraph.signposts.field_signpost`,
          requestHeaders
        ).then(response => response.json()).then(async data => {
          let iterator = {}
          for (const [, value] of Object.entries(data.data[0].attributes.settings.handler_settings.target_bundles)) {

            const importName = `${value.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`
            const blockName = `${importName.charAt(0).toLowerCase() + importName.slice(1)}`

            const importFilename = './' + importName + '.js'

            try{
              const {default: loadedDefault} = await import(`${importFilename}`)
              iterator[blockName] = loadedDefault
            } catch (e) {
              console.log(e)
            }
          }

          setTypes(iterator)
        })
    };
    fetchData();
    return () => (isSubscribed = false)
  }, []);

  return types
}


export const signpostListBlock = {
  Component: SignpostList,
  template: {
    label: "Signposts",
    defaultItem: {
      _template: "signposts",
      signposts: [
        {
          _template: "signpostShareprice",
        },
      ],
    },
    fields: [
      {
        name: "columns",
        label: "Signposts per row",
        component: "number"
      }
    ],
  }
};
