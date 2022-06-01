/** @jsx jsx */
import { jsx, Button } from "theme-ui";
import { FiSearch } from "react-icons/fi";

export const SearchButton = () => (
  <Button variant="clear">
    <FiSearch />
  </Button>
)

export default SearchButton