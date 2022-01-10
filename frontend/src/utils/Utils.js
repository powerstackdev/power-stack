export const drupalFieldPrefix = "field_";

export const formatDrupalType = (type) => type.replace("paragraph--", "");

export const isBrowser = () => typeof window !== "undefined"