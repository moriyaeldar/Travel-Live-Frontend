import React from 'react';
import { connect } from 'react-redux';
import { HostStayList } from '../cmps/HostStaysList.jsx';
import { userService } from '../services/user.service.js';
import { loadStays } from '../store/stay.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faBuilding,
  faMoneyBillAlt,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark,
  faBookOpen,
  faExternalLinkAlt,
  faHome,
  faMedal,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { changePage } from '../store/page.actions.js';
import { Loader } from '../cmps/Loader.jsx';
import { AddStay } from '../cmps/AddStay.jsx';
import { HostOrdersList } from '../cmps/HostOrdersList.jsx';
import { HostRates } from '../cmps/HostRates';
import { HostHeader } from '../cmps/HostHeader.jsx';
class _HostPage extends React.Component {
  state = {
    add: false,
    places: false,
    orders: false,
    rates: false,
    user: userService.getLoggedinUser(),
    isEdit: false,
    stay: null,
  };

  ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 2,
        width: 100,
      }}
    />
  );
  async componentDidMount() {
    window.scrollTo(0, 0);
    this.props.changePage('host');
    this.props.loadStays();
    const user = await userService.getLoggedinUser();

    this.setState(user);
    const { stays } = this.props;
    const userStays = stays.filter((stay) => stay.host._id === user._id);
    // if (!userStays || !userStays.length) {
    //   this.changeCmp('add');
    // }
    this.changeCmp('orders');
  }

  changeCmp = (cmp) => {
    switch (cmp) {
      case 'add':
        this.setState({ add: true });
        this.setState({ places: false });
        this.setState({ orders: false });
        this.setState({ rates: false });
        break;
      case 'places':
        this.setState({ places: true });
        this.setState({ orders: false });
        this.setState({ rates: false });
        this.setState({ add: false });
        break;
      case 'orders':
        this.setState({ orders: true });
        this.setState({ places: false });
        this.setState({ rates: false });
        this.setState({ add: false });
        break;
      case 'rates':
        this.setState({ rates: true });
        this.setState({ orders: false });
        this.setState({ places: false });
        this.setState({ add: false });
        break;

      default:
        break;
    }
  };

  onEditStay = (stayId) => {
    const { stays } = this.props;
    const stayToEdit = { ...stays.filter((stay) => stay._id === stayId) };
    this.setState({ isEdit: true, stay: stayToEdit }, () => {
      this.changeCmp('add');
    });
  };

  render() {
    var { stays } = this.props;
    const { user, isEdit, stay } = this.state;

    return !stays || !stays.length ? (
      <Loader />
    ) : (
      <section className='host-page main-container'>
        <div className='host-page-container'>
          <div className='nav-side'>
            <div className='actions-line'>
              <div className='icons'>
                <span>
                  <FontAwesomeIcon className='building' icon={faBuilding} />
                </span>
                <span>
                  <FontAwesomeIcon className='home' icon={faHome} />
                </span>
                <span>
                  <FontAwesomeIcon className='open-book' icon={faBookOpen} />
                </span>
                <span>
                  <FontAwesomeIcon className='star' icon={faStar} />
                </span>
              </div>
              <div className='actions'>
                <span>
                  <button onClick={() => this.changeCmp('add')}>
                    Add Place
                  </button>
                </span>
                <span>
                  <button onClick={() => this.changeCmp('places')}>
                    My Places
                  </button>
                </span>
                <span>
                  <button onClick={() => this.changeCmp('orders')}>
                    Orders{' '}
                  </button>
                </span>
                <span>
                  <button onClick={() => this.changeCmp('rates')}>Rates</button>
                </span>
              </div>
            </div>
            <div className='info'>
              <FontAwesomeIcon className='money' icon={faMoneyBillAlt} />
              <h3>Make All Payments Through Travel & Live</h3>
              <p>
                Always pay and communicate through Travel & Live to ensure
                you're protected under our Terms of Service, Payments Terms of
                Service, cancellation, and other safeguards.
              </p>
            </div>
          </div>
          <section className='host-page-content'>
            <HostHeader />
            {this.state.add && (
              <section className='add place'>
                <AddStay isEdit={isEdit} stay={stay} user={user} />
              </section>
            )}

            {this.state.places && (
              <section className='places'>
                {' '}
                <HostStayList
                  stays={stays}
                  onRemovehost={this.onRemovehost}
                  onEditStay={this.onEditStay}
                  ColoredLine={this.ColoredLine}
                  userId={user._id}
                />
              </section>
            )}
            {this.state.orders && (
              <section className='orders'>
                <HostOrdersList ColoredLine={this.ColoredLine} />
              </section>
            )}
            {this.state.rates && (
              <section className='rates'>
                <HostRates />
              </section>
            )}
            {this.state.rates && <section className='rates'></section>}
          </section>
        </div>
      </section>
    );
  }
}
function mapStateToProps(state) {
  return {
    stays: state.stayModule.stays,
  };
}

const mapDispatchToProps = {
  loadStays,
  changePage,
};

export const HostPage = connect(mapStateToProps, mapDispatchToProps)(_HostPage);
