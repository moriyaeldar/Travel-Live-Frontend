import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePage } from '../store/page.actions.js';
import { onUpdateUser, getCurrentUser } from '../store/user.actions';

import { userService } from '../services/user.service.js';

class _BecomeHost extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.changePage('become-host');
  }

  handleClick = () => {
    const user = userService.getLoggedinUser();
    if (!user) {
      this.props.history.push(`/login`);
    }
    user.isHost = true;
    this.props.onUpdateUser(user);
    this.props.history.push(`/host/${user._id}`);
  };

  render() {
    return (
      <section className='become-host'>
        <div className='become-txt'>
          <div className='txt'>
            <h1>Hosting</h1> 
            <h1>makes Travel & Live,</h1>
            <h1> Travel & Live</h1> 
            <button onClick={this.handleClick}>Try hosting</button>
          </div>
        </div>
        <div className='become-img'>
          <img
            src='https://res.cloudinary.com/dohqnraie/image/upload/v1633436517/airbnb-host-greeting-guest_matj9w.jpg'
            alt=''
          />
        </div>
      </section>
    );
  }
}
function mapStateToProps(state) {
  return {
    stays: state.stayModule.stays,
    user: state.userModule.user,
  };
}

const mapDispatchToProps = {
  changePage,
  onUpdateUser,
};

export const BecomeHost = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BecomeHost);
