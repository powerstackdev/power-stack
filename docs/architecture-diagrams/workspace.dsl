workspace {

    model {
        user = person "User"
        editor = person "Editor"
        siteBuilder = person "Site Builder"
        backendDeveloper = person "Backend Developer"
        frontendDeveloper = person "Frontend Developer"

        softwareSystem = softwareSystem "DXP" {
            docs = container "Documentation Website" "Gatsby"
            backend = container "Backend API" "Drupal"
            database = container "Database" "MySQL"
            editing = container "Editing" "Tina or Craft.js"
            frontend = container "Frontend" "Gatsby"

            frontend -> backend "Fetches data from"
            editing -> backend "Fetches data from"
            backend -> database "Queries data from"
        }

        user -> softwareSystem "Uses"
        user -> frontend "Visits"
        editor -> softwareSystem "Uses"
        editor -> editing "Updates content on"
        siteBuilder -> softwareSystem "Uses"
        siteBuilder -> backend "Creates information architecture (IA) with"
        siteBuilder -> docs "Refers to"
        backendDeveloper -> softwareSystem "Uses"
        backendDeveloper -> backend "Programs on"
        backendDeveloper -> docs "Refers to and updates"
        frontendDeveloper -> softwareSystem "Uses"
        frontendDeveloper -> frontend "Programs on"
        frontendDeveloper -> editing "Programs on"
        frontendDeveloper -> docs "Refers to and updates"
    }

    views {
        systemLandscape softwareSystem "Landscape" {
            include *
            autolayout
        }

        container softwareSystem "Context" {
            include *
            autolayout
        }

        branding {
            logo "../images/logo-manifest.png"
            font ""
        }

        theme default
    }

}