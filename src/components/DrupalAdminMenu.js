import * as React from "react";
import { Link } from "gatsby";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import Layout from "../components/layout";
import Seo from "../components/seo";
import { Button, Spinner } from "@theme-ui/components";

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  {
    menuByName(name: "admin") {
      links {
        expanded
        description
        label
        enabled
        url {
          path
        }
        links {
          url {
            path
          }
          label
          links {
            label
            url {
              path
            }
            links {
              label
              url {
                path
              }
            }
          }
        }
      }
    }
    currentUserContext {
      name
      userPicture {
        url
      }
    }
  }
`;

export const DrupalAdminMenu = ({ serverData }) => {
  return (
    <nav>
      <ul style={{ display: "flex", flex: 1 }}>
        {serverData &&
          serverData.data.map((link) => (
            <>
            {link.attributes.parent && link.attributes.parent == "system.admin" ?
              <li
                  key={link.attributes.title}
                  style={{
                    listStyleType: `none`,
                    padding: `1rem`,
                  }}
                >
                  <Link style={{ color: `white` }} to={link.attributes.url}>
                    {link.attributes.title}
                  </Link>
              </li>
              :
              <></>
            }
            
              {/* {link.links.map((link) => (
                <li
                  key={link.label}
                  style={{
                    listStyleType: `none`,
                    padding: `1rem`,
                  }}
                >
                  <Link style={{ color: `white` }} to={link.url.path}>
                    {link.label}
                  </Link> */}
                  {/* <ul>
                    {link.links.map((link) => (
                      <li
                        key={link.label}
                        style={{
                          listStyleType: `none`,
                          padding: `1rem`,
                        }}
                      >
                        <Link style={{ color: `white` }} to={link.url.path}>
                          {link.label}
                        </Link>
                        <ul>
                          {link.links.map((link) => (
                            <li
                              key={link.label}
                              style={{
                                listStyleType: `none`,
                                padding: `1rem`,
                              }}
                            >
                              <Link
                                style={{ color: `white` }}
                                to={link.url.path}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul> */}
                {/* </li>
              ))} */}
            </>
          ))}
      </ul>
    </nav>
  );
};
