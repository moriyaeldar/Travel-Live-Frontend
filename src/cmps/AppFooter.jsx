import React from 'react';
import { connect } from 'react-redux';
import { loadStays } from '../store/stay.actions.js';
import { Link } from 'react-router-dom';
import { onSetCurrStay } from '../store/stay.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

class _AppFooter extends React.Component {
  state = { stays: [] };
  async componentDidMount() {
    const stays = await this.props.loadStays();
    this.setState({ stays });
  }

  render() {
    const { isModalOpen, msg } = this.state;
    const { stays } = this.state;
    const cities = [
      'Tel Aviv-Yafo',
      'Jerusalem',
      'London',
      'New York',
      'Barcelona',
      'Los Angeles',
      'Paris',
      'Amsterdam',
    ];
    const countries = [
      'Israel',
      'Israel',
      'England',
      'United States',
      'Spain',
      'United States',
      'France',
      'Netherlands',
    ];
    const { currPage } = this.props;
    console.log(currPage);
    return (
      <footer
        className={
          currPage === 'details'
            ? 'app-footer details-container'
            : 'app-footer main-container'
        }
      >
        {/* {isModalOpen && (
          <div id='modal1' class='modal1'>
            <div class='modal-content'>
              <h4>{msg}</h4>
            </div>
            <div class='modal-footer'>
              <button onClick={this.closeModal}>✕</button>
            </div>
          </div>
        )} */}
        <section className='footer-container'>
          <div className='footer-links-list'>
            <p>Top Rated</p>
            {stays.slice(0, 8).map((stay) => {
              return (
                <Link
                  className='footer-links-item'
                  key={stay._id}
                  to={`/stay/${stay._id}`}
                  onClick={async () => {
                    await this.props.onSetCurrStay(stay._id);
                  }}
                >
                  <p>{stay.title}</p>
                  <p>{stay.loc.address}</p>
                </Link>
              );
            })}
          </div>
          <div className='footer-links-list'>
            <p>Nearby</p>
            {stays.slice(0, 8).map((stay) => {
              return (
                <Link
                  className='footer-links-item'
                  key={stay._id}
                  to={`/stay/${stay._id}`}
                  onClick={async () => {
                    await this.props.onSetCurrStay(stay._id);
                  }}
                >
                  <p>{stay.title}</p>
                  <p>{stay.loc.address}</p>
                </Link>
              );
            })}
          </div>
          <div className='footer-links-list'>
            <p>Cities</p>
            {cities.map((city, idx) => {
              return (
                <Link
                  key={idx}
                  to={`/explore?city=${'city'}`}
                  className='footer-links-item'
                >
                  <p>{city}</p>
                  <p>{countries[idx]}</p>
                </Link>
              );
            })}
          </div>
        </section>
        <div className='footer-bottom'>
          <div>
            <p>© 2021 Travel&Live, Inc.</p>
            <span className='small-dot'>·</span>
            <Link className='link'>
              <p>About</p>
            </Link>
            <span>·</span>
            <Link to='/login' className='link'>
              <p>Login</p>
            </Link>
            <span>·</span>
            <Link to='/host' className='link'>
              <p>Become a host</p>
            </Link>
          </div>
          <div className='media-container'>
            <p>
              <span>
                <FontAwesomeIcon className='amenity-icon' icon={faGlobe} />
              </span>

              <span>English (US)</span>
              <span>$US</span>
            </p>
            <p>
              <span className='social-media-icon'>
                <FontAwesomeIcon className='amenity-icon' icon={faTwitter} />
              </span>
              <span className='social-media-icon'>
                <FontAwesomeIcon className='amenity-icon' icon={faFacebook} />
              </span>
              <span className='social-media-icon'>
                <FontAwesomeIcon className='amenity-icon' icon={faInstagram} />
              </span>
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    stays: state.stayModule.stays,
    currPage: state.pageModule.currPage,
  };
}

const mapDispatchToProps = {
  loadStays,
  onSetCurrStay,
};

export const AppFooter = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AppFooter);
