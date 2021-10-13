import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import routes from "../routes";
import logo from "../assets/img/logo.png";
import { loadStays } from "../store/stay.actions.js";
import { newOrder } from "../store/order.actions.js";
import { GuestsModal } from "./GuestsModal";
import {
  onLogin,
  onLogout,
  onSignup,
  loadUsers,
  removeUser,
  getCurrentUser,
} from "../store/user.actions.js";
import { changePage, setModalPos, setPos } from "../store/page.actions.js";
import { saveNotifiToUser } from "../store/user.actions.js";

// import {
//   setNotifications,
//   setNotificationNum,
// } from "../store/notification.actions.js";
import { LoginSignup } from "./LoginSignup.jsx";
import { faAirbnb } from "@fortawesome/free-brands-svg-icons";
import { DropDownCity } from "./DropDownCity";
import { DateRange } from "./DateRange";
import { StayDetailsHeader } from "./StayDetailsHeader";
import { UserMsg } from "./UserMsg.jsx";
import { socketService } from "../services/socket.service";
import { Notifications } from "../cmps/Notifications.jsx";

class _AppHeader extends React.Component {
  state = {
    addCityToSearch: "",
    scrollyPos: false,
    numOfNotifications: 0,
    filterBy: {
      city: "",
    },
    newOrder: {
      checkIn: "",
      checkOut: "",
      guests: {
        adults: 0,
        kids: 0,
      },
    },
    isLoggedIn: false,
    isMenueOpen: false,
    isGuestsModalShown: false,
    isDateRangeShown: false,
    isCityDropDownShown: false,
    isScrolled: false,
  };

  async componentDidMount() {
    // const currUser = await this.props.getCurrentUser();
    // if (currUser) {
    //   this.setState({ isLoggedIn: true });
    // }

    // if(user?.savedNotifications){
    // console.log('header-notifi',this.state.numOfNotifications);
    // }

    const user = await this.props.getCurrentUser();
    if (user) {
      this.setState({ isLoggedIn: true });
    }

    this.scrollPos();
    window.addEventListener("scroll", () => {
      this.setState({ isDateRangeShown: false, isGuestsModalShown: false });
    });
    socketService.setup();
    socketService.on("get notification", this.msgFromAdmin);
  }
  // msgFromAdmin = (msg) => {
  //   this.props.setNotifications({ date: this.formattedDates(Date.now()), msg });
  //   this.props.setNotificationNum();
  // };

  formattedDates = (chosenDate) => {
    if (!chosenDate) return "Add dates";
    const date = new Date(chosenDate);
    return date.toLocaleDateString("en-GB");
  };

  updateNumOfGuests = (diff, type, ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    const { guests } = this.state.newOrder;
    if (guests[type] + diff < 0) return;
    guests[type] += diff;
    this.setState((prevState) => ({
      newOrder: { ...prevState.newOrder, guests },
    }));
  };
  onCloseModal = () => {
    this.setState({ isMenuOpen: false });
    this.setState({ isGuestsModalShown: false });
    this.setState({ isDateRangeShown: false });
    this.setState({ isCityDropDownShown: false });
  };

  onNewOrder = () => {
    this.props.newOrder(this.state.newOrder);
  };
  onSearch = () => {
    this.props.filterStays(this.state);
    this.clearState();
  };

  clearState = () => {
    const clearTemplate = {
      filterBy: {
        city: "",
      },
      checkIn: "",
      checkOut: "",
      guests: {
        adults: 0,
        kids: 0,
      },
    };
    this.setState({ ...clearTemplate });
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;

    this.setState((prevState) => ({
      newOrder: { ...prevState.newOrder, [field]: value },
    }));
  };

  addCityToSearch = (city) => {
    this.setState((prevState) => ({
      filterBy: { ...prevState.filterBy, city: city },
    }));
  };

  handleChangeSearch = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;

