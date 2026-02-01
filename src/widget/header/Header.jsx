import { InputGroup } from 'react-bootstrap';
import { SearchBar } from "../../features/search-recipe/ui/SearchBar";
import { UserNavigationButton } from "../../features/user-navigation/ui/UserNavigationButton";

export const Header = ({ userPkId }) => {
  return(
    <header className='pt-[10px] pb-[1px] sticky top-0 z-[1] bg-white px-3 lg:px-4'>
      <InputGroup className="mb-3">
        <SearchBar/>
        <UserNavigationButton userPkId={userPkId}/>
      </InputGroup>
    </header>

  )
};