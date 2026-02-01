import { Form } from 'react-bootstrap';
export const SearchInput = ({ value, onChange, onKeyDown, placeholder = "검색어를 입력하세요" }) => {
  return(
  <Form.Control
    aria-label="Search"
    aria-describedby="search-input"
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
  />
  );
};