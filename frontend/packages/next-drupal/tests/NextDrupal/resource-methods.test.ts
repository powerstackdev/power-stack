import { afterEach, describe, expect, jest, test } from "@jest/globals"
import { NextDrupal } from "../../src"
import { BASE_URL, mocks, spyOnDrupalFetch, spyOnFetch } from "../utils"
import type { DrupalNode, DrupalSearchApiJsonApiResponse } from "../../src"

jest.setTimeout(10000)

afterEach(() => {
  jest.restoreAllMocks()
})

describe("buildMenuTree()", () => {
  test.todo("add tests")
})

describe("getEntryForResourceType()", () => {
  test("returns the JSON:API entry for a resource type", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const getIndexSpy = jest.spyOn(drupal, "getIndex")

    const recipeEntry = await drupal.getEntryForResourceType("node--recipe")
    expect(recipeEntry).toMatch(`${BASE_URL}/en/jsonapi/node/recipe`)
    expect(getIndexSpy).toHaveBeenCalledTimes(1)

    const articleEntry = await drupal.getEntryForResourceType("node--article")
    expect(articleEntry).toMatch(`${BASE_URL}/en/jsonapi/node/article`)
    expect(getIndexSpy).toHaveBeenCalledTimes(2)
  })

  test("assembles JSON:API entry without fetching index", async () => {
    const drupal = new NextDrupal(BASE_URL, {
      useDefaultResourceTypeEntry: true,
    })
    const getIndexSpy = jest.spyOn(drupal, "getIndex")

    const recipeEntry = await drupal.getEntryForResourceType("node--article")
    expect(recipeEntry).toMatch(`${BASE_URL}/jsonapi/node/article`)
    expect(getIndexSpy).toHaveBeenCalledTimes(0)
  })

  test("throws an error if resource type does not exist", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getEntryForResourceType("RESOURCE-DOES-NOT-EXIST")
    ).rejects.toThrow("Resource of type 'RESOURCE-DOES-NOT-EXIST' not found.")
  })
})

describe("getIndex()", () => {
  test("fetches the JSON:API index", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const index = await drupal.getIndex()

    expect(index).toMatchSnapshot()
  })

  test("fetches the JSON:API index with locale", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const index = await drupal.getIndex("es")

    expect(index).toMatchSnapshot()
  })

  test("throws error for invalid base url", async () => {
    const drupal = new NextDrupal("https://example.com")

    await expect(drupal.getIndex()).rejects.toThrow(
      "Failed to fetch JSON:API index at https://example.com/jsonapi"
    )
  })
})

describe("getMenu()", () => {
  test("fetches menu items for a menu", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const menu = await drupal.getMenu("main")

    expect(menu).toMatchSnapshot()
  })

  test("fetches menu items for a menu with locale", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const menu = await drupal.getMenu("main", {
      locale: "es",
      defaultLocale: "en",
    })

    expect(menu).toMatchSnapshot()
  })

  test("fetches menu items for a menu with params", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const menu = await drupal.getMenu("main", {
      params: {
        "fields[menu_link_content--menu_link_content]": "title",
      },
    })

    expect(menu).toMatchSnapshot()
  })

  test("throws an error for invalid menu name", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(drupal.getMenu("INVALID")).rejects.toThrow(
      '404 Not Found\nThe "menu" parameter was not converted for the path "/jsonapi/menu_items/{menu}" (route name: "jsonapi_menu_items.menu")'
    )
  })

  test("makes un-authenticated requests by default", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const drupalFetchSpy = jest.spyOn(drupal, "fetch")

    await drupal.getMenu("main")

    expect(drupalFetchSpy).toHaveBeenCalledWith(expect.anything(), {
      withAuth: false,
    })
  })

  test("makes authenticated requests with withAuth option", async () => {
    const drupal = new NextDrupal(BASE_URL, {
      useDefaultResourceTypeEntry: true,
      auth: `Bearer sample-token`,
    })
    const fetchSpy = spyOnFetch()
    jest.spyOn(drupal, "getAccessToken")

    await drupal.getMenu("main", { withAuth: true })

    expect(
      (fetchSpy.mock.lastCall[1].headers as Headers).get("Authorization")
    ).toBe("Bearer sample-token")
  })
})

