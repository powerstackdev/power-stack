import React, {useEffect} from "react"
import { graphql, navigate, useStaticQuery } from "gatsby"
import set from "lodash.set"
import { imageListBlock } from "gatsby-theme-core-design-system/src/components/Images/ImageList"
import { paragraphBlock } from "gatsby-theme-core-design-system/src/components/Text/Paragraph"
import { featureListBlock } from "gatsby-theme-core-design-system/src/components/Features/FeatureList"
import { accordionListBlock } from "gatsby-theme-core-design-system/src/components/Accordions/AccordionList"
import { signpostListBlock } from "gatsby-theme-core-design-system/src/components/Signposts/SignpostList"
import { sliderListBlock } from "gatsby-theme-core-design-system/src/components/Sliders/SliderList"
import {Hero, heroBlock} from "gatsby-theme-core-design-system/src/components/Heros/Hero"
import {BlocksControls, InlineBlocks, InlineForm, InlineWysiwyg} from "react-tinacms-inline"
import { InitForm, InitPlugin } from "../../../../utils/inits";
import { isTinaWindow, createTinaField } from "../../../../utils/tinaUtils";
import Seo from "gatsby-theme-core-design-system/src/components/Misc/Seo"
import { isLoggedIn } from "@powerstack/drupal-oauth-connector"
import Header from "gatsby-theme-core-design-system/src/components/Headers/Header"
import Footer from "gatsby-theme-core-design-system/src/components/Footers/Footer"
import { Title } from "gatsby-theme-core-design-system/src/components/Text/Title"
import { Box, Spinner, Text } from "theme-ui"
import {submitTinaDataToDrupal} from "../../../../utils/postRequestUtils";
import { createTinaInlineBlocks, getRequestFetchMultiple} from "../../../../utils/getRequestUtils";
import {capitalize} from "@powerstack/utils";


export const PageBuilderContext = React.createContext()

/**
 * Page template to create a new CMS page with Tina inline blocks enabled
 *
 * @param serverData
 * @returns {JSX.Element}
 * @constructor
 */
const NewPage = ({ serverData }) => {
  const data = useStaticQuery(graphql`
    query TinaNewPageSiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  console.log(serverData)
  const createComponent = ({ index, data }) => {
    if(React.useContext(PageBuilderContext)[data.path] && React.useContext(PageBuilderContext)[data.path].hasOwnProperty("children")) {
      const blockKey = Object.keys(React.useContext(PageBuilderContext)[data.path].children)[0]
      const availableBlocks = {
      }
      set(availableBlocks, `${blockKey}`, Object.values(React.useContext(PageBuilderContext)[data.path].children)[0])
      set(availableBlocks, `${blockKey}.Component`, createComponent)

      console.log(availableBlocks)

      return(
        <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
          <Section />
          <InlineBlocks className={`-blocks`} name={`blocks`} blocks={availableBlocks} />
        </BlocksControls>
      )
    } else {
      return(
        <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
          <InlineWysiwyg name="text" format="html">
            <p
              className="paragraph__text"
              dangerouslySetInnerHTML={{
                __html: data.text,
              }}
            />
            <p>Text</p>
          </InlineWysiwyg>

        </BlocksControls>
      )
    }
    console.log(data)
    console.log()

  }
  const objKey=Object.keys(serverData.blocks)[0]
  set(serverData, `blocks.${objKey}.Component`, createComponent)

  const PageForm = {
    initialValues: {
      status: true
    },
    fields: serverData.fields
  }

  const [, pageForm] = isTinaWindow ? InitForm(PageForm) : ["", ""]

  isTinaWindow && InitPlugin(pageForm)

  const formConfig = {
    initialValues: serverData.content,
    onSubmit(data) {
      submitTinaDataToDrupal(data)
    },
  }

  const [, form] = isTinaWindow ? InitForm(PageForm) : ["", ""]

  isTinaWindow && InitPlugin(form)

  // if (serverData.hasOwnProperty("goto")) {
  //   navigate("/admin/login", {
  //     state: {
  //       message: "your session has been timed out, please login",
  //       goto: serverData.goto,
  //     },
  //   })
  //   return null
  // }

  return (
    <>
      <Seo title="New page" />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="home">
        {isTinaWindow ? (
          <PageBuilderContext.Provider value={serverData.blocks}>
            <InlineForm form={isTinaWindow && form}>
              <Title title={serverData.content?.title} />
              <InlineBlocks className={'blocks'} name="blocks" blocks={serverData.blocks} />
            </InlineForm>
          </PageBuilderContext.Provider>
        ) : (
          <Box
            sx={{
              minHeight: `400px`,
              width: `100%`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
            }}
          >
            <Spinner />
          </Box>
        )}
      </div>
      <Footer />
    </>
  )
}

export function Section ({ index, data }) {
  return (
    <div>test</div>
  )
}


/**
 * Gatsby API's get server data function
 * @param params
 * @param headers
 * @returns {Promise<{props: (*&{headers: {[p: string]: any}, currentUser: number})}|{headers: {ErrorMessage: string}, status: number, props: {}}>}
 */
export async function getServerData({ params, headers }) {
  const [type, templateId] = params['*'].split('/')

  const requests = {
    contentTypeData: `entity_form_display/entity_form_display?filter[bundle]=${type}`,
    paragraphsData: 'entity_form_display/entity_form_display?filter[targetEntityType]=paragraph',
    usersData: 'user/user',
    languagesData: 'configurable_language/configurable_language',
    apiBaseData: ''
  }

  const requestsData = await getRequestFetchMultiple(headers, requests)

  const pageFields = []
  let pageBlocks = {}

  if(requestsData.errors && Object.keys(requestsData.errors).length === 0 && Object.getPrototypeOf(requestsData.errors) === Object.prototype) {
    const currentUserUuid = requestsData.success.apiBaseData.meta.links.me.meta.id
    let currentUserId = 0

    Object.entries(requestsData.success.usersData.data).forEach(entry => {
      const [, value] = entry;
      if(value.id === currentUserUuid) {
        currentUserId = value.attributes.drupal_internal__uid
      }
    })

    for (const entry of Object.entries(requestsData.success.contentTypeData.data[0].attributes.content).sort((a, b) => (a[1].weight > b[1].weight) ? 1 : -1 )){
      const [key, value] = entry;
      if(!value.type.startsWith("entity_reference_paragraphs")){
        const fieldData = createTinaField(key, value, requestsData.success)
        if (typeof fieldData !== undefined) {
          pageFields.push(fieldData)
        }
      } else {
        const fieldData = await createTinaInlineBlocks(type, value, headers)

        pageBlocks = fieldData
      }
    }

    return {
      props: {
        ...requestsData.success,
        currentUser: currentUserId,
        blocks: pageBlocks,
        fields: pageFields
      },
    }
  } else {
    return {
      status: 500,
      headers: {
        ErrorMessage: JSON.stringify( {...requestsData.errors})
      },
      props: {},
    }
  }

}

export default NewPage