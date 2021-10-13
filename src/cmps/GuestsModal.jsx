export function GuestsModal({ guests, updateNumOfGuests }) {
  return (
    <div className='guests-modal'>
      <div className='modal-row'>
        <div className='modal-text-container'>
          <p>Adults</p>
          <p>Ages 13 or above</p>
        </div>
        <div className='modal-btns-container'>
          <button
            className='modal-btn'
            onClick={(ev) => updateNumOfGuests(-1, 'adults', ev)}
          >
            -
          </button>
          <span>{guests.adults}</span>
          <button
            className='modal-btn'
            onClick={(ev) => updateNumOfGuests(1, 'adults', ev)}
          >
            +
          </button>
        </div>
      </div>
      <div className='modal-row'>
        <div className='modal-text-container'>
          <p>Kids</p>
          <p>Ages 2-12</p>
        </div>
        <div className='modal-btns-container'>
          <button
            className='modal-btn'
            onClick={(ev) => updateNumOfGuests(-1, 'kids', ev)}
          >
            -
          </button>
          <span>{guests.kids}</span>
          <button
            className='modal-btn'
            onClick={(ev) => updateNumOfGuests(1, 'kids', ev)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
