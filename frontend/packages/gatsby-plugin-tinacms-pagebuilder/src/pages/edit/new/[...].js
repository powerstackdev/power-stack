import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import set from "lodash.set"
import { InlineBlocks, InlineForm } from "react-tinacms-inline"
import { InitForm, InitPlugin } from "../../../../utils/inits";
import {
  createBlockComponent,
  createTinaField,
  createTinaInlineBlocks,
  isTinaWindow
} from "../../../../utils/tinaUtils";
import Seo from "gatsby-theme-core-design-system/src/components/Misc/Seo"
import Header from "gatsby-theme-core-design-system/src/components/Headers/Header"
import Footer from "gatsby-theme-core-design-system/src/components/Footers/Footer"
import { Title } from "gatsby-theme-core-design-system/src/components/Text/Title"
import { Box, Spinner } from "theme-ui"
import { getRequestFetchMultiple } from "../../../../utils/getRequestUtils";

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

  set(serverData, `blocksData.${Object.keys(serverData.blocksData)[0]}.Component`, createBlockComponent)

  const PageForm = {
    initialValues: {
      status: true
    },
    fields: serverData.fields
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
          <PageBuilderContext.Provider value={serverData.blocksData}>
            <InlineForm form={isTinaWindow && form}>
              <Title title={serverData.content?.title} />
              <InlineBlocks className={'blocks'} name="blocks" blocks={serverData.blocksData} />
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

/**
 * Gatsby API's get server data function
 * @param params
 * @param headers
 * @returns {Promise<{props: (*&{headers: {[p: string]: any}, currentUser: number})}|{headers: {ErrorMessage: string}, status: number, props: {}}>}
 */
export async function getServerData({ params, headers }) {
  const [type, templateId] = params['*'].split('/')

  // An object of the requests we are going to execute against Drupal's API
  const requests = {
    contentTypeData: `entity_form_display/entity_form_display?filter[bundle]=${type}`,
    paragraphsData: 'entity_form_display/entity_form_display?filter[targetEntityType]=paragraph',
    usersData: 'user/user',
    languagesData: 'configurable_language/configurable_language',
    apiBaseData: ''
  }

  // Execute the requests
  const requestsData = await getRequestFetchMultiple(headers, requests)

  // Make sure that we don't have any errors returned
  if(requestsData.errors && Object.keys(requestsData.errors).length === 0 && Object.getPrototypeOf(requestsData.errors) === Object.prototype) {
    // Local variables
    const pageFields = []
    let blocksData = {}

    // Set the current Drupal UID
    const currentUserUuid = requestsData.success.apiBaseData.meta.links.me.meta.id
    let currentUserId = 0

    Object.entries(requestsData.success.usersData.data).forEach(entry => {
      const [, value] = entry;
      if(value.id === currentUserUuid) {
        currentUserId = value.attributes.drupal_internal__uid
      }
    })

    // Iterate over data to build out form fields and
    for (const entry of Object.entries(requestsData.success.contentTypeData.data[0].attributes.content).sort((a, b) => (a[1].weight > b[1].weight) ? 1 : -1 )){
      const [key, value] = entry;
      if(!value.type.startsWith("entity_reference_paragraphs")){
        const fieldData = createTinaField(key, value, requestsData.success)
        if (typeof fieldData !== undefined) {
          pageFields.push(fieldData)
        }
      } else {
        const fieldData = await createTinaInlineBlocks(type, value, headers)
        blocksData = fieldData
      }
    }

    return {
      props: {
        ...requestsData.success,
        currentUser: currentUserId,
        fields: pageFields,
        blocksData
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