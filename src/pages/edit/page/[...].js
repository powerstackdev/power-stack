import React from 'react';
import { useForm, usePlugin, useCMS } from 'tinacms';
import { imagesBlock } from '../../../components/Images';
import { paragraphBlock } from '../../../components/Paragraph';
import { featureListBlock } from '../../../components/FeatureList';
import { InlineForm, InlineBlocks } from 'react-tinacms-inline';
import { heroBlock } from '../../../components/Hero';
import data from '../../../data/data.json';
import '../../../styles/index.css'
import Layout from '../../../components/layout';
import Seo from '../../../components/seo';

import { isLoggedIn } from '../../../services/auth';

const EditPage = ({ serverData }) => {
    console.log(data)
    console.log(serverData.content)
  // data.blocks[0].headline = serverData.content.data[0].attributes.title
  // data.blocks[5] = {
  //     _template: 'paragraph',
  //     text: serverData.content.data[0].attributes.body.processed
  // }
  let blocks = []
  
  serverData.content.included.map(
    (value, index) => {
      const type = value.type.replace("paragraph--", "")
      let fields = {}
      Object.keys(value.attributes).map(
        (key) => {
          const fieldPrefix = 'field_'
          if (key.startsWith(fieldPrefix)) {
            const title = key.replace(fieldPrefix, "")
            let attribute = value.attributes[key]
            switch (title) {
              case "subtext":
              case 'text' :
                attribute = attribute.processed
                break;
              case 'text_color':
              case 'background_color' : 
                attribute = attribute.color
                break;
            }
            return fields[title] = attribute
          }
        }
      )
      switch(type) {
        case "images":
        case "features":
          break;

        default:
          blocks[index] = {
            _template: type,
            ...fields
          }; 
      }
    }
  )
  data.blocks = blocks

  const cms = useCMS();
  const formConfig = {
    id: '../../../data/data.json',
    initialValues: data,
    onSubmit() {
      cms.alerts.success('Saved!');
    },
  };

  const [, form] = useForm(formConfig);

  usePlugin(form);

  return (
      <>
      <Seo title="Edit page" />
      <div className='home'>
        <InlineForm form={form}>
          <InlineBlocks name='blocks' blocks={HOME_BLOCKS} />
        </InlineForm>
      </div>
      </>
  );
}

const HOME_BLOCKS = {
  hero: heroBlock,
  images: imagesBlock,
  paragraph: paragraphBlock,
  features: featureListBlock,
};

export default EditPage

export async function getServerData({ params, headers }) {

  const token = await isLoggedIn(Object.fromEntries(headers).cookie)


  const requestHeaders = {headers: {
    Authorization: `Bearer ${token.access_token}`
  }}

  const currentRoute = `jsonapi/node?filter[drupal_internal__nid]=` + params['*'] + `&include=field_page_builder`

  try {
    const [adminMenu, content] = await Promise.all([
      fetch(process.env.GATSBY_DRUPAL_HOST + `/jsonapi/menu_items/admin`, requestHeaders),
      fetch(process.env.GATSBY_DRUPAL_HOST + `/`+ currentRoute, requestHeaders),
    ]);

    // if (
    //   adminMenu.status !== 200 ||
    //   adminMenu.status !== 403 ||
    //   content.status !== 200 ||
    //   content.status !== 403
    // ) {
    //   throw new Error(`Response failed`);
    // }

    if (
      !adminMenu.ok
    ) {
      throw new Error(`Response failed`);
    }
    return {
      props: {
        adminMenu: await adminMenu.json(),
        content: await content.json()
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