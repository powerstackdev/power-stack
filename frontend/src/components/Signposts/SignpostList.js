/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { BlocksControls, InlineBlocks } from "react-tinacms-inline";
import { isLoggedIn } from "../../services/Auth";

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
    const fetchData = async () =>  {
      const token = await isLoggedIn(document.cookie);

      const requestHeaders = {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      };
        fetch(
          process.env.GATSBY_DRUPAL_HOST + `/jsonapi/taxonomy_term/signpost_types?sort=weight`,
          requestHeaders
        ).then(response => response.json()).then(async data => {
          let iterator = {}

          for (const [, value] of Object.entries(data.data)) {

            const machineName = `signpost${value.attributes.name.replace(/\s/g, "")}`
            const importName = `Signpost${value.attributes.name.replace(/\s/g, "")}`
            const importFilename = './' + importName + '.js'

            try{
              const {default: loadedDefault} = await import(`${importFilename}`)
              iterator[machineName] = loadedDefault
            } catch (e) {
              console.log(e)
            }
          }

          setTypes(iterator)
        })
    };
    fetchData();
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
