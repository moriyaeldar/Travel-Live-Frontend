import React from 'react';
import { connect } from 'react-redux';
import { onAddStay, onUpdateStay } from '../store/stay.actions';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from 'cloudinary-react';
import { Cloudinary } from 'cloudinary-core';
import { uploadImg } from '../services/cloudinary-service.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark,
  faBookOpen,
  faExternalLinkAlt,
  faHome,
  faMedal,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

export class _AddStay extends React.Component {
  state = {
    stay: {
      title: '',
      price: 0,
      type: 'Apartment',
      capacity: '',
      city: '',
      desc: '',
      stayType: 'Entire place',
      imgUrls: [],
      amenities: [],
      avgReviewRating: 4.9,
      loc: {
        country: 'France',
        countryCode: 'FR',
        address: '',
        lat: 48.864716,
        lng: 2.349014,
      },
    },
    tv: false,
    wifi: false,
    kitchen: false,
    smokingAllowed: false,
    petsAllowed: false,
    cookingBasics: false,
  };

  // amenities:{
  //   tv: false,
  //   wifi: false,
  //   kitchen: false,
  //   smokingAllowed: false,
  //   petsAllowed: false,
  //   cookingBasics: false,
  // }

  componentDidMount() {
    if (this.props.stay) {
      const stayToSave = this.props.stay[0];
      if (
        stayToSave.amenities.length > 0 &&
        stayToSave.amenities.includes('TV')
      ) {
        this.setState({ tv: true });
      }
      if (
        stayToSave.amenities.length > 0 &&
        stayToSave.amenities.includes('Wifi')
      ) {
        this.setState({ wifi: true });
      }
      if (
        stayToSave.amenities.length > 0 &&
        stayToSave.amenities.includes('Kitchen')
      ) {
        this.setState({ kitchen: true });
      }
      if (
        stayToSave.amenities.length > 0 &&
        stayToSave.amenities.includes('Smoking allowed')
      ) {
        this.setState({ smokingAllowed: true });
      }
      if (
        stayToSave.amenities.length > 0 &&
        stayToSave.amenities.includes('Pets allowed')
      ) {
        this.setState({ petsAllowed: true });
      }
      if (
        stayToSave.amenities.length > 0 &&
        stayToSave.amenities.includes('Cooking basics')
      ) {
        this.setState({ cookingBasics: true });
      }
      this.setState({ stay: this.props.stay[0] });
    }
  }

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;

