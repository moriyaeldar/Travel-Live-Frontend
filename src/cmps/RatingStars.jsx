import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Loader } from './Loader';

export class RatingStar extends React.Component {
  state = {
    ratings: {
      avg: 0,
      cleanliness: 0,
      communication: 0,
      checkIn: 0,
      accuracy: 0,
      location: 0,
      value: 0,
    },
    isLoading: true,
  };

  getAverage = (reviews, field) => {
    return (
      reviews.reduce(function (sum, value) {
        console.log(field, value.ratings[field]);
        return sum + value.ratings[field];
      }, 0) / reviews.length
    );
  };

  componentDidMount() {
    const { reviews } = this.props;
    if (reviews) {
      this.setState((prevState) => ({
        ...prevState,
        ratings: {
          cleanliness: this.getAverage(reviews, 'cleanliness'),
          communication: this.getAverage(reviews, 'communication'),
          checkIn: this.getAverage(reviews, 'checkIn'),
          accuracy: this.getAverage(reviews, 'accuracy'),
          location: this.getAverage(reviews, 'location'),
          value: this.getAverage(reviews, 'value'),
        },
      }));
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { isEdit, ratingChanged, values } = this.props;
    const { cleanliness, communication, accuracy, location, value, checkIn } =
      this.state.ratings;
    const { isLoading } = this.state;
    if (isLoading) return <Loader />;
    return (
      <div className='review-rating-container'>
        <div className='review-rating-item'>
          <div>
            <h3>Location</h3>
          </div>

          <ReactStars
            name='location'
            count={5}
            onChange={(value) => ratingChanged(value, 'location')}
            size={24}
            activeColor='#FF385C'
            edit={isEdit}
            value={location}
          />
        </div>

        <div className='review-rating-item'>
          <h3>Accessibility</h3>
          <ReactStars
            name='value'
            count={5}
            onChange={(value) => ratingChanged(value, 'value')}
            size={24}
            activeColor='#FF385C'
            edit={isEdit}
            value={value}
          />
        </div>

        <div className='review-rating-item'>
          <h3>Accuracy</h3>
          <ReactStars
            name='accuracy'
            count={5}
            onChange={(ev) => ratingChanged(ev, 'accuracy')}
            size={24}
            activeColor='#FF385C'
            edit={isEdit}
            value={accuracy}
          />
        </div>

        <div className='review-rating-item'>
          <h3>Check-in</h3>
          <ReactStars
            name='checkIn'
            count={5}
            onChange={(value) => ratingChanged(value, 'checkIn')}
            size={24}
            activeColor='#FF385C'
            edit={isEdit}
            value={checkIn}
          />
        </div>

        <div className='review-rating-item'>
          <h3>Communication</h3>
          <ReactStars
            name='communication'
            count={5}
            onChange={(value) => ratingChanged(value, 'communication')}
            size={24}
            activeColor='#FF385C'
            edit={isEdit}
            value={communication}
          />
        </div>
        <div className='review-rating-item'>
          <h3>Cleanliness-in</h3>
          <ReactStars
            name='cleanliness'
            count={5}
            onChange={(value) => ratingChanged(value, 'cleanliness')}
            size={24}
            activeColor='#FF385C'
            edit={isEdit}
            value={cleanliness}
          />
        </div>
      </div>
    );
  }
}
