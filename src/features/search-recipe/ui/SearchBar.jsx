import { IconButton } from "../../../shared/ui/IconButton/IconButton";
import { SearchInput } from "../../../shared/ui/SearchInput/SearchInput";
import { useSearch } from "../model/useSearch";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const SearchBar = () => {
  const {keyword, handleSearchChange, handleSearch, onKeyEnter} = useSearch();

  return(
    <>
      <SearchInput
        value={keyword}
        onChange={handleSearchChange}
        onKeyDown={onKeyEnter}
      />
      <IconButton
      icon={faMagnifyingGlass}
      onClick={() => {
        handleSearch();  
      }}
      ariaLabel="검색"
      />
    </>
  );
};