![Power Stack Hero](https://raw.githubusercontent.com/powerstackdev/.github/main/PowerStack-Hero.jpg)

# Welcome to the Power Stack project. 

Based on powerful and bleeding-edge technologies, this project aims to be the first fully open-source Digital Experience Platform (DXP).

## Getting started
The easiest way to start a new project is to use the Docksal. It generates a ready-to-use project with all the needed dependencies.

Create your web experience:

```bash
fin project create --name=power-stack --repo=https://github.com/powerstackdev/power-stack.git
```

Once it has installed correctly, you will see a dashboard load in the browser (or a message in the Terminal)

If you're stuck you can refer to our [getting started](https://powerstack.dev/docs/intro/getting-started/) page of the docs.

## Contributing

If you're interested in contributing to the project, please refer to our guidance on [contributing](https://powerstack.dev/contributing)

## Website 

https://powerstack.dev

## Project structure

This project is a monorepo with the following structure:

```
.
├── backend
│   ├── deprecated-packages
│   │   └── jsonapi_base_fields
│   │       └── src
│   ├── packages
│   │   ├── powerstack_api
│   │   ├── powerstack_demo_content
│   │   │   └── config
│   │   ├── powerstack_page_builder
│   │   │   └── config
│   │   ├── powerstack_profile
│   │   │   └── config
│   │   └── tinacms_json_page_builder
│   │       └── src
│   └── starters
│       ├── demo
│       │   ├── config
│       │   ├── keys
│       │   └── web
│       └── development
│           ├── config
│           ├── keys
│           └── web
├── docs
│   ├── architecture-diagrams
│   ├── images
│   ├── pages
│   │   └── docs
│   │       ├── 1-Introduction
│   │       ├── 2-Core_concepts
│   │       ├── 3-Development
│   │       ├── 4-Components
│   │       ├── 5-Guides
│   │       └── 6-Reference
│   ├── partials
│   └── src
│       ├── pages
│       └── smooth-doc
│           └── components
├── frontend
│   ├── deprecated-packages
│   │   └── gatsby-theme-tina-edit
│   │       ├── src
│   │       ├── templates
│   │       └── utils
│   ├── packages
│   │   ├── @powerstack
│   │   │   ├── docker-webpack-polling
│   │   │   ├── drupal-oauth-connector
│   │   │   └── utils
│   │   ├── gatsby-plugin-craftjs
│   │   │   └── src
│   │   ├── gatsby-plugin-tinacms
│   │   │   └── src
│   │   ├── gatsby-plugin-tinacms-pagebuilder
│   │   │   ├── __tests__
│   │   │   └── src
│   │   ├── gatsby-theme-core-design-system
│   │   │   └── src
│   │   └── gatsby-theme-drupal-admin
│   │       └── src
│   └── starters
│       ├── demo
│       │   ├── src
│       │   └── static
│       ├── development
│       │   ├── src
│       │   └── static
│       └── development-craft
│           ├── src
│           └── static
└── scripts
    ├── development
    │   └── backend
    ├── misc
    ├── setup
    │   ├── backend
    │   ├── docs
    │   └── frontend
    └── testing
        ├── backend
        └── frontend
```

For more information on the underlying structure you can refer to our [docs](https://powerstack.dev/docs/core-concepts/layers).
