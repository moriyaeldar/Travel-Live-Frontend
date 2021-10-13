import React from 'react';
import { onLogin } from '../store/user.actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class _LoginModal extends React.Component {
  handleLoginToDemo = () => {
    const demoUser = {
      username: 'u101',
      password: 'secret',
    };
    this.props.onLogin(demoUser);
  };
  render() {
    const { isLoginModal } = this.props;
    return (
      <div className={isLoginModal ? 'login-modal shown' : 'login-modal'}>
        <h1>Please login first</h1>
        <div className='login-modal-actions'>
          <button
            className='login-modal-demo-btn'
            onClick={this.handleLoginToDemo}
          >
            Login to demo user
          </button>
          <Link to={'/login'} className='login-modal-login-btn'>
            Login page
          </Link>
        </div>
      </div>
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
};

export const LoginModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LoginModal);
