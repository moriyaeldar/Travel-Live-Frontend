import React from 'react';

export function ReviewPreview({ review }) {
  const changeDateFormat = (date) => {
    const newDate = date.split('.');
    var month = '';
    switch (newDate[1]) {
      case '1':
        month = 'January';
        break;
      case '2':
        month = 'February';
        break;
      case '3':
        month = 'March';
        break;
      case '4':
        month = 'April';
        break;
      case '5':
        month = 'May';
        break;
      case '6':
        month = 'June';
        break;
      case '7':
        month = 'July';
        break;
      case '8':
        month = 'August';
        break;
      case '9':
        month = 'September';
        break;
      case '10':
        month = 'October';
        break;
      case '11':
        month = 'November';
        break;
      case '12':
        month = 'December';
        break;

      default:
        break;
    }
    return month + ' ' + newDate[2];
  };
  const formattedDates = (chosenDate) => {
    if (!chosenDate) {
      chosenDate = Date.now();
    }

    const date = new Date(chosenDate);
    return date.toLocaleDateString("en-GB");
  };
  return (
    <div className='review-preview'>
      <div className='review-header'>
        <img src={review.by.imgUrl} />
        <div>
          <h3>{review.by.fullname}</h3>
          <h4>
          {formattedDates(review.date)}
          </h4>
        </div>
      </div>
      <div className='review-content'>
        <p>{review.txt}</p>
      </div>
    </div>
  );
}
