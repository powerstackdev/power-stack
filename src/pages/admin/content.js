import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";

import { Switch, Badge, Button } from "theme-ui";

import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { isLoggedIn } from "../../services/auth";
// This only needs to be done once; probably during your application's bootstrapping process.
import "react-sortable-tree/style.css";

// You can import the default tree with dnd context
import SortableTree from "react-sortable-tree";
import FileExplorerTheme from "@nosferatu500/theme-file-explorer";

const DrupalAdminPage = ({ serverData }) => {

  const [tree, setTree] = useState({});

  console.log(serverData)

  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
  }, [])

  useEffect(() => {
    const checkIfResponse = (serverData) => {
      if(serverData && typeof serverData !== "undefined" && Object.keys(serverData).length === 0) {
        navigate("/admin/login", {
          state: { message: "your session has been timed out, please login" },
        })
      } else {
        const data = () => {
          console.log(serverData)
          let treeData = serverData.content.data.map((node) => ({
            title: node.attributes.title,
            attributes: node.attributes,
            node: node,
          }))
          return {treeData}
        }
        setTree(data)
      }
    }
    checkIfResponse(serverData)
    
  }, [serverData])

  const formatDate = (date) => <ReactTimeAgo date={Date.parse(date)} />;

  const editNode = ({ node }) => {
    navigate(`/admin/page/` + node.attributes.drupal_internal__nid + `/edit`);
  };

  const alertNodeInfo = ({ node, path, treeIndex }) => {
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

  const url = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <> 
        <Layout serverData={serverData.adminMenu}>
          <Seo title="Content" />
          <h1>Content page</h1>
          <div style={{ height: 900 }}>
            <SortableTree
              treeData={tree.treeData}
              onChange={(treeData) => setTree({ treeData })}
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
                    Created: {formatDate(rowInfo.node.attributes.created)}&nbsp;
                  </>,
                  <>
                    Updated: {formatDate(rowInfo.node.attributes.changed)}&nbsp;
                  </>,
                  <>
                    <Badge
                      variant="primary"
                      sx={{ textTransform: `capitalize` }}
                    >
                      {rowInfo.node.node.type
                        .replace("node--", "")
                        .replace("-", " ")}
                    </Badge>
                    &nbsp;
                  </>,
                  <Button onClick={() => editNode(rowInfo)}>Edit</Button>,
                ],
              })}
            />
          </div>
        </Layout>
    </>
  );
};

export default DrupalAdminPage;

export async function getServerData(context) {
  const token = await isLoggedIn(Object.fromEntries(context.headers).cookie);

  if (token === false) {
    return {
      props: {},
    };
  }
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
      headers: { "Set-Cookie": `access-token=${JSON.stringify(token)}` },
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
