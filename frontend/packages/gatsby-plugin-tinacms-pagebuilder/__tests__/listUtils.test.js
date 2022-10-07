import {
  publishStatusToggleField,
  languageSelectField,
  userSelectField,
} from "../src/utils/listUtils"

it("Publish toggle should have on/off options", () => {
  expect(
    publishStatusToggleField("name", {
      component: "text",
      label: "test",
      name: "name",
    })
  ).toEqual({
    component: "text",
    label: "test",
    name: "name",
    toggleLabels: { false: "Off", true: "On" },
  })
})

it("User to be null if no serverData available", () => {
  expect(
    userSelectField(
      "user",
      {
        component: "language_select",
        label: "test",
        name: "name",
      },
      {}
    )
  ).toEqual(null)
})

it("User list with Admin at top", () => {
  expect(
    userSelectField(
      "user",
      {
        component: "entity_reference_autocomplete",
        label: "test",
        name: "name",
      },
      {
        currentUser: 1,
        usersData: {
          data: [
            {
              attributes: {
                drupal_internal__uid: 1,
                display_name: "Admin",
              },
            },
            {
              attributes: {
                drupal_internal__uid: 0,
                display_name: "Anonymous",
              },
            },
            {
              attributes: {
                drupal_internal__uid: 2,
                display_name: "Other",
              },
            },
          ],
        },
      }
    )
  ).toEqual({
    component: "text",
    label: "test",
    name: "user",
    options: [
      { label: "Admin", value: 1 },
      { label: "Anonymous", value: 0 },
      { label: "Other", value: 2 },
    ],
  })
})

it("Language to be null if no serverData available", () => {
  expect(
    languageSelectField(
      "language",
      {
        component: "language_select",
        label: "test",
        name: "name",
      },
      {}
    )
  ).toEqual(null)
})

it("Language data be english", () => {
  expect(
    languageSelectField(
      "language",
      {
        type: "language_select",
        label: "test",
        name: "name",
      },
      {
        languagesData: {
          data: [
            {
              attributes: {
                drupal_internal__id: "en",
                label: "English",
              },
            },
          ],
        },
      }
    )
  ).toEqual({
    component: "select",
    label: "test",
    name: "language",
    options: [
      {
        label: "English",
        value: "en",
      },
    ],
  })
})
