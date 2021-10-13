import React from 'react';
import { connect } from 'react-redux';
import { StayList } from '../cmps/StayList.jsx';
import { AddStay } from '../cmps/AddStay.jsx';
import {
  loadStays,
  onAddStay,
  onRemoveStay,
  onUpdateStay,
} from '../store/stay.actions.js';
import { changePage } from '../store/page.actions.js';
import { Loader } from '../cmps/Loader.jsx';
import { Link, NavLink } from 'react-router-dom';

class _HomePage extends React.Component {
  state = {
    locSearch: '',
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.changePage('home');
  }

  onRemoveStay = (stayId) => {
    this.props.onRemoveStay(stayId);
  };

  onAddStay = (stay) => {
    this.props.onAddStay(stay);
  };

  render() {
    const { stays } = this.props;
    return !stays ? (
      <p>loading...</p>
    ) : (
      <section className='home-page main-container'>
        <div className='hero main-container full top-fold'>
          <h2>Not sure where to go? Perfect.</h2>

          <Link to='/explore' className='nav-link'>
            <button>
              {' '}
              <a className='im-flexible-btn'> I'm flexible </a>
            </button>
          </Link>
        </div>
        <div className='bottom-fold'>
          <div className='nearby'>
            <h3>Explore nearby</h3>
            <div className='gallery'>
              <div>
                <Link to={`/explore?city=${'Tel Aviv-Yafo'}`}>
                  <img
                    src='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&im_w=240'
                    alt=''
                  />
                </Link>
                <div className='city'>
                  <h6>Tel Aviv-Yafo</h6>
                  <p>Israel</p>
                </div>
              </div>
              <div>
                <Link to={`/explore?city=${'Jerusalem'}`}>
                  <img
                    src='https://a0.muscache.com/im/pictures/7253e011-7c22-48fd-b75d-d0da35372397.jpg?im_q=medq&im_w=240'
                    alt=''
                  />
                </Link>
                <div className='city'>
                  <h6>Jerusalem</h6>
                  <p>Israel</p>
                </div>
              </div>
              <div>
                <Link to={`/explore?city=${'London'}`}>
                  <img
                    src='https://a0.muscache.com/im/pictures/52e8083e-2de2-446d-a860-534eab250541.jpg?im_q=medq&im_w=240'
                    alt=''
                  />
                </Link>
                <div className='city'>
                  <h6>London</h6>
                  <p>England</p>
                </div>
              </div>
              <div>
                <Link to={`/explore?city=${'New York'}`}>
                  <img
                    src='https://a0.muscache.com/im/pictures/20e74de0-0eb8-4fca-afb8-b111875acdf5.jpg?im_q=medq&im_w=240'
                    alt=''
                  />
                </Link>
                <div className='city'>
                  <h6>New-York</h6>
                  <p>United States</p>
                </div>
              </div>
              <div>
                <Link to={`/explore?city=${'Barcelona'}`}>
                  <img
                    src='https://a0.muscache.com/im/pictures/e639b7ab-aee3-48ee-9743-216684a51319.jpg?im_q=medq&im_w=240'
                    alt=''
                  />
                </Link>
                <div className='city'>
                  <h6>Barcelona</h6>
                  <p>Spain</p>
                </div>
              </div>
              <div>
                <Link to={`/explore?city=${'Los Angeles'}`}>
                  <img
                    src='https://a0.muscache.com/im/pictures/ca3737ef-0faf-46ba-b055-b4a2d99e2cea.jpg?im_q=medq&im_w=240'
                    alt=''
                  />
                </Link>
                <div className='city'>
                  <h6>Los Angeles</h6>
                  <p>United States</p>
                </div>
              </div>
              <div>
                <Link to={`/explore?city=${'Paris'}`}>
                  <img
                    src='https://a0.muscache.com/im/pictures/585d1e53-e2e1-4baf-a34e-36301dd1e2da.jpg?im_q=medq&im_w=240'
                    alt=''
                  />
                </Link>
                <div className='city'>
                  <h6>Paris</h6>
                  <p>France</p>
                </div>
              </div>
              <div>
                <Link to={`/explore?city=${'Amsterdam'}`}>
                  <img
                    src='https://a0.muscache.com/im/pictures/7c309a70-bc93-4603-8d3b-9d4cd9bf75b2.jpg?im_q=medq&im_w=240'
                    alt=''
                  />
                </Link>
                <div className='city'>
                  <h6>Amsterdam</h6>
                  <p>Netherlands</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>Live anywhere</h3>
          <div className='anywhere'>
            <div>
              <Link to='/explore'>
                {' '}
                <img
                  src='https://a0.muscache.com/im/pictures/2f13349d-879d-43c6-83e3-8e5679291d53.jpg?im_w=320'
                  alt=''
                />
                <h4>Outdoor getaways</h4>
              </Link>
            </div>
            <div>
              <Link to='/explore'>
                <img
                  src='https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=320'
                  alt=''
                />
                <h4>Unique stays</h4>
              </Link>
            </div>
            <div>
              <Link to='/explore'>
                <img
                  src='https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=320'
                  alt=''
                />
                <h4>Entire homes</h4>
              </Link>
            </div>
            <div>
              <Link to='/explore'>
                <img
                  src='https://a0.muscache.com/im/pictures/10a638e1-6aff-4313-8033-1275cec83987.jpg?im_w=320'
                  alt=''
                />
                <h4>Pets allowed</h4>
              </Link>
            </div>
          </div>
          <div className='Outdoor-getaways'>
            <h4></h4>
          </div>
          <div className='want-to-be-host'>
            <img
              src='https://res.cloudinary.com/dohqnraie/image/upload/v1633442777/5b4dc94a-0b4c-4c27-b50f-9c5a5b93c775_eq7kar.webp'
              alt=''
            />
            <div className='text-on-img'>
              <h1>Try hosting</h1>
              <p>Try hosting Earn extra income and unlock new</p>
              <p>opportunities by sharing your space.</p>
              <button>Learn more</button>
            </div>
          </div>
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
  onAddStay,
  onRemoveStay,
  onUpdateStay,
  changePage,
};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage);
