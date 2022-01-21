import React from "react"
import { graphql, navigate, useStaticQuery } from "gatsby"
import { useCMS, useForm, usePlugin } from "tinacms"
import axios from "axios"
import qs from 'qs'
import { imageListBlock } from "../../../components/Images/ImageList"
import { paragraphBlock } from "../../../components/Text/Paragraph"
import { featureListBlock } from "../../../components/Features/FeatureList"
import { accordionListBlock } from "../../../components/Accordions/AccordionList"
import { InlineBlocks, InlineForm } from "react-tinacms-inline"
import { heroBlock } from "../../../components/Heros/Hero"
import Seo from "../../../components/Misc/Seo"
import { isLoggedIn } from "../../../services/Auth"
import {
  processDrupalFeaturesData,
  processDrupalImageData,
  processDrupalParagraphData,
} from "../../../utils/GetRequestUtils"
import { formatDrupalType } from "../../../utils/Utils"
import Header from "../../../components/Headers/Header"
import Footer from "../../../components/Footers/Footer"
import { Title } from "../../../components/Text/Title"
import { Spinner, Box } from "theme-ui";

// These init functions are a bit of a hack to get around the the conditional rules of hooks error
const InitCMS = () => {
  useCMS()

  return null
}

const InitForm = (formConfig) => {
  return useForm(formConfig)
}

const InitPlugin = (form) => {
  usePlugin(form)

  return null
}

const EditPage = ({serverData}) => {
  const isWindow = typeof window !== "undefined";
  const data = useStaticQuery(graphql`
    query TinaSiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const cms = isWindow && InitCMS

  const formConfig = {
    initialValues: serverData.content,
    onSubmit(data) {
      axios.post(process.env.GATSBY_DRUPAL_HOST + `/api/tinacms/page/create`, qs.stringify({
        json_data: data
      })).then((response) => {
        cms.alerts.success("Saved!")
      }, (error) => {
        cms.alerts.error("Error saving")
      })
    },
  }

  const [, form] = isWindow ? InitForm(formConfig) : ['', '']

  isWindow && InitPlugin(form)

  if (serverData.hasOwnProperty('goto')) {
    navigate("/admin/login", {
      state: {message: "your session has been timed out, please login", goto: serverData.goto},
    })
    return null
  }

  return (
    <>
      <Seo title="Edit page"/>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`}/>
      <div className="home">
        { isWindow ?
          <InlineForm form={isWindow && form}>
            <Title title={serverData.content?.title}/>
            <InlineBlocks name="blocks" blocks={availableBlocks}/>
          </InlineForm>
          :
          <Box sx={{
            minHeight: `400px`,
            width: `100%`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`
          }}>
            <Spinner />
          </Box>
        }

      </div>
      <Footer/>
    </>
  )
}


const availableBlocks = {
  hero: heroBlock,
  paragraph: paragraphBlock,
  images: imageListBlock,
  features: featureListBlock,
  accordions: accordionListBlock
}

export default EditPage

export async function getServerData({params, headers}) {
  const token = await isLoggedIn(Object.fromEntries(headers).cookie)

  const requestHeaders = {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }

  const includes = [
    'field_page_builder',
    'field_page_builder.field_image.field_media.field_media_image',
    'field_page_builder.field_image.field_media.thumbnail',
    'field_page_builder.field_feature'
  ]

  const currentRoute =
    `jsonapi/node?filter[drupal_internal__nid]=` +
    params["*"] +
    '&include=' +
    includes.toString() +
    `&jsonapi_include=1`

  try {
    const [adminMenu, content] = await Promise.all([
      fetch(
        process.env.GATSBY_DRUPAL_HOST + `/jsonapi/menu_items/admin`,
        requestHeaders
      ),
      fetch(
        process.env.GATSBY_DRUPAL_HOST + `/` + currentRoute,
        requestHeaders
      ),
    ])
    if (
      adminMenu.status === 401 ||
      content.status === 401
    ) {
      return {
        props: {
          goto: 'page/edit/' + params["*"]
        },
      }
    }
    if (
      !adminMenu.ok || !content.ok
    ) {
      throw new Error(`Response failed`)
    }

    const data = await content.json()

    let drupalData = {}

    let blocks = []
    data.data[0].field_page_builder.forEach((value, index) => {
      let type = formatDrupalType(value.type)

      switch (type) {
        case "images":
          blocks[index] = processDrupalImageData(type, value)
          break

        case "features":
          blocks[index] = processDrupalFeaturesData(type, value)
          break

        default:
          blocks[index] = processDrupalParagraphData(type, value)
      }
    })


    drupalData.title = data.data[0].title
    drupalData.nid = data.data[0].drupal_internal__nid
    drupalData.uid = data.data[0].uid
    drupalData.blocks = blocks

    return {
      props: {
        adminMenu: await adminMenu.json(),
        content: drupalData,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
