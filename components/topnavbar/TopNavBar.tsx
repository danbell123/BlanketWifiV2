import SearchBar from "../SearchBar";
import ProfileDropdown from "./profileDropdown";

const TopNav = () => {
  return (
    <div className="bg-background flex justify-between relative">
      <div className="w-1/3">
        <SearchBar />
      </div>
      <ProfileDropdown />
    </div>
  );
};

export default TopNav;
