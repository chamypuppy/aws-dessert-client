import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const IconButton = ({ icon, onClick, ariaLabel }) => {
  return (
    <Button
      onClick={onClick} 
      aria-label={ariaLabel}
    >

    <FontAwesomeIcon icon={icon} />
    </Button>
  );
};