import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark,
  faBookOpen,
  faExternalLinkAlt,
  faHome,
  faMedal,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { changePage } from '../store/page.actions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logDOM } from '@testing-library/dom';
import React from 'react';
import { connect } from 'react-redux';
import { AddOrder } from '../cmps/AddOrder';
import { AddReview } from '../cmps/AddReview';
import { Amenities } from '../cmps/Amenities.jsx';
import { OrderForm } from '../cmps/OrderForm';
import { RatingStar } from '../cmps/RatingStars';
import { ReviewList } from '../cmps/ReviewList';
import { StayMap } from '../cmps/StayMap';
import { stayService } from '../services/stay.service';
import { onAddOrder, setGuests, onEditOrder } from '../store/order.actions';
import { loadReviews, addReview } from '../store/review.actions.js';
import { Loader } from '../cmps/Loader.jsx';
import { userService } from '../services/user.service.js';
import { StayDetailsHeader } from '../cmps/StayDetailsHeader.jsx';
import { socketService } from '../services/socket.service.js';
import { saveNotifiToUser } from '../store/user.actions';

class _StayDetails extends React.Component {
  state = {
    stay: null,
    reviews: [],
    newOrder: {
      checkIn: null,
      checkOut: null,
      // guests: ''
      guests: {
        adults: 0,
        kids: 0,
      },
    },
    isGuestsModalShown: false,
  };
  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.props.changePage('details');
    const stayId = this.props.match.params.stayId;
    if (!stayId) {
      this.props.history.push('/');
      return;
    }
    stayService.getById(stayId).then((stay) =>{
    
    this.setState({ stay })
    socketService.setup()
    socketService.emit('setHost',stay.host._id)
    // socketService.on('setNotification',(msg)=>{
    //   console.log('msg',msg);
    //   this.props.saveNotifiToUser({ date: this.formattedDates(Date.now()), msg })
    // })
  })
  }

  onCloseModal = () => {
    this.setState({ isGuestsModalShown: false });
  };
  formattedDates = (chosenDate) => {
    if (!chosenDate) return 'Add dates';
    const date = new Date(chosenDate);
    return date.toLocaleDateString('en-GB');
  };
  // onGetNotifications=(msg)=>{
  // this.props.saveNotifiToUser({ date: this.formattedDates(Date.now()), msg })
  // }
  onAddOrder = async (order) => {
    const user = await userService.getLoggedinUser();
    const { stay } = this.state;

    const orderObj = {
      ...order,
      status: 'pending',
      user,
      host: stay.host,
    };
    const orderToSave = {
      ...(await this.props.onAddOrder(orderObj, user._id)),
    };
  };

  onRemoveOrder = (orderId) => {
    this.props.onRemoveOrder(orderId);
  };

  onAddReview = async (review) => {
    try {
      const { stay } = this.state;
      await this.props.addReview(stay, review);
    } catch (err) {
      console.log('login first');
    }
  };

  getReviewsAverage = (reviews) => {
    if (!reviews || !reviews.length) return 0;
    const average =
      reviews.reduce(function (sum, value) {
        return sum + value.ratings.avg;
      }, 0) / reviews.length;

    return average.toFixed(2);
  };

  updateNumOfGuests = (diff, type, ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const order = { ...this.props.newOrder };
    if (
      order.guests.adults + order.guests.kids + diff >
      this.state.stay.capacity
    )
      return;
    if (order.guests[type] + diff < 0) return;
    order.guests[type] += diff;
    this.props.setGuests(order);
  };

  onToggleModal = () => {
    const { isGuestsModalShown } = this.state;
    console.log('this is on toggle modal');
    this.setState({ isGuestsModalShown: !isGuestsModalShown });
  };

  render() {
    const { stay, reviews, isGuestsModalShown } = this.state;
    const { checkIn, checkOut } = this.props;

    return !stay ? (
      <Loader />
    ) : (
      <section className='details-container'>
        <main className='stay-details'>
          <section className='stay-details-header'>
            <h1 className='stay-title '>{stay.title}</h1>
            <div className='stay-short-info'>
              <div className='stay-short-info-details'>
                <span className='stay-rate-details'>
                  <FontAwesomeIcon className='star' icon={faStar} />
                </span>
                <span>{this.getReviewsAverage(stay.reviews)}</span>{' '}
                <p>( {stay.reviews ? stay.reviews.length : 0} reviews )</p>
                <span className='span-dot'>●</span>
                <p>{stay.loc.address}</p>
              </div>
              <div className='action-btns'>
                <a>
                  <FontAwesomeIcon
                    className='action-icon'
                    icon={faExternalLinkAlt}
                  />
                  Share
                </a>
                <a>
                  <FontAwesomeIcon className='action-icon' icon={faHeart} />
                  Save
                </a>
              </div>
            </div>
          </section>
          <section className='stay-gallery' id='Photos'>
            {stay.imgUrls.map((img) => {
              return <img src={img} />;
            })}
          </section>
          <section className='stay-info-container'>
            <div className='stay-info'>
              <div className='stay-info-header'>
                <div>
                  <h3>
                    {stay.type} hosted by {stay.host.fullname}
                  </h3>
                  <p className='stay-info-header-subtitle'>
                    {stay.capacity} Guests <span className='span-dot'>●</span>{' '}
                    {stay.stayType} <span className='span-dot'>●</span>{' '}
                    {stay.type}
                  </p>
                </div>
                <img src={stay.host.imgUrl} />
              </div>
              <div className='stay-features-container'>
                <div className='stay-features-details'>
                  <FontAwesomeIcon icon={faHome} />
                  <div>
                    <h3>Entire Place</h3>
                    {/* <p>Entire Place</p> */}
                    <h4>You'll have the place to yourself.</h4>
                  </div>
                </div>
                <div className='stay-features-details'>
                  <FontAwesomeIcon icon={faBookOpen} />
                  <div>
                    <h3>House Rules</h3>
                    <h4>
                      {' '}
                      This place isn’t suitable for children under 12 and the
                      host doesn’t allow pets.
                    </h4>
                  </div>
                </div>
                <div className='stay-features-details'>
                  <FontAwesomeIcon icon={faMedal} />
                  <div>
                    <h3>{stay.host.fullname} is A Superhost</h3>
                    <h4>
                      {' '}
                      Superhosts are experienced, highly rated hosts who are
                      committed to providing great stays for guests.
                    </h4>
                  </div>
                </div>
                <div className='stay-features-details'>
                  <FontAwesomeIcon icon={faBookmark} />
                  <div>
                    <h3>Wifi</h3>
                    <h4>Guests often search for this popular amenity</h4>
                  </div>
                </div>
              </div>
              <div className='stay-description'>
                <h2>Description</h2>
                <p>{stay.desc}</p>
              </div>

              <div className='stay-amenities' id='Amenities'>
                <h2>Amenities</h2>
                <Amenities amenities={stay.amenities} />
              </div>
            </div>

            <OrderForm
              stay={stay}
              newOrder={this.props.newOrder}
              onAddOrder={this.onAddOrder}
              onRemoveOrder={this.onRemoveOrder}
              updateNumOfGuests={this.updateNumOfGuests}
              isGuestsModalShown={isGuestsModalShown}
              updateDates={this.updateDates}
              onToggleModal={this.onToggleModal}
              reviewsAvg={this.getReviewsAverage(stay.reviews)}
              orderId={this.props.location.orderId}
              onEditOrder={this.props.onEditOrder}
              capacity={stay.capacity}
            />
          </section>

          <div className='reviews-header' id='Reviews'>
            <div className='reviews-header-rate'>
              <span className='stay-rate'>
                <FontAwesomeIcon className='star' icon={faStar} />
              </span>
              <p> {this.getReviewsAverage(stay.reviews)}</p>
              <p>( {stay.reviews ? stay.reviews.length : 0} reviews )</p>
            </div>
            <RatingStar isEdit={false} reviews={stay.reviews} />
          </div>
          <ReviewList reviews={stay.reviews} />
          <AddReview onAddReview={(review) => this.onAddReview(review)} />

          <section id='Location' className='map-container'>
            <h2>Location</h2>
            <StayMap location={stay.loc} />
          </section>
        </main>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    newOrder: state.orderModule.newOrder,
    orders: state.userModule.orders,
    reviews: state.reviewModule.reviews,
  };
}

const mapDispatchToProps = {
  onAddOrder,
  addReview,
  loadReviews,
  setGuests,
  changePage,
  onEditOrder,
  saveNotifiToUser,
};

export const StayDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StayDetails);