describe("getResource()", () => {
  test("fetches a resource by uuid", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const recipe = await drupal.getResource<DrupalNode>(
      "node--recipe",
      "71e04ead-4cc7-416c-b9ca-60b635fdc50f"
    )

    expect(recipe).toMatchSnapshot()
  })

  test("fetches a resource by uuid with params", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const recipe = await drupal.getResource<DrupalNode>(
      "node--recipe",
      "71e04ead-4cc7-416c-b9ca-60b635fdc50f",
      {
        params: {
          "fields[node--recipe]": "title,field_cooking_time",
        },
      }
    )

    expect(recipe).toMatchSnapshot()
  })

  test("fetches a resource using locale", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const recipe = await drupal.getResource<DrupalNode>(
      "node--recipe",
      "71e04ead-4cc7-416c-b9ca-60b635fdc50f",
      {
        locale: "es",
        defaultLocale: "en",
        params: {
          "fields[node--recipe]": "title,field_cooking_time",
        },
      }
    )

    expect(recipe).toMatchSnapshot()
  })

  test("fetches raw data", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResource(
        "node--recipe",
        "71e04ead-4cc7-416c-b9ca-60b635fdc50f",
        {
          deserialize: false,
        }
      )
    ).resolves.toMatchSnapshot()
  })

  test("fetches a resource by revision", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const recipe = await drupal.getResource<DrupalNode>(
      "node--recipe",
      "71e04ead-4cc7-416c-b9ca-60b635fdc50f",
      {
        params: {
          "fields[node--recipe]": "drupal_internal__vid",
        },
      }
    )
    const latestRevision = await drupal.getResource<DrupalNode>(
      "node--recipe",
      "71e04ead-4cc7-416c-b9ca-60b635fdc50f",
      {
        params: {
          resourceVersion: "rel:latest-version",
          "fields[node--recipe]": "drupal_internal__vid",
        },
      }
    )

    expect(recipe.drupal_internal__vid).toEqual(
      latestRevision.drupal_internal__vid
    )
  })

  test("throws an error for invalid revision", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResource<DrupalNode>(
        "node--recipe",
        "71e04ead-4cc7-416c-b9ca-60b635fdc50f",
        {
          params: {
            resourceVersion: "id:-11",
            "fields[node--recipe]": "title",
          },
        }
      )
    ).rejects.toThrow(
      "404 Not Found\nThe requested version, identified by `id:-11`, could not be found."
    )
  })

  test("throws an error if revision access is forbidden", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResource<DrupalNode>(
        "node--recipe",
        "71e04ead-4cc7-416c-b9ca-60b635fdc50f",
        {
          params: {
            resourceVersion: "id:1",
            "fields[node--recipe]": "title",
          },
        }
      )
    ).rejects.toThrow(
      "403 Forbidden\nThe current user is not allowed to GET the selected resource. The user does not have access to the requested version."
    )
  })

  test("throws an error for invalid resource type", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResource<DrupalNode>(
        "RESOURCE-DOES-NOT-EXIST",
        "71e04ead-4cc7-416c-b9ca-60b635fdc50f"
      )
    ).rejects.toThrow("Resource of type 'RESOURCE-DOES-NOT-EXIST' not found.")
  })

  test("throws an error for invalid params", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResource<DrupalNode>(
        "node--recipe",
        "71e04ead-4cc7-416c-b9ca-60b635fdc50f",
        {
          params: {
            include: "invalid_relationship",
          },
        }
      )
    ).rejects.toThrow(
      "400 Bad Request\n`invalid_relationship` is not a valid relationship field name. Possible values: node_type, revision_uid, uid, menu_link, field_media_image, field_recipe_category, field_tags."
    )
  })

  test("makes un-authenticated requests by default", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const drupalFetchSpy = jest.spyOn(drupal, "fetch")

    await drupal.getResource(
      "node--recipe",
      "71e04ead-4cc7-416c-b9ca-60b635fdc50f"
    )
    expect(drupalFetchSpy).toHaveBeenCalledWith(expect.anything(), {
      withAuth: false,
    })
  })

  test("makes authenticated requests with withAuth option", async () => {
    const drupal = new NextDrupal(BASE_URL, {
      useDefaultResourceTypeEntry: true,
      auth: `Bearer sample-token`,
    })
    const fetchSpy = spyOnFetch()
    jest.spyOn(drupal, "getAccessToken")

    await drupal.getResource(
      "node--recipe",
      "71e04ead-4cc7-416c-b9ca-60b635fdc50f",
      {
        withAuth: true,
      }
    )

    expect(
      (fetchSpy.mock.lastCall[1].headers as Headers).get("Authorization")
    ).toBe("Bearer sample-token")
  })
})

