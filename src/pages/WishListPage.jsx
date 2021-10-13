import React from 'react';
import { connect } from 'react-redux';
import { StayList } from '../cmps/StayList';
import { loadStays, filterStays } from '../store/stay.actions.js';
import { changePage } from '../store/page.actions.js';
import { DateRange } from '../cmps/DateRange';
import { userService } from '../services/user.service';
import { loadStaysFromUser } from '../store/user.actions';
import { UserWishList } from '../cmps/UserWishList';
import { removeStayFromUser } from '../store/user.actions';

class _WishListPage extends React.Component {
  state = {
    userSavedStays: [],
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    const { savedStays } = this.props;
    this.setState({userSavedStays: savedStays})
    const user = await userService.getLoggedinUser();
    if (!user) {
      this.props.history.push('/');
      return;
    }

    const userSavedStays = await this.props.loadStaysFromUser();
    this.setState({ userSavedStays: userSavedStays }, () => {
      
    });
  }

  onRemoveSavedStay = async (stayId) => {
    this.props.removeStayFromUser(stayId);
    // const user = await userService.getLoggedinUser();
    const userSavedStays = await this.props.loadStaysFromUser();
    console.log('userSavedStays in onRemoveSavedStay', userSavedStays);
    this.setState({ userSavedStays: userSavedStays }, () => {
      
    });
  };

  render() {
    // const { savedStays } = this.props;
    const { userSavedStays } = this.state;
    if (!userSavedStays) return <h2>loading...</h2>;

    return (
      <section className='wishlist-page main-container'>
        <h1>Wish List</h1>
        <UserWishList userSavedStays={userSavedStays} onRemoveSavedStay={this.onRemoveSavedStay} />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    savedStays: state.userModule.savedStays,
  };
}

const mapDispatchToProps = {
  loadStays,
  filterStays,
  changePage,
  loadStaysFromUser,
  removeStayFromUser
};

export const WishListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_WishListPage);
