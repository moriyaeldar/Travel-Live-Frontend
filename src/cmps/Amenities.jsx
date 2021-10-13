import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';
import { faSnowflake } from '@fortawesome/free-regular-svg-icons';
import {
  faBlender,
  faPaw,
  faTv,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';

export function Amenities({ amenities }) {
  const getIcon = (icon) => {
    switch (icon) {
      case 'TV':
        return <FontAwesomeIcon className='amenity-icon' icon={faTv} />;
      case 'Wifi':
        return <FontAwesomeIcon className='amenity-icon' icon={faWifi} />;
      case 'Kitchen':
        return <FontAwesomeIcon className='amenity-icon' icon={faAirbnb} />;
      case 'Pets allowed':
        return <FontAwesomeIcon className='amenity-icon' icon={faPaw} />;
      case 'Cooking basics':
        return <FontAwesomeIcon className='amenity-icon' icon={faBlender} />;
      case 'Smoking allowed':
        return <FontAwesomeIcon className='amenity-icon' icon={faSnowflake} />;
      default:
        break;
    }
  };

  const allAmenities = [
    'TV',
    'Wifi',
    'Kitchen',
    'Pets allowed',
    'Cooking basics',
    'Smoking allowed',
  ];

  const isAmenityExists = (amenity) => {
    if (amenities.includes(amenity)) {
      return '';
    }
    return 'cross-amenity';
  };

  const isSideCross = (amenity) => {
    if (amenities.includes(amenity)) {
      return '';
    }
    return 'strikethrough';
  };

  return (
    <div className='amenities'>
      <ul>
        {allAmenities.map((amenity, idx) => (
          <li key={idx} className={isAmenityExists(amenity)}>
            <span className={isSideCross(amenity)}> {getIcon(amenity)} </span>
            {amenity}
          </li>
        ))}
      </ul>
    </div>
  );
}