describe("getResourceByPath()", () => {
  test("fetches a resource by path", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResourceByPath("/recipes/deep-mediterranean-quiche")
    ).resolves.toMatchSnapshot()
  })

  test("fetches a resource by path with params", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResourceByPath("/recipes/deep-mediterranean-quiche", {
        params: {
          "fields[node--recipe]": "title,field_cooking_time",
        },
      })
    ).resolves.toMatchSnapshot()
  })

  test("fetches a resource by path using locale", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const recipe = await drupal.getResourceByPath(
      "/recipes/quiche-mediterráneo-profundo",
      {
        locale: "es",
        defaultLocale: "en",
        params: {
          "fields[node--recipe]": "title,field_cooking_time",
        },
      }
    )

    expect(recipe).toMatchSnapshot()
  })

  test("fetches raw data", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResourceByPath("/recipes/deep-mediterranean-quiche", {
        deserialize: false,
      })
    ).resolves.toMatchSnapshot()
  })

  test("fetches a resource by revision", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const recipe = await drupal.getResourceByPath<DrupalNode>(
      "/recipes/deep-mediterranean-quiche",
      {
        params: {
          "fields[node--recipe]": "drupal_internal__vid",
        },
      }
    )
    const latestRevision = await drupal.getResourceByPath<DrupalNode>(
      "/recipes/deep-mediterranean-quiche",
      {
        params: {
          resourceVersion: "rel:latest-version",
          "fields[node--recipe]": "drupal_internal__vid",
        },
      }
    )

    expect(recipe.drupal_internal__vid).toEqual(
      latestRevision.drupal_internal__vid
    )
  })

  test("throws an error for invalid revision", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResourceByPath<DrupalNode>(
        "/recipes/deep-mediterranean-quiche",
        {
          params: {
            resourceVersion: "id:-11",
            "fields[node--recipe]": "title",
          },
        }
      )
    ).rejects.toThrow(
      "404 Not Found\nThe requested version, identified by `id:-11`, could not be found."
    )
  })

  test("throws an error if revision access is forbidden", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResourceByPath<DrupalNode>(
        "/recipes/deep-mediterranean-quiche",
        {
          params: {
            resourceVersion: "id:1",
            "fields[node--recipe]": "title",
          },
        }
      )
    ).rejects.toThrow(
      "403 Forbidden\nThe current user is not allowed to GET the selected resource. The user does not have access to the requested version."
    )
  })

  test("returns null for path not found", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResourceByPath<DrupalNode>("/path-do-not-exist")
    ).rejects.toThrow("Unable to resolve path /path-do-not-exist.")
  })

  test("throws an error for invalid params", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResourceByPath<DrupalNode>(
        "/recipes/deep-mediterranean-quiche",
        {
          params: {
            include: "invalid_relationship",
          },
        }
      )
    ).rejects.toThrow(
      "400 Bad Request\n`invalid_relationship` is not a valid relationship field name. Possible values: node_type, revision_uid, uid, menu_link, field_media_image, field_recipe_category, field_tags."
    )
  })

  test("makes un-authenticated requests by default", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const drupalFetchSpy = jest.spyOn(drupal, "fetch")
    const getAccessTokenSpy = jest.spyOn(drupal, "getAccessToken")

    await drupal.getResourceByPath<DrupalNode>(
      "/recipes/deep-mediterranean-quiche"
    )
    expect(drupalFetchSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.not.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.anything(),
        }),
      })
    )
    expect(getAccessTokenSpy).not.toHaveBeenCalled()
  })

  test("makes authenticated requests with withAuth", async () => {
    const drupal = new NextDrupal(BASE_URL, {
      auth: mocks.auth.clientIdSecret,
    })
    const fetchSpy = spyOnFetch()
    const getAccessTokenSpy = jest
      .spyOn(drupal, "getAccessToken")
      .mockImplementation(async () => mocks.auth.accessToken)

    await drupal.getResourceByPath<DrupalNode>(
      "/recipes/deep-mediterranean-quiche",
      {
        withAuth: true,
      }
    )

    expect(
      (fetchSpy.mock.lastCall[1].headers as Headers).get("Authorization")
    ).toBe(
      `${mocks.auth.accessToken.token_type} ${mocks.auth.accessToken.access_token}`
    )
    expect(getAccessTokenSpy).toHaveBeenCalled()
  })

  test("returns null if path is falsey", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const resource = await drupal.getResourceByPath("")
    expect(resource).toBe(null)
  })
})

