import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { userService } from '../services/user.service';
import { RatingStar } from './RatingStars';
import { showSuccessMsg } from '../services/event-bus.service.js';
import { UserMsg } from './UserMsg';
import { Loader } from './Loader';

export class AddReview extends React.Component {
  state = {
    review: {
      txt: '',
      ratings: {
        avg: 0,
        cleanliness: 0,
        communication: 0,
        checkIn: 0,
        accuracy: 0,
        location: 0,
        value: 0,
      },
      date: null,
      by: null,
    },

    isUserMsgShown: false,
  };

  async componentDidMount() {
    const user = await userService.getLoggedinUser();
    if (user) {
      this.setState((prevState) => ({
        ...prevState,
        review: {
          by: {
            _id: user._id,
            fullname: user.fullname,
            imgUrl: user.imgUrl,
          },
        },
      }));
    }
  }

  ratingChanged = (value, field) => {
    this.setState((prevState) => ({
      ...prevState,
      review: {
        ...prevState.review,
        ratings: { ...prevState.review.ratings, [field]: value },
      },
    }));
  };

  onHandleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({ review: { ...this.state.review, [field]: value } });
  };

  clearState = async () => {
    const user = await userService.getLoggedinUser();
    this.setState((prevState) => ({
      review: {
        txt: '',
        ratings: {
          avg: 0,
          cleanliness: 0,
          communication: 0,
          checkIn: 0,
          accuracy: 0,
          location: 0,
          value: 0,
        },
        date: null,
        by: {
          ...prevState.by,
          _id: user._id,
          fullname: user.fullname,
          imgUrl: user.imgUrl,
        },
      },
      isUserMsgShown: false,
    }));
  };
  toggleMessage = () => {
    this.setState({ showUserMsg: true });
  };

  render() {
    const { txt } = this.state.review;
    const { isUserMsgShown } = this.state;
    const { by } = this.state.review;
    if (!by) return <h4>You need to log in to write a review</h4>;
    return (
      <div className='add-review'>
        <h1>Add Review</h1>
        <div className='add-review-header'>
          {!by && (
            <img
              src={
                'https://home-and-go.herokuapp.com/static/media/avatar.e582e4ba.png'
              }
            />
          )}
          {by && <img src={by.imgUrl} />}
          <div>
            {!by ? <h3>Guest</h3> : <h3>{by.fullname}</h3>}
            <h4>{new Date(Date.now()).toLocaleDateString('en-GB')}</h4>
          </div>
        </div>

        <RatingStar isEdit={true} ratingChanged={this.ratingChanged} />

        <form
          className='add-review-input'
          onSubmit={(ev) => {
            ev.preventDefault();
            this.setState(
              {
                review: {
                  ...this.state.review,
                  txt: this.state.review.txt,
                  ratings: this.state.review.ratings,
                  date: Date.now(),
                },
              },
              async () => {
                const user = await userService.getLoggedinUser();
                if (!user) {
                  console.log('LOGIN');
                  showSuccessMsg('Please Login');
                  return;
                }

                await this.props.onAddReview(this.state.review);
                this.clearState();
              }
            );
          }}
        >
          <textarea
            className='add-review-txtarea'
            name='txt'
            type='text'
            placeholder='Write your opinion about this stay...'
            value={txt}
            onChange={this.onHandleChange}
            required
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}
