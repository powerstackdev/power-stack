export const drupalFieldPrefix = "field_";

export const formatDrupalType = (type) => type.replace("paragraph--", "");

export const snakeToCamel = (text) => text.toLowerCase().replace(/([-_][a-z])/g, group =>
  group
    .toUpperCase()
    .replace('-', '')
    .replace('_', '')
);

export const isBrowser = () => typeof window !== "undefined"