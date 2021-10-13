import React from 'react';
import { stayReducer } from '../store/stay.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { GuestsModal } from './GuestsModal';
import { DateRange } from './DateRange';
import stay from '../data/stay';
import { userService } from '../services/user.service';
import { LoginModal } from './LoginModal';
import { setModalPos, setPos } from '../store/page.actions.js';
import { connect } from 'react-redux';

export class _OrderForm extends React.Component {
  state = {
    newOrderFromForm: {
      totalPrice: 0,
      checkIn: '',
      checkOut: '',
      guests: {
        adults: 0,
        kids: 0,
      },
      stay: {
        _id: this.props.stay._id,
        title: this.props.stay.title,
        totalPrice: this.props.stay.price,
        imgUrls: this.props.stay.imgUrls,
      },
    },
    isOrderSum: false,
    isDatesCmpShow: false,
    x: 0,
    y: 0,
    rect: 0,
    isReserveOrder: false,
    isLoginModal: false,
  };

  componentDidMount() {
    const { newOrder } = this.props;
    const { newOrderFromForm } = this.state;
    this.setState((prevState) => ({
      newOrderFromForm: {
        ...prevState.newOrderFromForm,
        checkIn: newOrder.checkIn,
        checkOut: newOrder.checkOut,
        guests: newOrder.guests,
      },
    }));

    window.addEventListener('scroll', () => {
      this.setState({ isDatesCmpShow: false, isGuestsModalShown: false });
    });
  }

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState((prevState) => ({
      newOrder: { ...prevState.newOrder, [field]: value },
    }));
  };

  handleChangeNew = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState((prevState) => ({
      newOrderFromForm: { ...prevState.newOrderFromForm, [field]: value },
    }));
  };

  onAddOrder = (ev) => {
    ev.preventDefault();
    if (
      !this.state.newOrderFromForm.checkIn ||
      !this.state.newOrderFromForm.checkOut ||
      !this.state.newOrderFromForm.guests
    ) {
      return;
    }
    const user = userService.getLoggedinUser();
    if (!user) {
      this.setState({ isLoginModal: true }, () => {
        setTimeout(() => {
          this.setState({ isLoginModal: false });
        }, 4000);
      });
      return;
    }
    const days = this.getNumOfDays();
    const { stay } = this.props;
    const sum = this.getTotalPrice(stay.price, days);

    this.setState(
      (prevState) => ({
        newOrderFromForm: { ...prevState.newOrderFromForm, totalPrice: sum },
      }),
      () => {
        const { newOrderFromForm } = this.state;

        this.setState({ isOrderSum: true });
        if (this.props.orderId) {
          newOrderFromForm._id = this.props.orderId;
          this.props.onEditOrder(newOrderFromForm);
        } else {
          this.props.onAddOrder(newOrderFromForm);
        }
      }
    );
  };

  clearState = () => {
    const clearTemplate = {
      newOrder: {
        totalPrice: 0,
        checkIn: '',
        checkOut: '',
        guests: {
          adults: 0,
          kids: 0,
        },
      },
    };
    this.setState({ ...clearTemplate });
  };

  handleHover = (ev) => {
    this.setState({
      x: ev.clientX,
      y: ev.clientY,
      rect: ev.target.getBoundingClientRect(),
    });
  };

  getNumOfDays = () => {
    const { checkOut, checkIn } = this.state.newOrderFromForm;
    if (!checkIn || !checkOut) return;
    const sum = Math.abs(Math.floor((checkOut - checkIn) / 86400000));
    return sum;
  };

  getTotalPrice = (price, days) => {
    const sum = price * days;
    return sum;
  };
  toggleButton = () => {
    const { newOrderFromForm } = this.state;
    if (
      !newOrderFromForm.checkIn ||
      !newOrderFromForm.checkOut ||
      newOrderFromForm.guests.adults + newOrderFromForm.guests.kids === 0
    ) {
      console.log('missing fields!');
      return;
    }

    this.setState({ isReserveOrder: true, isOrderSum: true });
  };

  toggleDateCmp = () => {
    this.setState({ isDatesCmpShow: !this.state.isDatesCmpShow });
  };
  setDates = (start, end) => {
    const startDay = Date.parse(start);
    const endDay = Date.parse(end);

    this.setState((prevState) => ({
      newOrderFromForm: {
        ...prevState.newOrderFromForm,
        checkIn: startDay,
        checkOut: endDay,
      },
    }));
  };

  formattedDates = (chosenDate) => {
    if (!chosenDate) return 'Add dates';
    const date = new Date(chosenDate);
    return date.toLocaleDateString('en-GB');
  };

  render() {
    const {
      x,
      y,
      isOrderSum,
      rect,
      isReserveOrder,
      newOrderFromForm,
      isDatesCmpShow,
    } = this.state;
    const { isGuestsModalShown, isLoginModal } = this.state;
    const { checkIn, checkOut, guests } = this.state.newOrderFromForm;
    const { stay, updateNumOfGuests, updateDates } = this.props;
    const { left, top } = this.props.relativePos;

    return (
      <div className='order-form-container' id='Form'>
        <div className='sticky-form-container'>
          <div className='sticky-form'>
            <div className='order-header'>
              <p>
                <span className='order-header-price'>${stay.price} </span>
                <span>/ night</span>
              </p>
              <span className='stay-rate'>
                <FontAwesomeIcon className='star' icon={faStar} />
                <span>{this.props.reviewsAvg}</span>
                {<p>({stay.reviews ? stay.reviews.length : 0} reviews)</p>}
              </span>
            </div>
            <p className='price-vary'>Price may vary by date</p>
            <form className='order-form' onSubmit={this.onAddOrder}>
              <div className='order-form-dates-input'>
                <label className='checkin-label' htmlFor='order-checkIn'>
                  <span>checkIn:</span>
                  <input
                    type='text'
                    name='checkIn'
                    id='order-checkIn'
                    value={this.formattedDates(checkIn)}
                    onChange={this.handleChangeNew}
                    onClick={(ev) => {
                      const left = ev.pageX - 80;
                      const top = ev.pageY + 25;
                      this.props.setPos({ left, top });
                      this.toggleDateCmp();
                    }}
                    required
                    placeholder='check In'
                  />
                </label>
                <label className='checkout-label' htmlFor='order-checkOut'>
                  <span>checkOut:</span>
                  <input
                    type='checkOut'
                    name='checkOut'
                    value={this.formattedDates(checkOut)}
                    onClick={(ev) => {
                      const left = ev.pageX - 50;
                      const top = ev.pageY + 25;
                      this.props.setPos({ left, top });
                      this.toggleDateCmp();
                    }}
                    onChange={this.handleChangeNew}
                    id='order-checkOut'
                    required
                    placeholder='check In'
                  ></input>
                </label>
              </div>

              {/* <label className='guests-label' htmlFor='order-guests'> */}
              <label className='guests-label'>
                <span>Guests:</span>
                <input
                  name='guests'
                  value={guests.kids + guests.adults}
                  onChange={this.handleChangeNew}
                  id='order-guests'
                  autoComplete='off'
                  required
                  onClick={(ev) => {
                    const left = ev.pageX - 50;
                    const top = ev.pageY + 30;
                    this.props.setPos({ left, top });
                    this.props.onToggleModal();
                  }}
                ></input>
              </label>

              {!isReserveOrder && (
                <button
                  className='form-btn'
                  style={{
                    backgroundPosition: `-${x}% -${y}%`,
                  }}
                  onMouseMove={this.handleHover}
                  onClick={this.toggleButton}
                  type='button'
                >
                  Check Availability
                </button>
              )}
              {isReserveOrder && (
                <button
                  className='form-btn'
                  style={{
                    backgroundPosition: `-${x}% -${y}%`,
                  }}
                  onMouseMove={this.handleHover}
                  type='submit'
                >
                  Reserve
                </button>
              )}
              {isOrderSum && (
                <div className='order-sum-details'>
                  <h4>You won't be charged yet</h4>
                  <div>
                    <p>
                      ${stay.price} X {this.getNumOfDays()} nights
                    </p>
                    <span>
                      ${this.getTotalPrice(stay.price, this.getNumOfDays()).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <p>Cleaning fee</p>
                    <span>$40</span>
                  </div>
                  <div>
                    <p>Service fee</p>
                    <span>$100</span>
                  </div>

                  <div className='order-sum-total'>
                    <p>Total</p>
                    <p>
                      $
                      {(this.getTotalPrice(stay.price, this.getNumOfDays()) +
                        100 +
                        40).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
          <span className='report-listing'>
            <FontAwesomeIcon icon={faFlag} />
            Report this listing
          </span>
        </div>
        {isLoginModal && <LoginModal isLoginModal={isLoginModal} />}
        {isDatesCmpShow && (
          <DateRange
            toggleDateCmp={this.toggleDateCmp}
            setDates={this.setDates}
          />
        )}
        {this.props.isGuestsModalShown && (
          <div className='guests-modal-div-container' style={{ left, top }}>
            <GuestsModal
              guests={guests}
              updateNumOfGuests={updateNumOfGuests}
            />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currPage: state.pageModule.currPage,
    relativePos: state.pageModule.relativePos,
  };
}

const mapDispatchToProps = {
  setModalPos,
  setPos,
};

export const OrderForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(_OrderForm);
