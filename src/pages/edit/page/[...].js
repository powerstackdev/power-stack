import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useForm, usePlugin, useCMS } from "tinacms";
import { imagesBlock } from "../../../components/Images/Images";
import { paragraphBlock } from "../../../components/Text/Paragraph";
import { featureListBlock } from "../../../components/Features/FeatureList";
import { InlineForm, InlineBlocks } from "react-tinacms-inline";
import { heroBlock } from "../../../components/Heros/Hero";
import Seo from "../../../components/Misc/Seo";
import { isLoggedIn } from "../../../services/Auth";
import {
  processDrupalImageData,
  processDrupalFeaturesData,
  processDrupalParagraphData,
} from "../../../utils/GetRequestUtils";
import { formatDrupalType } from "../../../utils/Utils";
import Header from "../../../components/Headers/Header";
import Footer from "../../../components/Footers/Footer";

const EditPage = ({ serverData }) => {
  const data = useStaticQuery(graphql`
    query TinaSiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  let drupalData = {};
  let blocks = [];
  if (!serverData.content.data[0].field_page_builder.data) {
    serverData.content.data[0].field_page_builder.forEach((value, index) => {
      let type = formatDrupalType(value.type);

      switch (type) {
        case "images":
          blocks[index] = processDrupalImageData(type, value);
          break;

        case "features":
          blocks[index] = processDrupalFeaturesData(type, value);
          break;

        default:
          blocks[index] = processDrupalParagraphData(type, value);
      }
    });
  }

  drupalData.blocks = blocks;

  const cms = useCMS();
  const formConfig = {
    initialValues: drupalData,
    onSubmit(data) {
      console.log(data);
      cms.alerts.success("Saved!");
    },
  };

  const [, form] = useForm(formConfig);

  usePlugin(form);

  return (
    <>
      {console.log(serverData)}
      {!serverData ? (
        (window.location.href = `/admin/login`)
      ) : (
        <>
          <Seo title="Edit page" />
          <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
          <h1>{serverData.content.data[0].title}</h1>
          <div className="home">
            <InlineForm form={form}>
              <InlineBlocks name="blocks" blocks={availableBlocks} />
            </InlineForm>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

const availableBlocks = {
  hero: heroBlock,
  paragraph: paragraphBlock,
  images: imagesBlock,
  features: featureListBlock,
};

export default EditPage;

export async function getServerData({ params, headers }) {
  const token = await isLoggedIn(Object.fromEntries(headers).cookie);

  const requestHeaders = {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  };

  const currentRoute =
    `jsonapi/node?filter[drupal_internal__nid]=` +
    params["*"] +
    `&include=field_page_builder,field_page_builder.field_left,field_page_builder.field_left.field_image,field_page_builder.field_right,field_page_builder.field_right.field_image,field_page_builder.field_feature&jsonapi_include=1`;

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
    ]);

    // if (
    //   adminMenu.status !== 200 ||
    //   adminMenu.status !== 403 ||
    //   content.status !== 200 ||
    //   content.status !== 403
    // ) {
    //   throw new Error(`Response failed`);
    // }

    if (!adminMenu.ok) {
      throw new Error(`Response failed`);
    }
    return {
      props: {
        adminMenu: await adminMenu.json(),
        content: await content.json(),
      },
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