    this.setState({ stay: { ...this.state.stay, [field]: value } });
  };
  handleAddressChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;

    this.setState(
      {
        stay: {
          ...this.state.stay,
          loc: { ...this.state.stay.loc, [field]: value },
        },
      },
      () => {
        console.log('updated address:', this.state.stay.loc);
      }
    );
  };

  handleChangeArray = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState({ ...this.state, amenities: [value] });
    // console.log('state in the end of handle change', this.state);
  };
  // imgUrls: [value],
  handleImgChange = async (ev) => {
    console.log('inHandelImg-start', this.state);

    const field = ev.target.name;
    try {
      const value = await uploadImg(ev);
      const { imgUrls } = this.state.stay;
      imgUrls.push(value);
      this.setState((prevState) => ({ ...prevState.stay, imgUrls }));
      console.log('inHandelImg', this.state);
    } catch (err) {
      console.log(err);
    }
  };

  handleChangeSelect = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState(
      (prevState) => ({
        stay: { ...prevState.stay, [field]: value },
      }),
      () => {
        console.log(this.state.stay);
        // this.props.onAddStay(this.state.stay)
      }
    );
    // console.log(ev.target.value);
  };

  handleAmenityChange = (ev) => {
    const field = ev.target.name;

    switch (field) {
      case 'tv':
        this.setState({ tv: !this.state.tv });
        break;
      case 'kitchen':
        this.setState({ kitchen: !this.state.kitchen });
        break;
      case 'wifi':
        this.setState({ wifi: !this.state.wifi });
        break;
      case 'petsAllowed':
        this.setState({ petsAllowed: !this.state.petsAllowed });
        break;
      case 'cookingBasics':
        this.setState({ cookingBasics: !this.state.cookingBasics });
        break;
      case 'smokingAllowed':
        this.setState({ smokingAllowed: !this.state.smokingAllowed });
        break;

      default:
        break;
    }
  };

  onAddStay = (ev) => {
    ev.preventDefault();
    // console.log('adding stay ');

    var amenityObj = [];
    if (this.state.tv) {
      amenityObj.push('TV');
    }
    if (this.state.kitchen) {
      amenityObj.push('Kitchen');
    }
    if (this.state.wifi) {
      amenityObj.push('Wifi');
    }
    if (this.state.petsAllowed) {
      amenityObj.push('Pets allowed');
    }
    if (this.state.cookingBasics) {
      amenityObj.push('Cooking basics');
    }
    if (this.state.smokingAllowed) {
      amenityObj.push('Smoking allowed');
    }
    console.log('stayin addStay !', this.state);
    this.setState(
      (prevState) => ({
        stay: { ...prevState.stay, amenities: amenityObj },
      }),
      () => {
        this.props.onAddStay(this.state.stay);
      }
    );
  };

  // this.clearState();

  onEditStay = (ev) => {
    ev.preventDefault();
    if (
      !this.state.stay.title ||
      !this.state.stay.price ||
      !this.state.stay.type
    )
      return;

    var amenityObj = [];
    if (this.state.tv) {
      amenityObj.push('TV');
    }
    if (this.state.kitchen) {
      amenityObj.push('Kitchen');
    }
    if (this.state.wifi) {
      amenityObj.push('Wifi');
    }
    if (this.state.petsAllowed) {
      amenityObj.push('Pets allowed');
    }
    if (this.state.cookingBasics) {
      amenityObj.push('Cooking basics');
    }
    if (this.state.smokingAllowed) {
      amenityObj.push('Smoking allowed');
    }
    this.setState(
      (prevState) => ({
        stay: { ...prevState.stay, amenities: amenityObj },
      }),
      () => {
        this.props.onUpdateStay(this.state.stay);
      }
    );
  };

  isChecked = () => {};
  clearState = () => {
    const clearTemplate = {
      stay: {
        title: '',
        price: 0,
        type: 'Apartment',
        capacity: '',
        city: '',
        desc: '',
        stayType: 'Entire place',
        imgUrls: [],
        amenities: [],
        loc: {
          country: 'United States',
          countryCode: 'US',
          address: 'New York, United States',
          lat: 40.66696007901832,
          lng: -73.93152486102896,
        },
      },
      tv: false,
      wifi: false,
      kitchen: false,
      smokingAllowed: false,
      petsAllowed: false,
      cookingBasics: false,
    };
    this.setState({ ...clearTemplate });
  };

  render() {
    const {
      title,
      price,
      type,
      imgUrls,
      amenities,
      capacity,
      city,
      stayType,
      desc,
    } = this.state.stay;
    // const { onAddStay } = this.props;
    const { tv, kitchen, wifi, smokingAllowed, cookingBasics, petsAllowed } =
      this.state;
    const { isEdit, stay, user } = this.props;
    return (
      <div>
        {/* <AddForm/> */}
        {!isEdit && (
          <form className='add-stay' onSubmit={this.onAddStay}>
            <div className='add-stay-form-header'>
              <p className='add-stay-title'>
                <input
                  type='text'
                  name='title'
                  id='stay-title'
                  value={title}
                  onChange={this.handleChange}
                  required
                  placeholder='Stay name'
                />
              </p>
              <div className='stay-short-info'>
                <div className='stay-short-info-details'>
                  <span className='stay-rate'>
                    <FontAwesomeIcon className='star' icon={faStar} />
                  </span>
                  <span>new</span> <p>( 0 reviews )</p>
                  <span className='span-dot'>·</span>
                  <p>
                    city:{' '}
                    <input
                      type='city'
                      name='city'
                      value={city}
                      onChange={this.handleChange}
                      id='stay-city'
                      required
                    ></input>
                  </p>
                  <p>
                    address:{' '}
                    <input
                      type='address'
                      name='address'
                      value={this.state.stay.loc.address}
                      onChange={this.handleAddressChange}
                      id='stay-address'
                      required
                    ></input>
                  </p>
                </div>
                <div className='action-btns'>
                  <a>
                    <FontAwesomeIcon
                      className='action-icon'
                      icon={faExternalLinkAlt}
                    />
                    Share
                  </a>
                  <a>
                    <FontAwesomeIcon className='action-icon' icon={faHeart} />
                    Save
                  </a>
                </div>
              </div>

              {/* <label htmlFor='stay-title'>Title:</label> */}
            </div>

            <section className='stay-gallery'>
              <div
                className='img-upload-container'
                style={{
                  backgroundImage: `url(${this.state.stay.imgUrls[0]})`,
                }}
              >
                <label className='img-upload-label'>
                  <p>Upload Image</p>

                  <input
                    type='file'
                    onChange={this.handleImgChange}
                    // console.log('first img');
                    // const imgArr = [...imgUrls];
                    // imgArr[0] = ev.target.files[0];
                    // const newArray = [...imgUrls];
                    // newArray.splice(0, 0, ev.target.files[0]);
                    // value={imgUrls[0]}
                    name='img'
                    placeholder='Enter img'
                    id='img'
                    className='img-upload-input'
                  />
                </label>
              </div>

              <div
                className='img-upload-container'
                style={{
                  backgroundImage: `url(${this.state.stay.imgUrls[1]})`,
                }}
              >
                <label className='img-upload-label'>
                  <p>Upload Image</p>
                  <input
                    type='file'
                    onChange={this.handleImgChange}
                    // value={imgUrls[1]}

                    //   const imgArr = [...imgUrls];
                    //   imgArr[1] = ev.target.files[0];
                    //   this.setState(
                    //     {
                    //       stay: {
                    //         ...this.state.stay,
                    //         imgUrls: [...imgArr],
                    //       },
                    //     },
                    //     () => {
                    //       console.log('second img');

                    //       console.log(this.state.stay);
                    //     }
                    //   );
                    // }}
                    name='img'
                    placeholder='Enter img'
                    id='img'
                    // defaultValue={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.settled.govt.nz%2Fblog%2Fbuying-property-during-covid-19-alert-level-3%2F&psig=AOvVaw0PJQPIghpayt2XDHkXu0Uy&ust=1633291390687000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjMtuDCrPMCFQAAAAAdAAAAABAD'} onChange={this.handleImgChange}
                    className='img-upload-input'
                  />
                </label>
              </div>

              <div
                className='img-upload-container'
                style={{
                  backgroundImage: `url(${this.state.stay.imgUrls[2]})`,
                }}
              >
                <label className='img-upload-label'>
                  <p>Upload Image</p>
                  <input
                    type='file'
                    onChange={this.handleImgChange}
                    // value={imgUrls[2]}

                    //   console.log('third img');

                    //   const imgArr = [...imgUrls];
                    //   imgArr[2] = ev.target.files[0];
                    //   this.setState(
                    //     {
                    //       stay: {
                    //         ...this.state.stay,
                    //         imgUrls: [...imgArr],
                    //       },
                    //     },
                    //     () => {
                    //       console.log(this.state.stay);
                    //     }
                    //   );
                    // }}
                    name='img'
                    placeholder='Enter img'
                    id='img'
                    // defaultValue={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.settled.govt.nz%2Fblog%2Fbuying-property-during-covid-19-alert-level-3%2F&psig=AOvVaw0PJQPIghpayt2XDHkXu0Uy&ust=1633291390687000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjMtuDCrPMCFQAAAAAdAAAAABAD'} onChange={this.handleImgChange}
                    className='img-upload-input'
                  />
                </label>
              </div>

              <div
                className='img-upload-container'
                style={{
                  backgroundImage: `url(${this.state.stay.imgUrls[3]})`,
                }}
              >
                <label className='img-upload-label'>
                  <p>Upload Image</p>
                  <input
                    type='file'
                    onChange={this.handleImgChange}
                    // value={imgUrls[3]}
                    //   console.log('fourth img');

                    //   const imgArr = [...imgUrls];
                    //   imgArr[2] = ev.target.files[0];
                    //   this.setState(
                    //     {
                    //       stay: {
                    //         ...this.state.stay,
                    //         imgUrls: [...imgArr],
                    //       },
                    //     },
                    //     () => {
                    //       console.log(this.state.stay);
                    //     }
                    //   );
                    // }}
                    name='img'
                    placeholder='Enter img'
                    id='img'
                    // defaultValue={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.settled.govt.nz%2Fblog%2Fbuying-property-during-covid-19-alert-level-3%2F&psig=AOvVaw0PJQPIghpayt2XDHkXu0Uy&ust=1633291390687000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjMtuDCrPMCFQAAAAAdAAAAABAD'} onChange={this.handleImgChange}
                    className='img-upload-input'
                  />
                </label>
              </div>

              <div
                className='img-upload-container'
                style={{
                  backgroundImage: `url(${this.state.stay.imgUrls[4]})`,
                }}
              >
                <label className='img-upload-label'>
                  <p>Upload Image</p>
                  <input
                    type='file'
                    onChange={this.handleImgChange}
                    // value={imgUrls[4]}
                    //   console.log('fifth img');
                    //   const imgArr = [...imgUrls];
                    //   imgArr[2] = ev.target.files[0];
                    //   this.setState(
                    //     {
                    //       stay: {
                    //         ...this.state.stay,
                    //         imgUrls: [...imgArr],
                    //       },
                    //     },
                    //     () => {
                    //       console.log(this.state.stay);
                    //     }
                    //   );
                    // }}
                    name='img'
                    placeholder='Enter img'
                    id='img'
                    // defaultValue={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.settled.govt.nz%2Fblog%2Fbuying-property-during-covid-19-alert-level-3%2F&psig=AOvVaw0PJQPIghpayt2XDHkXu0Uy&ust=1633291390687000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMjMtuDCrPMCFQAAAAAdAAAAABAD'} onChange={this.handleImgChange}
                    className='img-upload-input'
                  />
                </label>
              </div>
            </section>

            <section className='add-stay-info-container'>
              <div className='add-stay-info-details'>
                <div className='add-stay-info-details-header'>
                  <div>
                    <span>Capacity:</span>{' '}
                    <input
                      type='number'
                      name='capacity'
                      value={capacity}
                      onChange={this.handleChange}
                      required
                    />
                    <span>Stay Type:</span>
                    <select name='stayType' onChange={this.handleChangeSelect}>
                      <option value='Entire place'>Entire place</option>
                      <option value='Private room'>Private room</option>
                    </select>
                    <span>Property Type:</span>
                    <select
                      name='type'
                      onChange={this.handleChangeSelect}
                      value={type}
                    >
                      <option value='Apartment'>Apartment</option>
                      <option value='Villa'>Villa</option>
                      <option value='Studio'>Studio</option>
                      <option value='Loft'>Loft</option>
                      <option value='Room'>Room</option>
                    </select>
                  </div>
                  {/* <img className='host-img' src={user.imgUrl} /> */}
                </div>

                <div className='stay-features-container'>
                  <div className='stay-features-details'>
                    <FontAwesomeIcon icon={faHome} />
                    <div>
                      <h3>Entire Place</h3>
                      {/* <p>Entire Place</p> */}
                      <h4>You'll have the place to yourself.</h4>
                    </div>
                  </div>
                  <div className='stay-features-details'>
                    <FontAwesomeIcon icon={faBookOpen} />
                    <div>
                      <h3>House Rules</h3>
                      <h4>
                        {' '}
                        This place isn’t suitable for children under 12 and the
                        host doesn’t allow pets.
                      </h4>
                    </div>
                  </div>
                  <div className='stay-features-details'>
                    <FontAwesomeIcon icon={faMedal} />
                    <div>
                      <h3>{user.fullname} is A Superhost</h3>
                      <h4>
                        {' '}
                        Superhosts are experienced, highly rated hosts who are
                        committed to providing great stays for guests.
                      </h4>
                    </div>
                  </div>
                  <div className='stay-features-details'>
                    <FontAwesomeIcon icon={faBookmark} />
                    <div>
                      <h3>Wifi</h3>
                      <h4>Guests often search for this popular amenity</h4>
                    </div>
                  </div>
                </div>

                <div className='stay-desc-container'>
                  <p>Description</p>
                  <textarea
                    value={desc}
                    name='desc'
                    onChange={this.handleChange}
                    className='desc-textarea'
                  />
                </div>

                <div className='add-stay-amenities'>
                  <p>Amenities</p>

                  <div className='add-stay-amenities-item'>
                    <input
                      type='checkbox'
                      name='tv'
                      checked={tv}
                      onChange={this.handleAmenityChange}
                    />
                    <label for='TV'>TV</label>
                  </div>
                  <div className='add-stay-amenities-item'>
                    <input
                      type='checkbox'
                      name='wifi'
                      checked={wifi}
                      onChange={this.handleAmenityChange}
                    />
                    <label for='Wifi'>Wifi</label>
                  </div>
                  <div className='add-stay-amenities-item'>
                    <input
                      type='checkbox'
                      name='kitchen'
                      checked={kitchen}
                      onChange={this.handleAmenityChange}
                    />
                    <label for='Kitchen'>Kitchen</label>
                  </div>
                  <div className='add-stay-amenities-item'>
                    <input
                      type='checkbox'
                      name='smokingAllowed'
                      checked={smokingAllowed}
                      onChange={this.handleAmenityChange}
                    />
                    <label for='Smoking allowed'>Smoking allowed</label>
                  </div>
                  <div className='add-stay-amenities-item'>
                    <input
                      type='checkbox'
                      name='petsAllowed'
                      checked={petsAllowed}
                      onChange={this.handleAmenityChange}
                    />
                    <label for='Pets allowed'>Pet allowed</label>
                  </div>
                  <div className='add-stay-amenities-item'>
                    <input
                      type='checkbox'
                      name='cookingBasics'
                      checked={cookingBasics}
                      onChange={this.handleAmenityChange}
                    />
                    <label for='Cooking basics'>Cooking basics</label>
                  </div>
                </div>
              </div>

              <div className='add-stay-price-container'>
                <span>Price:</span>
                <input
                  type='number'
                  name='price'
                  value={price}
                  onChange={this.handleChange}
                  required
                />
                <span>/ night</span>
              </div>
            </section>

            <button className='add-stay-save-btn' type='submit'>
              Enter!
            </button>
          </form>
        )}
        {isEdit && (
          <form className='add-stay' onSubmit={this.onEditStay}>
            <div className='add-stay-form-header'>
              <p className='add-stay-title'>
                <input
                  type='text'
                  name='title'
                  id='stay-title'
                  value={title}
                  onChange={this.handleChange}
                  required
                  placeholder='Stay name'
                />
              </p>
              <div className='stay-short-info'>
                <div className='stay-short-info-details'>
                  <span className='stay-rate'>
                    <FontAwesomeIcon className='star' icon={faStar} />
                  </span>
                  <span>new</span> <p>( 0 reviews )</p>
                  <span className='span-dot'>●</span>
                  <p>
                    address:{' '}
                    <input
                      type='city'
                      name='city'
                      value={city}
                      onChange={this.handleChange}
                      id='stay-city'
                      required
                    ></input>
                  </p>
                </div>
                <div className='action-btns'>
                  <a>
                    <FontAwesomeIcon
                      className='action-icon'
                      icon={faExternalLinkAlt}
                    />
                    Share
                  </a>
                  <a>
                    <FontAwesomeIcon className='action-icon' icon={faHeart} />
                    Save
                  </a>
                </div>
              </div>
            </div>

            {/* <section className='stay-gallery'>
              <div
                className='img-upload-container'
                style={{ backgroundImage: imgUrls[0] }}
              >
                <label className='img-upload-label'>
                  <p>Upload Image</p>
                  <input
                    type='file'
                    onChange={(ev) => {
                      console.log('first img');
                      const imgArr = [...imgUrls];
                      imgArr[0] = ev.target.files[0];
                      // const newArray = [...imgUrls];
                      // newArray.splice(0, 0, ev.target.files[0]);
                      this.setState(
                        {
                          stay: {
                            ...this.state.stay,
                            imgUrls: [...imgArr],
                          },
                        },
                        () => {
                          console.log(this.state.stay);
                        }
                      );
                    }}
                    value={imgUrls[0]}
                    className='img-upload-input'
                  />
                </label>
              </div>

              <div
                className='img-upload-container'
                style={{ backgroundImage: imgUrls[0] }}
              >
                <label className='img-upload-label'>
                  <p>Upload Image</p>
                  <input
                    type='file'
                    value={imgUrls[1]}
                    onChange={(ev) => {
                      const imgArr = [...imgUrls];
                      imgArr[1] = ev.target.files[0];
                      this.setState(
                        {
                          stay: {
                            ...this.state.stay,
                            imgUrls: [...imgArr],
                          },
                        },
                        () => {
                          console.log('second img');

                          console.log(this.state.stay);
                        }
                      );
                    }}
                    className='img-upload-input'
                  />
                </label>
              </div>

              <div
                className='img-upload-container'
                style={{ backgroundImage: imgUrls[0] }}
              >
                <label className='img-upload-label'>
                  <p>Upload Image</p>
                  <input
                    type='file'
                    value={imgUrls[2]}
                    onChange={(ev) => {
                      console.log('third img');

                      const imgArr = [...imgUrls];
                      imgArr[2] = ev.target.files[0];
                      this.setState(
                        {
                          stay: {
                            ...this.state.stay,
                            imgUrls: [...imgArr],
                          },
                        },
                        () => {
                          console.log(this.state.stay);
                        }
                      );
                    }}
                    className='img-upload-input'
                  />
                </label>
              </div>

              <div
                className='img-upload-container'
                style={{ backgroundImage: imgUrls[0] }}
              >
                <label className='img-upload-label'>
                  <p>Upload Image</p>
                  <input
                    type='file'
                    value={imgUrls[3]}
                    onChange={(ev) => {
                      console.log('fourth img');

                      const imgArr = [...imgUrls];
                      imgArr[2] = ev.target.files[0];
                      this.setState(
                        {
                          stay: {
                            ...this.state.stay,
                            imgUrls: [...imgArr],
                          },
                        },
                        () => {
                          console.log(this.state.stay);
                        }
                      );
                    }}
                    className='img-upload-input'
                  />
                </label>
              </div>

              <div
                className='img-upload-container'
                style={{ backgroundImage: imgUrls[0] }}
              >
                <label className='img-upload-label'>
                  <p>Upload Image</p>
                  <input
                    type='file'
                    value={imgUrls[4]}
                    onChange={(ev) => {
                      console.log('fifth img');
                      const imgArr = [...imgUrls];
                      imgArr[2] = ev.target.files[0];
                      this.setState(
                        {
                          stay: {
                            ...this.state.stay,
                            imgUrls: [...imgArr],
                          },
                        },
                        () => {
                          console.log(this.state.stay);
                        }
                      );
                    }}
                    className='img-upload-input'
                  />
                </label>
              </div>
            </section> */}

            <section className='add-stay-info-container'>
              <div className='add-stay-info-details'>
                <div className='add-stay-info-details-header'>
                  <div>
                    <span>Capacity:</span>{' '}
                    <input
                      type='number'
                      name='capacity'
                      value={capacity}
                      onChange={this.handleChange}
                      required
                    />
                    <span>Stay Type:</span>
                    <select
                      name='stay-type'
                      value={stayType}
                      onChange={this.handleChangeSelect}
                      // value={stayType}
                    >
                      <option value='Entire place'>Entire place</option>
                      <option value='Private room'>Private room</option>
                    </select>
                    <span>Property Type:</span>
                    <select
                      name='property-type'
                      onChange={this.handleChangeSelect}
                      value={type}
                    >
                      <option value='Apartment'>Apartment</option>
                      <option value='Villa'>Villa</option>
                      <option value='Studio'>Studio</option>
                      <option value='Loft'>Loft</option>
                      <option value='Room'>Room</option>
                    </select>
                  </div>
                  {/* <img className='host-img' src={user.imgUrl} /> */}
                </div>

                <div className='stay-features-container'>
                  <div className='stay-features-details'>
                    <FontAwesomeIcon icon={faHome} />
                    <div>
                      <h3>Entire Place</h3>
                      <h4>You'll have the place to yourself.</h4>
                    </div>
                  </div>
                  <div className='stay-features-details'>
                    <FontAwesomeIcon icon={faBookOpen} />
                    <div>
                      <h3>House Rules</h3>
                      <h4>
                        {' '}
                        This place isn’t suitable for children under 12 and the
                        host doesn’t allow pets.
                      </h4>
                    </div>
                  </div>
                  <div className='stay-features-details'>
                    <FontAwesomeIcon icon={faMedal} />
                    <div>
                      <h3>{user.fullname} is A Superhost</h3>
                      <h4>
                        {' '}
                        Superhosts are experienced, highly rated hosts who are
                        committed to providing great stays for guests.
                      </h4>
                    </div>
                  </div>
                  <div className='stay-features-details'>
                    <FontAwesomeIcon icon={faBookmark} />
                    <div>
                      <h3>Wifi</h3>
                      <h4>Guests often search for this popular amenity</h4>
                    </div>
                  </div>
                </div>

                <div className='stay-desc-container'>
                  <p>Description</p>
                  <textarea
                    value={desc}
                    name='desc'
                    onChange={this.handleChange}
                    className='desc-textarea'
                  />
                </div>

                <div className='add-stay-amenities'>
                  <p>Amenities</p>

                  <div className='add-stay-amenities-item'>
                    <input
                      type='checkbox'
                      name='tv'
                      checked={tv}
                      onChange={this.handleAmenityChange}
                    />
                    <label for='TV'>TV</label>
                  </div>
                  <div className='add-stay-amenities-item'>
                    <input
                      type='checkbox'
                      name='wifi'
                      checked={wifi}
                      onChange={this.handleAmenityChange}
                    />
                    <label for='Wifi'>Wifi</label>
                  </div>
                  <div className='add-stay-amenities-item'>
                    <input
                      type='checkbox'
                      name='kitchen'
                      checked={kitchen}
                      onChange={this.handleAmenityChange}
                    />
                    <label for='Kitchen'>Kitchen</label>
                  </div>
                  <div className='add-stay-amenities-item'>
                    <input
                      type='checkbox'
                      name='smokingAllowed'
                      checked={smokingAllowed}
                      onChange={this.handleAmenityChange}
                    />
                    <label for='Smoking allowed'>Smoking allowed</label>
                  </div>
                  <div className='add-stay-amenities-item'>
                    <input
                      type='checkbox'
                      name='petsAllowed'
                      checked={petsAllowed}
                      onChange={this.handleAmenityChange}
                    />
                    <label for='Pets allowed'>Pet allowed</label>
                  </div>
                  <div className='add-stay-amenities-item'>
                    <input
                      type='checkbox'
                      name='cookingBasics'
                      checked={cookingBasics}
                      onChange={this.handleAmenityChange}
                    />
                    <label for='Cooking basics'>Cooking basics</label>
                  </div>
                </div>
              </div>

              <div className='add-stay-price-container'>
                <span>Price:</span>
                <input
                  type='number'
                  name='price'
                  value={price}
                  onChange={this.handleChange}
                  required
                />
                <span>/ night</span>
              </div>
            </section>

            <button className='add-stay-save-btn' type='submit'>
              Enter!
            </button>
            {/* <button type='submit'>Save!</button> */}
          </form>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stays: state.stayModule.stays,
  };
}

const mapDispatchToProps = {
  onAddStay,
  onUpdateStay,
  // onRemovehost,
  // loadhostsFromUser,
};

export const AddStay = connect(mapStateToProps, mapDispatchToProps)(_AddStay);
