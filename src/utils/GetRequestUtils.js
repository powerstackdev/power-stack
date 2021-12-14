import { formatDrupalType, drupalFieldPrefix } from "./Utils";

export const processDrupalImageData = (type, value) => {
  return {
    _template: type,
    left: {
      src:
        process.env.GATSBY_DRUPAL_HOST +
        `/` +
        value.field_left.field_image.uri.url,
      alt: value.field_left.field_image.meta.alt,
    },
    right: {
      src:
        process.env.GATSBY_DRUPAL_HOST +
        `/` +
        value.field_right.field_image.uri.url,
      alt: value.field_right.field_image.meta.alt,
    },
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
    fields["uuid"] = value.id;
    return {
      _template: innerType,
      ...fields,
    };
  });
  features["uuid"] = value.id;
  return {
    _template: type,
    features,
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
          attribute = attribute.processed;
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
  fields["uuid"] = value.id;
  return {
    _template: type,
    ...fields,
  };
};
