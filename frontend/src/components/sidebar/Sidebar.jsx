import Conversations from "./Conversations";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div>
      <SearchInput></SearchInput>
      <div className="divider px-3"></div>
      <Conversations></Conversations>
      {/* <LogoutButton></LogoutButton>  */}
    </div>
  );
};

export default Sidebar;
