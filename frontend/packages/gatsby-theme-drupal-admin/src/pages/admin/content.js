// External Imports
import { Badge, Card, Heading, Switch } from "theme-ui";
import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import "react-sortable-tree/style.css";
import SortableTree from "react-sortable-tree";
import FileExplorerTheme from "@nosferatu500/theme-file-explorer";

// Internal package
import { isLoggedIn } from "@powerstack/drupal-oauth-connector";

// Internal imports
import Layout from "gatsby-theme-core-design-system/src/components/Layout/Layout";
import Seo from "gatsby-theme-core-design-system/src/components/Misc/Seo";

const DrupalAdminPage = ({serverData}) => {
  const [tree, setTree] = useState({});

  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
  }, []);

  useEffect(() => {
    const checkIfResponse = (serverData) => {
      if (
        serverData &&
        typeof serverData !== "undefined" &&
        Object.keys(serverData).length === 0
      ) {
        navigate("/admin/login", {
          state: {message: "your session has been timed out, please login"},
        });
      } else {
        const data = () => {

          let treeData = serverData.content.data.map((node) => ({
            title: node.attributes.title,
            attributes: node.attributes,
            node: node,
          }));
          return {treeData};
        };
        setTree(data);
      }
    };
    checkIfResponse(serverData);
  }, [serverData]);

  const formatDate = (date) => <ReactTimeAgo date={Date.parse(date)}/>;

  const editNode = ({node}) => {
    const page = "/edit/page/" + node.attributes.drupal_internal__nid;
    navigate(page);
  };

  const alertNodeInfo = ({node, path, treeIndex}) => {
    const objectString = Object.keys(node)
      .map((k) =>
        k === "children"
          ? "children: Array"
          : `${k}: '${JSON.stringify(node[k])}'`
      )
      .join(",\n   ");

    alert(
      "Info passed to the icon and button generators:\n\n" +
      `node: {\n   ${objectString}\n},\n` +
      `path: [${path.join(", ")}],\n` +
      `treeIndex: ${treeIndex}`
    );
  };

  return (
    <>
      <Layout isAdmin serverData={serverData.adminMenu}>
        <Seo title="Content"/>
        <Heading as={"h1"} sx={{m: 4, ml: 2}}>Content page</Heading>
        <Card sx={{
          height: 1200,
          p: 5,
          ".rstcustom__rowLabel": {
            pr: "5px"
          }
        }}>
          <SortableTree
            treeData={tree.treeData}
            onChange={(treeData) => setTree({treeData})}
            theme={FileExplorerTheme}
            rowHeight={48}
            generateNodeProps={(rowInfo) => ({
              icons: [
                <Switch
                  defaultChecked={rowInfo.node.attributes.status}
                  sx={{
                    bakgroundColor: "gray",
                    // This will not be visible since the input is hidden
                    // '&:checked': {
                    //   backgroundColor: 'primary'
                    // },
                    // This will be visible
                    "input:checked ~ &": {
                      backgroundColor: "green",
                    },
                  }}
                />,
              ],
              buttons: [
                <>
                  <Badge variant="primary" sx={{textTransform: `capitalize`}}>
                    {rowInfo.node.node.type
                      .replace("node--", "")
                      .replace("-", " ")}
                  </Badge>
                  &nbsp;
                </>,
                <em>
                  Created: {formatDate(rowInfo.node.attributes.created)}&nbsp;
                </em>,
                <em>
                  Updated: {formatDate(rowInfo.node.attributes.changed)}&nbsp;
                </em>,

                <a sx={{color: `#0071e3`, textDecoration: "none", "&:hover": {color: `#222`}}}
                   href={"/edit/page/" + rowInfo.node.attributes.drupal_internal__nid}>Edit 〉</a>
              ],
            })}
          />
        </Card>
      </Layout>
    </>
  );
};

export default DrupalAdminPage;

export async function getServerData(context) {
  const token = await isLoggedIn(Object.fromEntries(context.headers).cookie);

  // if (token === false) {
  //   return {
  //     props: {},
  //   };
  // }
  const headers = {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  };
  try {
    const [adminMenu, content] = await Promise.all([
      fetch(
        process.env.GATSBY_DRUPAL_HOST + `/jsonapi/menu_items/admin`,
        headers
      ),
      fetch(process.env.GATSBY_DRUPAL_HOST + `/jsonapi/node`, headers),
    ]);

    if (!adminMenu.ok || !content.ok) {
      throw new Error(`Response failed`);
    }

    return {
      headers: {"Set-Cookie": `access-token=${JSON.stringify(token)}`},
      props: {
        adminMenu: await adminMenu.json(),
        content: await content.json(),
      },
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
