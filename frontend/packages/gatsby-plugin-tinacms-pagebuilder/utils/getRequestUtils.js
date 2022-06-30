import set from "lodash.set"

import {capitalize, drupalFieldPrefix, formatDrupalType, snakeToCamel} from "@powerstack/utils";
import {isLoggedIn} from "@powerstack/drupal-oauth-connector";

export const getRequestHeaders = async headers => {
  const token = await isLoggedIn(Object.fromEntries(headers).cookie)

  return {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  }
}

export const getRequestFetchMultiple = async (headers, requests) => {
  const requestHeaders = await getRequestHeaders(headers)

  const requestsData = {
    success: {},
    errors: {}
  }
  for (const [key, value] of Object.entries(requests)) {
    try {
      const data = await fetch(
        process.env.GATSBY_DRUPAL_HOST + `/jsonapi/${value}`,
        requestHeaders
      )

      if (data.status === 401) {
        return {
          props: {
            goto: "page/edit/" + params["*"],
          },
        }
      }
      if ( !data.ok ) {
        throw new Error(`${key} Response failed`)
      }

      const dataJson = await data.json()
      requestsData['success'][`${key}`] = dataJson
    }  catch (error) {
      console.log(error)
      requestsData['errors'][`${key}`] = error
    }
  }
  return requestsData
}


export const createTinaInlineBlocks = async ( bundle, data, headers, parent, path, blocks = {} ) => {

  const requests = {
    fieldConfig: `field_config/field_config?filter[bundle]=${bundle}`,
    paragraphsData: `entity_form_display/entity_form_display?filter[targetEntityType]=paragraph&filter[bundle]=${bundle}`
  }

  const subRequestsData = await getRequestFetchMultiple(headers, requests)

  if (data.type !== 'entity_reference_paragraphs'){
    if(typeof path == 'undefined') {
      path = bundle
    } else {
      path = `${path}.children.${bundle}`
    }
    let blockObj = {
      template: {
        key: bundle,
        label: capitalize(bundle),
        defaultItem: {
          _template: bundle,
          path
        },
        fields: [
          {
            name: 'text_color',
            label: 'Text Color',
            component: "color",
            widget: "block",
            colors: ["#051e26", "#f2dfc6", "#cfdcc8", "#ebbbbb", "#8a1414"]
          },
          {
            name: "align",
            label: "Alignment",
            component: "select",
            options: ["center", "left"]
          }
        ]
      },
    }
    set(blocks, path, blockObj)
    console.log(path)
  }
  for (const data1 of subRequestsData.success.fieldConfig.data) {
    if(data1.hasOwnProperty('attributes') && data1.attributes.settings.handler_settings && data1.attributes.settings.handler_settings.hasOwnProperty('target_bundles')) {
      await createTinaInlineBlocks(Object.keys(data1.attributes.settings.handler_settings.target_bundles)[0], data1, headers, bundle, path, blocks)
    }
  }
  return blocks
}

export const processDrupalImageData = (type, value) => {
  let fields = {};
  let images = value.field_image.map((value, key) => {
    let delay = 200 * (key + 1);
    let innerType = formatDrupalType(value.type);

    fields["image"] = {
      src: process.env.GATSBY_DRUPAL_HOST + `/` + value.field_media.field_media_image.uri.url + "?id=" + value.field_media.drupal_internal__mid + "&vid=" + value.field_media.drupal_internal__vid,
      alt: value.field_media.field_media_image.meta.alt
    };
    fields["delay"] = delay;
    fields["id"] = value.drupal_internal__id;
    fields["vid"] = value.drupal_internal__revision_id;
    return {
      _template: innerType,
      ...fields
    };
  });
  images["id"] = value.drupal_internal__id;
  images["vid"] = value.drupal_internal__revision_id;
  return {
    _template: type,
    images,
    id: value.drupal_internal__id,
    vid: value.drupal_internal__revision_id,
    columns: value.field_columns
  };
};