describe("getResourceCollection()", () => {
  test("fetches a resource collection", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const articles = await drupal.getResourceCollection("node--article", {
      params: {
        "fields[node--article]": "title",
      },
    })

    expect(articles).toMatchSnapshot()
  })

  test("fetches a resource collection using locale", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const articles = await drupal.getResourceCollection("node--article", {
      locale: "es",
      defaultLocale: "en",
      params: {
        "fields[node--article]": "title,langcode",
      },
    })

    expect(articles[0].langcode).toEqual("es")

    expect(articles).toMatchSnapshot()
  })

  test("fetches raw data", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const recipes = await drupal.getResourceCollection("node--recipe", {
      deserialize: false,
      params: {
        "fields[node--recipe]": "title",
        "page[limit]": 2,
      },
    })

    expect(recipes).toMatchSnapshot()
  })

  test("throws an error for invalid resource type", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResourceCollection("RESOURCE-DOES-NOT-EXIST")
    ).rejects.toThrow("Resource of type 'RESOURCE-DOES-NOT-EXIST' not found.")
  })

  test("throws an error for invalid params", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(
      drupal.getResourceCollection<DrupalNode>("node--recipe", {
        params: {
          include: "invalid_relationship",
        },
      })
    ).rejects.toThrow(
      "400 Bad Request\n`invalid_relationship` is not a valid relationship field name. Possible values: node_type, revision_uid, uid, menu_link, field_media_image, field_recipe_category, field_tags."
    )
  })

  test("makes un-authenticated requests by default", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const drupalFetchSpy = jest.spyOn(drupal, "fetch")

    await drupal.getResourceCollection("node--recipe")
    expect(drupalFetchSpy).toHaveBeenCalledWith(expect.anything(), {
      withAuth: false,
    })
  })

  test("makes authenticated requests with withAuth option", async () => {
    const drupal = new NextDrupal(BASE_URL, {
      useDefaultResourceTypeEntry: true,
      auth: `Bearer sample-token`,
    })
    const fetchSpy = spyOnFetch()
    jest.spyOn(drupal, "getAccessToken")

    await drupal.getResourceCollection("node--recipe", {
      withAuth: true,
    })

    expect(
      (fetchSpy.mock.lastCall[1].headers as Headers).get("Authorization")
    ).toBe("Bearer sample-token")
  })
})

