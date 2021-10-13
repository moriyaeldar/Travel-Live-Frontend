import { Component } from 'react';
import { connect } from 'react-redux';
import { onLogin, onSignup, onUpdateUser} from '../store/user.actions';
import { changePage } from '../store/page.actions.js';
import {socketService} from '../services/socket.service'
import {utilService} from '../services/util.service'

// import { showErrorMsg } from '../services/event-bus.service.js';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Button, TextField } from '@material-ui/core';

class _LoginPage extends Component {
  state = {
    credentials: {
      username: '',
      password: '',
      email: '',
      fullname: '',
      savedStays: [],
    },
    isSignup: false,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.changePage('login');

    if (this.props.user) this.props.history.push('/');
  }

  toggleSignup = () => {
    this.setState({ isSignup: !this.state.isSignup });
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({
      credentials: { ...this.state.credentials, [field]: value },
    });
  };

  clearState = () => {
    const clearTemplate = {
      credentials: {
        username: '',
        password: '',
        fullname: '',
      },
      isSignup: false,
    };
    this.setState({ clearTemplate });
  };

  onLogin = async (ev = null) => {
    if (ev) {
      ev.preventDefault();
    }
    if (!this.state.credentials.username || !this.state.credentials.password) {
      return;
    }
    try {
      let user = await this.props.onLogin(this.state.credentials);
      if(user.isHost){
        socketService.setup();
        socketService.emit("setHost", user._id);
        socketService.on("setNotification", async(msg) => {
          console.log("msg host", msg);
          user={...user, savedNotifications:[...user.savedNotifications,{ date: utilService.formattedDates(Date.now()), msg ,isRead:false}]}
          console.log('user after socket: ' , user);
          this.props.onUpdateUser(user)
        });
        }
      if (user) {
        this.props.history.push('/');
      }
    } catch (err) {
      console.log('error:', err);
    }
    this.clearState();
  };

  onSignup = (ev = null) => {
    if (
      !this.state.credentials.username ||
      !this.state.credentials.password ||
      !this.state.credentials.fullname
    )
      return;
    if (ev) ev.preventDefault();
    try {
      const user = this.props.onSignup(this.state.credentials);
      if (user) this.props.history.push('/');
    } catch (err) {
      console.log('error:', err);
    }
    this.clearState();
  };

  render() {
    const { username, fullname, password, email, isSignup } = this.state;
    return (
      <section className='login-page main-container'>
        <div className='login-page-container'>
          {!isSignup && (
            <div className='login-form-container'>
              <form className='login-form' onSubmit={this.onLogin}>
                <div className='login-header'>
                  <h2>Log in</h2>
                </div>
                <div className='login-content'>
                  <h1>Welcome back</h1>
                  <input
                    className='login-form-input'
                    type='text'
                    name='username'
                    placeholder='Username'
                    autoComplete='off'
                    value={username}
                    onChange={this.handleChange}
                    required
                  />
                  <input
                    className='login-form-input'
                    type='password'
                    name='password'
                    placeholder='Password'
                    autoComplete='off'
                    value={password}
                    onChange={this.handleChange}
                    required
                  />
                  <button type='submit' className='login-btn'>
                    submit
                  </button>
                </div>
                <div className='login-form-actions'>
                  <button onClick={this.toggleSignup}>New User?</button>
                  <button>Forgot Password?</button>
                </div>
              </form>
            </div>
          )}
          {isSignup && (
            <div className='login-form-container'>
              <form className='login-form' onSubmit={this.onSignup}>
                <div className='login-header'>
                  <h2>Log in</h2>
                </div>
                <div className='login-content'>
                  <h1>Welcome to Travel & Live</h1>
                  <input
                    className='login-form-input'
                    type='text'
                    name='fullname'
                    placeholder='Full name'
                    autoComplete='off'
                    value={fullname}
                    onChange={this.handleChange}
                    required
                  />
                  <input
                    className='login-form-input'
                    type='password'
                    name='password'
                    placeholder='Password'
                    autoComplete='off'
                    value={password}
                    onChange={this.handleChange}
                    required
                  />
                  <input
                    className='login-form-input'
                    type='text'
                    name='username'
                    placeholder='Username'
                    autoComplete='off'
                    value={username}
                    onChange={this.handleChange}
                    required
                  />
                  <input
                    className='login-form-input'
                    type='email'
                    name='email'
                    placeholder='Email'
                    autoComplete='off'
                    value={email}
                    onChange={this.handleChange}
                    required
                  />
                  <button type='submit' className='login-btn'>
                    sign up
                  </button>
                </div>
                <div className='login-form-actions'>
                  <button onClick={this.toggleSignup}>
                    I already have an account
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
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
  onLogin,
  onSignup,
  changePage,
  onUpdateUser
};

export const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LoginPage);
