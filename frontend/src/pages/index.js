import * as React from "react";
import { navigate } from "gatsby";
import { isBrowser } from "../utils/Utils";

const Home = () => {
  isBrowser() && navigate("/admin/content");
  return null
};

export default Home;
