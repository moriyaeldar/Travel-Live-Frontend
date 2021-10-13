import { Component } from 'react';
import { connect } from 'react-redux';
import { onUpdateUser, getCurrentUser } from '../store/user.actions';
import { changePage } from '../store/page.actions.js';

class _AccountPage extends Component {
  state = {
    credentials: {
      username: '',
      fullname: '',
      email: '',
      imgUrl: '',
    },
    isEdit: false,
  };

  componentDidMount() {
    this.props.changePage('details');
    window.scrollTo(0, 0);
    const { user } = this.props;
    if (!user) this.props.history.push('/');
    this.setState({ credentials: user });
  }

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({
      credentials: { ...this.state.credentials, [field]: value },
    });
  };

  toggleEdit = () => {
    const { isEdit } = this.state;
    this.setState({ isEdit: !isEdit });
    if (isEdit) this.onSave();
  };

  onSave = () => {
    this.props.onUpdateUser(this.state.credentials);
  };

  render() {
    const { isEdit } = this.state;
    const { username, fullname, email, imgUrl } = this.state.credentials;
    return (
      <section className='account-info-page main-container'>
        <h1>Personal info</h1>
        <div className='user-details'>
          {!isEdit && (
            <div className='user-details-content'>
              <div className='user-details-header'>
                <img src={imgUrl} />
                <div>
                  <h4>Hello {fullname}</h4>
                  <p>It's nice to have you with us</p>
                </div>
              </div>
              <div className='user-info'>
                <h4>Full Name</h4>
                <p>{fullname}</p>
              </div>
              <div className='user-info'>
                <h4>Username</h4>
                <p>{username}</p>
              </div>
              <div className='user-info'>
                <h4>Email</h4>
                <p>{email}</p>
              </div>
              <button onClick={this.toggleEdit}>Edit</button>
            </div>
          )}

          {isEdit && (
            <div className='user-details-content'>
              <div className='user-details-header'>
                <img src={imgUrl} />
                <div>
                  <h4>Hello {fullname}</h4>
                  <p>It's nice to have you with us</p>
                </div>
              </div>
              <div className='user-info'>
                <h4>Full Name</h4>
                <p>
                  <input
                    type='text'
                    name='fullname'
                    placeholder='Full name'
                    autoComplete='off'
                    value={fullname}
                    onChange={this.handleChange}
                    required
                  />
                </p>
              </div>
              <div className='user-info'>
                <h4>Username</h4>
                <p>
                  <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    autoComplete='off'
                    value={username}
                    onChange={this.handleChange}
                    required
                  />
                </p>
              </div>
              <div className='user-info'>
                <h4>Email</h4>
                <p>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    autoComplete='off'
                    value={email}
                    onChange={this.handleChange}
                    required
                  />
                </p>
              </div>
              <button onClick={this.toggleEdit}>save</button>
            </div>
          )}

          <div className='info-container'>
            <div>
              <img
                src={
                  'https://home-and-go.herokuapp.com/static/media/user-lock.b5a4d298.PNG'
                }
              />
              <h3>Which details can be edited?</h3>
              <p>
                Details Airbnb uses to verify your identity can’t be changed.
                Contact info and some personal details can be edited, but we may
                ask you verify your identity the next time you book or create a
                listing.
              </p>
            </div>
            <div>
              <img
                src={
                  'https://home-and-go.herokuapp.com/static/media/user-card.45d2a01a.PNG'
                }
              />
              <h3>What info is shared with others?</h3>
              <p>
                Airbnb only releases contact information for hosts and guests
                after a reservation is confirmed.
              </p>
            </div>
          </div>
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
  onUpdateUser,
  getCurrentUser,
  changePage,
};

export const AccountPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AccountPage);
