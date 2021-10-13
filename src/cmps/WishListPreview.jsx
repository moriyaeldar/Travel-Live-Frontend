import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ImgSlider from '../cmps/ImgSlider';
import { removeStayFromUser } from '../store/user.actions.js';
import brooklynLoft from '../assets/img/brooklynLoft.jpg';
import { Link } from 'react-router-dom';
import { stayService } from '../services/stay.service';
export class _WishListPreview extends React.Component {
  
  state = {
    userSavedStay: null,
    isSaved: true,
    currStay: null

  };

  async componentDidMount() {
    console.log('WishListPreview');
    const { stayId } = this.props
    const currStay = await stayService.getById(stayId)
    this.setState({currStay})
    console.log('currStay**********************', currStay, stayId );
    this.setState({userSavedStay: currStay}, ()=>{
      console.log('userSavedStay in wishList Preview', this.userSavedStay);
    })
  }
  onRemoveSaveStay = async (ev)=>{
    ev.preventDefault();
    ev.stopPropagation();
    this.setState({ isSaved: !this.state.isSaved });
    // await this.props.removeStayFromUser(this.state.currStay._id);
    await this.props.onRemoveSavedStay(this.state.currStay._id);
  }

  render() {
    const { userSavedStay, isSaved } = this.state
    if (!userSavedStay) return <h2> </h2>;
    return (
      <div className='wishlist-preview'>
        <div className='inner-wishlist-preview'>
          <button className={`stay-preview-save-btn on`} >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <ImgSlider stay={userSavedStay} />
          <div className='preview-content'>

            <span className='stay-rate'>
              <FontAwesomeIcon icon={faStar} />
              {userSavedStay.avgReviewRating && userSavedStay.reviews && (<span className="prev-rev-txt">{userSavedStay.avgReviewRating} ( {userSavedStay.reviews.length} )</span>)}
            </span>
            <p>{userSavedStay.type} ‧ {userSavedStay.city}  </p><p className="title-prev"> {userSavedStay.title}</p>
            <p ><span className="price-prev">${userSavedStay.price}</span> / night</p>
          </div>
        </div>
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    
  };
}

const mapDispatchToProps = {
  removeStayFromUser
};

export const WishListPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WishListPreview);