describe("getResourceCollectionPathSegments()", () => {
  test("returns path segments", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const paths = await drupal.getResourceCollectionPathSegments(
      "node--article"
    )

    expect(paths).toMatchSnapshot()
  })

  test("returns path segments with locales", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const paths = await drupal.getResourceCollectionPathSegments(
      "node--article",
      {
        locales: ["en", "es"],
        defaultLocale: "en",
      }
    )

    expect(paths).toMatchSnapshot()
  })

  test("returns path segments for multiple resource types", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const paths = await drupal.getResourceCollectionPathSegments(
      ["node--article", "node--page"],
      {
        locales: ["en", "es"],
        defaultLocale: "en",
      }
    )

    expect(paths).toMatchSnapshot()
  })

  test("returns path segments with params", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const paths = await drupal.getResourceCollectionPathSegments(
      ["node--article", "node--page"],
      {
        params: {
          "filter[promote]": 1,
        },
      }
    )

    expect(paths).toMatchSnapshot()
  })

  test("returns path segments with pathPrefix removed", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const paths = await drupal.getResourceCollectionPathSegments(
      "node--article",
      {
        pathPrefix: "/articles",
      }
    )

    expect(paths).toMatchSnapshot()
  })

  test("uses constructor-provided withAuth by default", async () => {
    let drupal = new NextDrupal(BASE_URL, { useDefaultResourceTypeEntry: true })
    let drupalFetchSpy = spyOnDrupalFetch(drupal, {
      responseBody: { data: [] },
    })

    await drupal.getResourceCollectionPathSegments("node--article", {
      locales: ["en", "es"],
      defaultLocale: "en",
    })

    expect(drupalFetchSpy).toHaveBeenCalledWith(expect.anything(), {
      withAuth: false,
    })

    drupal = new NextDrupal(BASE_URL, {
      withAuth: true,
      useDefaultResourceTypeEntry: true,
    })
    drupalFetchSpy = spyOnDrupalFetch(drupal, {
      responseBody: { data: [] },
    })

    await drupal.getResourceCollectionPathSegments("node--article", {
      locales: ["en", "es"],
      defaultLocale: "en",
    })

    expect(drupalFetchSpy).toHaveBeenCalledWith(expect.anything(), {
      withAuth: true,
    })
  })

  test("makes authenticated requests using withAuth option", async () => {
    const mockAuth = "Bearer sample-token"
    const drupal = new NextDrupal(BASE_URL, {
      useDefaultResourceTypeEntry: true,
      auth: mockAuth,
    })
    const fetchSpy = spyOnFetch({
      responseBody: { data: [] },
    })

    await drupal.getResourceCollectionPathSegments("node--article", {
      locales: ["en", "es"],
      defaultLocale: "en",
      withAuth: true,
    })

    expect(
      (fetchSpy.mock.lastCall[1].headers as Headers).get("Authorization")
    ).toBe(mockAuth)
  })
})

describe("getSearchIndex()", () => {
  test("fetches a search index", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const search = await drupal.getSearchIndex("recipes", {
      params: {
        "fields[node--recipe]": "title",
      },
    })

    expect(search).toMatchSnapshot()
  })

  test("fetches a search index with locale", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const search = await drupal.getSearchIndex("recipes", {
      locale: "es",
      defaultLocale: "en",
      params: {
        "fields[node--recipe]": "title",
      },
    })

    expect(search).toMatchSnapshot()
  })

  test("fetches a search index with facets filters", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const search = await drupal.getSearchIndex<DrupalSearchApiJsonApiResponse>(
      "recipes",
      {
        deserialize: false,
        params: {
          "filter[difficulty]": "easy",
          "fields[node--recipe]": "title,field_difficulty",
        },
      }
    )

    expect(search).toMatchSnapshot()
    expect(search.meta.facets).not.toBeNull()
  })

  test("fetches raw data from search index", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const search = await drupal.getSearchIndex("recipes", {
      deserialize: false,
      params: {
        "filter[difficulty]": "easy",
        "fields[node--recipe]": "title,field_difficulty",
      },
    })

    expect(search).toMatchSnapshot()
  })

  test("makes un-authenticated requests by default", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const drupalFetchSpy = jest.spyOn(drupal, "fetch")

    await drupal.getSearchIndex("recipes")

    expect(drupalFetchSpy).toHaveBeenCalledWith(expect.anything(), {
      withAuth: false,
    })
  })

  test("throws an error for invalid index", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(drupal.getSearchIndex("INVALID-INDEX")).rejects.toThrow(
      "Not Found"
    )
  })

  test("makes authenticated requests with withAuth option", async () => {
    const drupal = new NextDrupal(BASE_URL, {
      useDefaultResourceTypeEntry: true,
      auth: `Bearer sample-token`,
    })
    const fetchSpy = spyOnFetch()
    jest.spyOn(drupal, "getAccessToken")

    await drupal.getSearchIndex("recipes", {
      withAuth: true,
    })

    expect(
      (fetchSpy.mock.lastCall[1].headers as Headers).get("Authorization")
    ).toBe("Bearer sample-token")
  })
})

