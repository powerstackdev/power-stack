import { navigate } from "gatsby";
import { isBrowser } from "@powerstack/utils";

const Home = () => {
  isBrowser && navigate("/admin/content");
  return null
};

export default Home;
