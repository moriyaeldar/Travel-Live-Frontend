import React from 'react';
import { connect } from 'react-redux';
import { StayList } from '../cmps/StayList';
import { loadStays, filterStays } from '../store/stay.actions.js';
import { changePage } from '../store/page.actions.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ImgSlider from '../cmps/ImgSlider';
import { userService } from '../services/user.service.js';
import { saveStayToUser, removeStayFromUser } from '../store/user.actions.js';

import brooklynLoft from '../assets/img/brooklynLoft.jpg';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';
import stay from '../data/stay';
class _StayPreview extends React.Component {
  state = {
    isSaved: false,
  };

  async componentDidMount() {
    const { stay } = this.props;
    // console.log('stay in stayPreview', stay);
    const user = await userService.getLoggedinUser();
    // console.log('user in stay preview', user);
    // console.log('stay._id in stay preview', stay._id);
    if (user) {
      user.savedStays.forEach((savedStay) => {
        // console.log('savedStay in stay preview', savedStay);
        if (user.savedStays.includes(stay._id)) {
          this.setState({ isSaved: true });
        }
      });
    }
  }
  // onRemoveSavedStay = async (stayId) => {
  //   this.props.removeStayFromUser(stayId);
  //   // const user = await userService.getLoggedinUser();
  //   const userSavedStays = await this.props.loadStaysFromUser();
  //   console.log('userSavedStays in onRemoveSavedStay', userSavedStays);
  //   this.setState({ userSavedStays: userSavedStays }, () => {

  //   });
  // };
  toggleSavedStay = (ev) => {
    console.log('toggleSavedStay');
    console.log(' isSaved is', this.state.isSaved);
    ev.preventDefault();
    ev.stopPropagation();
    const { isSaved } = this.state;
    if (isSaved) {
      this.saveStay(ev);
    } else {
      this.removeStay(ev);
    }
  };

  removeStay = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const { stay } = this.props;
    // this.setState({ isSaved: false});
    const user = await userService.getLoggedinUser();
    await this.props.removeStayFromUser(stay._id);
  };
  saveStay = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const { stay } = this.props;
    // this.setState({ isSaved: true});
    const user = await userService.getLoggedinUser();
    await this.props.saveStayToUser(stay._id);
  };

  getReviewsAverage = (reviews) => {
    if (!reviews || !reviews.length) return 0;
    const average =
      reviews.reduce(function (sum, value) {
        return sum + value.ratings.avg;
      }, 0) / reviews.length;

    return average.toFixed(2);
  };

  render() {
    const { stay } = this.props;
    const { isSaved } = this.state;
    if (!stay) <Loader />;
    return (
      <div className='stay-preview'>
        <div className='inner-stay-preview'>
          <button
            className={`stay-preview-save-btn ${isSaved ? 'on' : 'off'}`}
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              // this.onSaveStay(ev);
              this.setState({ isSaved: !isSaved }, () => {
                console.log('isSaved after setstate***');
                this.toggleSavedStay(ev);
              });
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <ImgSlider stay={stay} />
          <div className='preview-content'>
            <span className='stay-rate'>
              <FontAwesomeIcon icon={faStar} />
              {stay.avgReviewRating && stay.reviews && (
                <span className='prev-rev-txt'>
                  {!stay.reviews || !stay.reviews.length
                    ? 0
                    : this.getReviewsAverage(stay.reviews)}{' '}
                  ( {stay.reviews.length} )
                </span>
              )}
            </span>
            <p>
              {stay.type} ‧ {stay.city}{' '}
            </p>
            <p className='title-prev'> {stay.title}</p>
            <p>
              <span className='price-prev'>${stay.price}</span> / night
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stays: state.stayModule.stays,
    savedStays: state.userModule.stays,
  };
}

const mapDispatchToProps = {
  loadStays,
  filterStays,
  changePage,
  saveStayToUser,
  removeStayFromUser,
};

export const StayPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_StayPreview);
