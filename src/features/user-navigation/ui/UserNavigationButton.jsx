import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useUserNavigation } from '../model/useUserNavigation';

export const UserNavigationButton = ({ userPkId }) => {
  const { handleUserIconClick } = useUserNavigation(userPkId);

  return (
  <Button onClick={handleUserIconClick}>
    <FontAwesomeIcon icon={faUser} />
  </Button>
);
}