describe("getView()", () => {
  test("fetches a view", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const view = await drupal.getView("featured_articles--page_1")

    expect(view).toMatchSnapshot()
  })

  test("fetches a view with params", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const view = await drupal.getView("featured_articles--page_1", {
      params: {
        "fields[node--article]": "title",
      },
    })

    expect(view).toMatchSnapshot()
  })

  test("fetches a view with locale", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const view = await drupal.getView("featured_articles--page_1", {
      locale: "es",
      defaultLocale: "en",
      params: {
        "fields[node--article]": "title",
      },
    })

    expect(view).toMatchSnapshot()
  })

  test("fetches raw data", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const view = await drupal.getView("featured_articles--page_1", {
      locale: "es",
      defaultLocale: "en",
      deserialize: false,
      params: {
        "fields[node--article]": "title",
      },
    })

    expect(view).toMatchSnapshot()
  })

  test("throws an error for invalid view name", async () => {
    const drupal = new NextDrupal(BASE_URL)

    await expect(drupal.getView("INVALID")).rejects.toThrow("Not Found")
  })

  test("makes un-authenticated requests by default", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const drupalFetchSpy = jest.spyOn(drupal, "fetch")

    await drupal.getView("featured_articles--page_1")
    expect(drupalFetchSpy).toHaveBeenCalledWith(expect.anything(), {
      withAuth: false,
    })
  })

  test("makes authenticated requests with withAuth option", async () => {
    const drupal = new NextDrupal(BASE_URL, {
      useDefaultResourceTypeEntry: true,
      auth: `Bearer sample-token`,
    })
    const fetchSpy = spyOnFetch()
    jest.spyOn(drupal, "getAccessToken")

    await drupal.getView("featured_articles--page_1", { withAuth: true })

    expect(
      (fetchSpy.mock.lastCall[1].headers as Headers).get("Authorization")
    ).toBe("Bearer sample-token")
  })

  test("fetches a view with links for pagination", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const view = await drupal.getView("recipes--page_1")

    expect(view.links).toHaveProperty("next")
  })
})

describe("translatePath()", () => {
  test("translates a path", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const path = await drupal.translatePath("recipes/deep-mediterranean-quiche")

    expect(path).toMatchSnapshot()

    const path2 = await drupal.translatePath(
      "/recipes/deep-mediterranean-quiche"
    )

    expect(path).toEqual(path2)
  })

  test("returns null for path not found", async () => {
    const drupal = new NextDrupal(BASE_URL)

    const path = await drupal.translatePath("/path-not-found")

    expect(path).toBeNull()
  })

  test("makes un-authenticated requests by default", async () => {
    const drupal = new NextDrupal(BASE_URL)
    const drupalFetchSpy = jest.spyOn(drupal, "fetch")

    await drupal.translatePath("recipes/deep-mediterranean-quiche")

    expect(drupalFetchSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        withAuth: false,
      })
    )
  })

  test("makes authenticated requests with withAuth option", async () => {
    const drupal = new NextDrupal(BASE_URL, {
      useDefaultResourceTypeEntry: true,
      auth: `Bearer sample-token`,
    })
    const fetchSpy = spyOnFetch()
    jest.spyOn(drupal, "getAccessToken")

    await drupal.translatePath("recipes/deep-mediterranean-quiche", {
      withAuth: true,
    })

    expect(
      (fetchSpy.mock.lastCall[1].headers as Headers).get("Authorization")
    ).toBe("Bearer sample-token")
  })
})
