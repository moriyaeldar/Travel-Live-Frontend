import React from "react";
import { connect } from "react-redux";
// import { setNotifications,setNotificationNum } from '../store/notification.actions.js';
import { changePage } from "../store/page.actions.js";
import { onUpdateUser } from "../store/user.actions.js";
import { getLoggedinUser, userService } from "../services/user.service";
import { Loader } from "../cmps/Loader.jsx";
import { render } from "@testing-library/react";

class _Notifications extends React.Component {
  async componentDidMount() {
    this.props.changePage("notifications");
    console.log("user in notifi", this.props.user);
  }

  componentWillUnmount() {
    let { user } = this.props;
    if(!user)return
    // user={...user.savedNotifications, savedNotifications:[...user.savedNotifications.map,{isRead:true}]}
    user.savedNotifcations = user.savedNotifications.map(notification =>{
      notification.isRead = true;
      return notification
    })
    
    this.props.onUpdateUser(user) 
    ;
  }
  render() {
    const { user } = this.props;
    if (!user) return <Loader />;
    const { savedNotifications } = user;
    if (!savedNotifications || !savedNotifications.length) return <Loader />;
    return (
      <section className="notifications main-container">
        <h1>Notifications</h1>
        {savedNotifications.map((notification) => (
          <div className="notifi">
            <img
              src="https://forakyafrica-drilling.com/wp-content/uploads/2020/12/man-300x300-1.png"
              alt=""
            />
            <div className="notifi-txt">
              <p className={!notification.isRead?'notRead':''}>{notification.msg}</p>
              <p>{notification.date}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {
  changePage,
  onUpdateUser};

export const Notifications = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Notifications);