export const processDrupalFeaturesData = (type, value) => {
  let features = value.field_feature.map((value, key) => {
    let fields = {};

    let delay = 200 * (key + 1);
    let innerType = formatDrupalType(value.type);
    Object.keys(value).forEach((key) => {
      if (key.startsWith(drupalFieldPrefix)) {
        const title = key.replace(drupalFieldPrefix, "");
        let attribute = value[key];
        fields[title] = attribute;
      }
    });
    fields["id"] = value.drupal_internal__id;
    fields["vid"] = value.drupal_internal__revision_id;
    fields["delay"] = delay;
    return {
      _template: innerType,
      ...fields
    };
  });
  features["id"] = value.drupal_internal__id;
  features["vid"] = value.drupal_internal__revision_id;
  return {
    _template: type,
    features,
    id: value.drupal_internal__id,
    vid: value.drupal_internal__revision_id
  };
};

export const processDrupalSignpostsData = (type, value) => {

  let signposts = value.field_signpost.map((value, key) => {
    let fields = {};

    let delay = 200 * (key + 1);
    let innerType = formatDrupalType(value.type);
    Object.keys(value).forEach((key) => {

      if (key.startsWith(drupalFieldPrefix)) {
        let title = key.replace(drupalFieldPrefix, "");
        let attribute = value[key];

        if(title === 'page_reference') {
          attribute = value[key].meta.drupal_internal__target_id
        }

        fields[title] = attribute;
      }
    });
    fields["id"] = value.drupal_internal__id;
    fields["vid"] = value.drupal_internal__revision_id;
    fields["delay"] = delay;

    return {
      _template: snakeToCamel(innerType),
      ...fields
    };
  });
  signposts["id"] = value.drupal_internal__id;
  signposts["vid"] = value.drupal_internal__revision_id;

  return {
    _template: type,
    signposts,
    id: value.drupal_internal__id,
    vid: value.drupal_internal__revision_id
  };
};


export const processDrupalSlidersData = (type, value) => {

  let sliders = value.field_slider.map((value, key) => {
    let fields = {};

    let delay = 200 * (key + 1);
    let innerType = formatDrupalType(value.type);
    Object.keys(value).forEach((key) => {

      if (key.startsWith(drupalFieldPrefix)) {
        let title = key.replace(drupalFieldPrefix, "");
        let attribute = value[key];
        switch (title) {
          case "subtext":
          case "text":
            attribute = attribute.value;
            break;
          case "text_color":
          case "background_color":
            if(attribute !== null) {
              attribute = attribute.color;
            }
            break;
          case "media":
            title = "image"
            attribute = {
              src: process.env.GATSBY_DRUPAL_HOST + value.field_media.field_media_image.uri.url + "?id=" + value.field_media.drupal_internal__mid + "&vid=" + value.field_media.drupal_internal__vid,
              alt: value.field_media.field_media_image.meta.alt
            }
            break;
          default:
            attribute = value[key];
        }

        fields[title] = attribute;
      }
    });

    fields["id"] = value.drupal_internal__id;
    fields["vid"] = value.drupal_internal__revision_id;
    fields["delay"] = delay;

    return {
      _template: snakeToCamel(innerType),
      ...fields
    };
  });
  sliders["id"] = value.drupal_internal__id;
  sliders["vid"] = value.drupal_internal__revision_id;

  return {
    _template: type,
    sliders,
    id: value.drupal_internal__id,
    vid: value.drupal_internal__revision_id
  };
};

export const processDrupalParagraphData = (type, value) => {
  let fields = {};

  Object.keys(value).forEach((key) => {
    if (key.startsWith(drupalFieldPrefix)) {
      const title = key.replace(drupalFieldPrefix, "");
      let attribute = value[key];
      switch (title) {
        case "subtext":
        case "text":
          attribute = attribute.value;
          break;
        case "text_color":
        case "background_color":
          attribute = attribute.color;
          break;
        default:
          attribute = value[key];
      }
      fields[title] = attribute;
    }
  });
  fields["id"] = value.drupal_internal__id;
  fields["vid"] = value.drupal_internal__revision_id;
  return {
    _template: type,
    ...fields
  };
};