    this.setState((prevstate) => ({
      filterBy: { ...prevstate.filterBy, city: value },
    }));
  };
  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  onLogin = (credentials) => {
    // this.props.onLogin(credentials);
  };
  onSignup = (credentials) => {
    this.props.onSignup(credentials);
  };
  onLogout = () => {
    this.props.onLogout();
    this.setState({ isLoggedIn: false });
  };

  handleDates = (time) => {};
  scrollPos = () => {
    document.addEventListener(
      "scroll",
      function (e) {
        var pos = window.scrollY;
        if (pos > 80) {
          this.setState({ scrollyPos: true });
        } else {
          this.setState({ scrollyPos: false });
        }
        if (pos > 1520) {
          this.setState({ isScrolled: true });
        } else {
          this.setState({ isScrolled: false });
        }
      }.bind(this)
    );
  };

  toggleDateCmp = () => {
    this.setState({ isDateRangeShown: !this.state.isDateRangeShown });
  };

  setDates = (start, end) => {
    const startDay = Date.parse(start);
    const endDay = Date.parse(end);
    this.setState((prevState) => ({
      newOrder: {
        ...prevState.newOrder,
        checkIn: startDay,
        checkOut: endDay,
      },
    }));
  };

  formattedDates = (chosenDate) => {
    if (!chosenDate) return "Add dates";
    const date = new Date(chosenDate);
    return date.toLocaleDateString("en-GB");
  };
  getReviewsAverage = (reviews) => {
    const average =
      reviews.reduce(function (sum, value) {
        return sum + value.ratings.avg;
      }, 0) / reviews.length;

    return average.toFixed(2);
  };

  render() {
    const {
      isModalOpen,
      filterBy,
      isMenuOpen,
      isGuestsModalShown,
      isDateRangeShown,
      isCityDropDownShown,
      scrollyPos,
      isScrolled,
      isNotifiSeen,
      isLoggedIn,
    } = this.state;
    const { checkIn, checkOut, guests } = this.state.newOrder;
    const { user, currPage } = this.props;
    let notifications;
    console.log("#####", user);
    if (user && user.savedNotifications.length) {
      const { savedNotifications } = user;
      notifications = savedNotifications.filter(
        (savedNotification) => !savedNotification.isRead
      );
    } else {
      notifications = false;
    }
    const { left, top } = this.props.relativePos;
    return (
      <section>
        {isScrolled && currPage === "details" && <StayDetailsHeader />}
        {(currPage !== "details" ||
          (currPage === "details" && !isScrolled)) && (
          <header
            className={
              currPage === "details"
                ? "mini-header details-container"
                : (!scrollyPos && currPage === "home") || currPage === ""
                ? "app-header main-container"
                : "mini-header main-container"
            }
          >
            <Link to="/" className="logo">
              Travel <FontAwesomeIcon className="airbnb" icon={faAirbnb} /> Live
            </Link>
            <nav>
              <div className="nav-links">
                <Link to="/explore" className="nav-link-explore">
                  Explore
                </Link>
                {/* <Link to="/host" className="nav-link-become">
                  Switch to hosting
                </Link> */}
                {!user && (
                  <Link to="/login" className="nav-link-become">
                    Become a Host
                  </Link>
                )}
                {user && user.isHost && (
                  <Link to={`/host/${user._id}`} className="nav-link-become">
                    Switch to hosting
                  </Link>
                )}
                {user && !user.isHost && (
                  <Link to="/host" className="nav-link-become">
                    Switch to hosting
                  </Link>
                )}

                <div className="menu">
                  {user && (
                    <span
                      className={
                        notifications.length ? "notifiShown" : "notifiNotShown"
                      }
                    >
                      {notifications.length}
                    </span>
                  )}
                  <button
                    className={
                      notifications.length ? "btn-menu-toggle" : "btn-menu"
                    }
                    onClick={this.toggleMenu}
                  >
                    ☰ <FontAwesomeIcon className="user" icon={faUserCircle} />
                  </button>

                  <ul className={`user-menu ${isMenuOpen ? "open" : "closed"}`}>
                    <li
                      className={`drop-down-item ${user ? "show" : "not-show"}`}
                    >
                      {user && (
                        <Link
                          to={`/notifications/${user._id}`}
                          className="nav-link"
                        >
                          Notifications
                        </Link>
                      )}
                    </li>
                    <li
                      className={`drop-down-item ${user ? "show" : "not-show"}`}
                    >
                      {user && (
                        <Link to="/orders" className="nav-link">
                          Trips
                        </Link>
                      )}
                    </li>
                    <li
                      className={`drop-down-item ${user ? "show" : "not-show"}`}
                    >
                      {user && (
                        <Link to="/wishList" className="nav-link">
                          Wishlists
                        </Link>
                      )}
                    </li>
                    <li
                      className={`drop-down-item ${user ? "show" : "not-show"}`}
                    >
                      {user && (
                        <Link to={`/host/${user._id}`} className="nav-link">
                          Dashboard
                        </Link>
                      )}
                    </li>
                    <li
                      className={`drop-down-item ${user ? "show" : "not-show"}`}
                    >
                      {user && (
                        <Link to={`/user/${user._id}`} className="nav-link">
                          Account
                        </Link>
                      )}{" "}
                    </li>

                    {!user && (
                      <li
                        className="drop-down-item login-btn"
                        onClick={this.onLogin}
                      >
                        <Link to="/login" className="nav-link">
                          Login
                        </Link>
                      </li>
                    )}
                    {!user && (
                      <li className="drop-down-item" onClick={this.onLogin}>
                        <Link to="" className="nav-link">
                          Host your home
                        </Link>
                      </li>
                    )}
                    {!user && (
                      <li className="drop-down-item" onClick={this.onLogin}>
                        <Link to="" className="nav-link">
                          About
                        </Link>
                      </li>
                    )}

                    <li className="drop-down-item" onClick={this.onLogin}>
                      <Link to="" className="nav-link">
                        Help
                      </Link>
                    </li>

                    {user && (
                      <li
                        className={`drop-down-item ${
                          user ? "show" : "not-show"
                        }`}
                        onClick={this.onLogout}
                      >
                        <p className="logout-btn"> Log Out </p>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </nav>

            <form className="mini-header-search">
              {/* <label className='search-item mini' htmlFor='city-search'> */}

              <span className="mini-search-item">
                {" "}
                {filterBy.city ? filterBy.city : "Start your search"}
              </span>
              {/* <input
                  className='mini-search-item'
                  type='text'
                  name='city'
                  id='city-search'
                  value={filterBy.city}
                  placeholder='Search'
                  autoComplete='off'
                  onChange={this.handleChangeSearch}
                  
                /> */}
              {/* </label> */}
              <button className="mini-search-btn">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
            <form className="header-search" onSubmit={this.onSearch}>
              <label className="search-item mini" htmlFor="city">
                Location
                <input
                  className="search-item"
                  type="text"
                  name="city"
                  id="city"
                  value={filterBy.city}
                  placeholder="Where are you going?"
                  autoComplete="off"
                  onChange={this.handleChangeSearch}
                  onClick={() => {
                    this.setState({
                      isCityDropDownShown: !isCityDropDownShown,
                    });
                  }}
                />
              </label>
              {isCityDropDownShown && (
                <DropDownCity addCityToSearch={this.addCityToSearch} />
              )}
              <label className="search-item" htmlFor="search-checkIn">
                Check in
                <input
                  className="search-item"
                  type="text"
                  name="checkIn"
                  value={this.formattedDates(checkIn)}
                  onChange={this.handleChange}
                  id="search-checkIn"
                  placeholder="Add Dates"
                  autoComplete="off"
                  onClick={(ev) => {
                    const left = ev.screenX -50 ;
                    const top = ev.screenY - 70;
                    this.props.setPos({ left, top });
                    this.setState({ isDateRangeShown: !isDateRangeShown });
                  }}
                ></input>
              </label>

              <label className="search-item" htmlFor="search-checkOut">
                Check out
                <input
                  className="search-item"
                  type="text"
                  name="checkOut"
                  value={this.formattedDates(checkOut)}
                  onChange={this.handleChange}
                  id="search-checkOut"
                  placeholder="Add Dates"
                  autoComplete="off"
                  onClick={(ev) => {
                    const left = ev.screenX - 20;
                    const top = ev.screenY - 70;
                    this.props.setPos({ left, top });
                    this.setState({ isDateRangeShown: !isDateRangeShown });
                  }}
                ></input>
              </label>

              <label
                className="search-item guests-search"
                htmlFor="search-guests"
                onClick={(ev) => {
                  const left = ev.clientX-35;
                  const top = ev.clientY+25;

                  this.props.setPos({ left, top });
                  this.setState((prevState) => ({
                    isGuestsModalShown: !prevState.isGuestsModalShown,
                  }));
                }}
              >
                Guests
                <input
                  name="guests"
                  value={guests.kids + guests.adults}
                  onChange={this.handleChange}
                  id="order-guests"
                  required
                ></input>
              </label>

              <Link to={`/explore?city=${this.state.filterBy.city}`}>
                {/* <Link to={`/explore?city=${this.state.filterBy.city}&checkIn=${this.state.newOrder.checkIn}&checkOut=${this.state.newOrder.checkIn}`}> */}
                {/* <Link to={`/explore?city=${this.state.filterBy.city}&checkIn=${this.state.newOrder.checkIn}`}> */}
                <button
                  className="search-item search-btn"
                  onClick={() => {
                    this.onNewOrder();
                  }}
                >
                  {" "}
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </Link>

              <span className="stay-rate"></span>
            </form>
          </header>
        )}
        {(isMenuOpen ||
          isGuestsModalShown ||
          isDateRangeShown ||
          isModalOpen ||
          isCityDropDownShown) && (
          <div className="screen" onClick={this.onCloseModal}></div>
        )}
        {isDateRangeShown && (
          <DateRange
            toggleDateCmp={this.toggleDateCmp}
            setDates={this.setDates}
          />
        )}
        {isGuestsModalShown && (
          <div className="guests-modal-div-container" style={{ left, top }}>
            <GuestsModal
              guests={guests}
              updateNumOfGuests={this.updateNumOfGuests}
            />
          </div>
        )}
        <UserMsg />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.userModule.users,
    user: state.userModule.user,
    count: state.userModule.count,
    notifiStatus: state.userModule.notifiStatus,
    isLoading: state.systemModule.isLoading,
    stays: state.stayModule.stays,
    // filterBy: state.stayModule.stays,
    filterBy: state.stayModule.filterBy,
    newOrder: state.orderModule.newOrder,
    currPage: state.pageModule.currPage,
    currPage: state.pageModule.currPage,
    modalPos: state.pageModule.modalPos,
    relativePos: state.pageModule.relativePos,

    // notificationsNum: state.notificationModule.numOfNotifications,
    // notifications: state.notificationModule.notifications,
  };
}
const mapDispatchToProps = {
  onLogin,
  onSignup,
  onLogout,
  getCurrentUser,
  loadStays,
  newOrder,
  changePage,
  saveNotifiToUser,
  setModalPos,
  setPos,
};

export const AppHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AppHeader);
