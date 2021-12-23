/** @jsx jsx */
import { jsx } from "theme-ui";

import * as React from "react";
import { Link } from "gatsby";

export const DrupalAdminMenu = ({ serverData }) => {
  return (
    <nav>
      <ul style={{ display: "flex", flex: 1, float: "right" }}>
        {serverData &&
          serverData.data.map((link) => (
            <>
              {link.attributes.parent &&
              link.attributes.parent === "system.admin" ? (
                <li
                  key={link.attributes.title}
                  sx={{
                    listStyleType: `none`,
                    px: 3,
                  }}
                >
                  <Link style={{ color: `white` }} to={link.attributes.url}>
                    {link.attributes.title}
                  </Link>
                </li>
              ) : (
                <></>
              )}

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
