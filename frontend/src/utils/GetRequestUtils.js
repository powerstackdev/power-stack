import { formatDrupalType, drupalFieldPrefix } from "./Utils";

export const processDrupalImageData = (type, value) => {
  let fields = {};
  let images = value.field_image.map((value) => {

    let innerType = formatDrupalType(value.type);

    fields["image"] = {
      src: process.env.GATSBY_DRUPAL_HOST + `/` + value.field_media.field_media_image.uri.url,
      alt: value.field_media.field_media_image.meta.alt,
      mid: value.field_media.drupal_internal__mid,
      vid: value.field_media.drupal_internal__vid
    }
    fields["id"] = value.drupal_internal__id;
    fields["vid"] = value.drupal_internal__revision_id;
    return {
      _template: innerType,
      ...fields,
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
  let fields = {};

  let features = value.field_feature.map((value) => {
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
    return {
      _template: innerType,
      ...fields,
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
    ...fields,
  };
};
