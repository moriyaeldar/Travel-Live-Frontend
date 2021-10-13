import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Loader } from './Loader';

export class _StayDetailsHeader extends React.Component {
  getReviewsAverage = (reviews) => {
    if (!reviews || !reviews.length) return 0;
    const average =
      reviews.reduce(function (sum, value) {
        return sum + value.ratings.avg;
      }, 0) / reviews.length;

    return average.toFixed(2);
  };
  render() {
    const { currStay } = this.props;
    if (!currStay) return <Loader />;
    console.log('***************', this.props);
    return (
      <section className='details-header-container'>
        <header className='details-container'>
          <div className='details-header'>
            <ul className='details-header-nav'>
              <li>
                <a href='#Photos'>Photos</a>
              </li>
              <li>
                <a href='#Amenities'>Amenities</a>
              </li>
              <li>
                <a href='#Reviews'>Reviews</a>
              </li>
              <li>
                <a href='#Location'>Location</a>
              </li>
            </ul>
            <div className='mini-form'>
              <div className='mini-form-details'>
                <p>
                  <span className='mini-order-header-price'>
                    ${currStay.price}{' '}
                  </span>
                  <span className='mini-order-text'>/ night</span>
                </p>
                <span className='mini-stay-rate'>
                  <FontAwesomeIcon className='star' icon={faStar} />
                  <span className='mini-reviews-avg'>
                    {this.getReviewsAverage(currStay.reviews)}
                  </span>
                  {
                    <p className='mini-reviews-num'>
                      ({currStay.reviews ? currStay.reviews.length : 0} reviews)
                    </p>
                  }
                </span>
              </div>
              <a href='#Form'>
                {' '}
                <button className='mini-form-btn'>
                  Check availability
                </button>{' '}
              </a>
            </div>
          </div>
        </header>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currStay: state.stayModule.currStay,
  };
};

const mapDispatchToProps = {};

export const StayDetailsHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StayDetailsHeader);
