/** @jsx jsx */

import { jsx, Card, Grid, Heading, Badge, Box } from "theme-ui";
import { lighten } from "@theme-ui/color";
import { Link } from "gatsby";
import React from "react";

const ContentCard = ({title= 'Template title', type, isTemplate=false}) => (
  <Card sx={{
    p: 2,
  }}>
    <Grid gap={2} columns={2}>
      <img src={'https://via.placeholder.com/150/FFFFFF/D9D9D9/?text=TEMPLATE%20IMG'}/>
      <div>
        <Heading as={'h3'} sx={{
          my: 3
        }}>{!isTemplate && `Blank `}{title}</Heading>
        {isTemplate &&
          <Badge sx={{
            mb: 2
          }}>{type.charAt(0).toUpperCase() + type.slice(1)}</Badge>
        }
        <Box
          sx={{
            my: 4
          }}
        >
          <Link
            as={'a'}
            variant="button"
            to={"/edit/new/page"}
            sx={{
              color: "primary",
              border: `1px solid`,
              borderColor: "primary",
              fontWeight: "link",
              borderRadius: 'medium',
              textDecoration: 'none',
              py: `12px`,
              px: 3,
              "&:hover": {
                bg: lighten('primary', 0.5),
              },
            }}
          >
            Use
          </Link>
          {isTemplate &&
            <>
              {' '}
              <Link
                variant="button"
                to={"/edit/template/type"}
                sx={{
                  fontWeight: "link",
                  textDecoration: 'underline',
                }}
              >
                Edit
              </Link>
            </>
          }
        </Box>
      </div>
    </Grid>
  </Card>
)

export default ContentCard