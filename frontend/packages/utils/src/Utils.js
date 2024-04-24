export const drupalFieldPrefix = "field_"

export const formatDrupalField = (type) => type.replace(drupalFieldPrefix, "")

export const formatDrupalType = (type) => type.replace("paragraph--", "")

export const snakeToCamel = (text) =>
  text
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    )

export const capitalize = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()

export const isBrowser = () => typeof window !== "undefined"

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    year: "numeric", // 2021, 2022, ...
    month: "long", // January, February, ...
    day: "numeric", // 1, 2, 3, ...
    hour: "numeric", // 12 AM, 1 PM, ...
    minute: "numeric", // 00, 01, 02, ...
    second: "numeric", // 00, 01, 02, ...
  })
}
