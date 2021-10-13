import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class ImgSlider extends Component {
  render() {
    const { stay } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div className='container'>
        <Slider className='main-slider' {...settings}>
          <div className='slider-img-div'>
            <img className='slider-img' src={stay.imgUrls[0]} />
          </div>
          <div className='slider-img-div'>
            <img className='slider-img' src={stay.imgUrls[1]} />
          </div>
          <div className='slider-img-div'>
            <img className='slider-img' src={stay.imgUrls[2]} />
          </div>
          <div className='slider-img-div'>
            <img className='slider-img' src={stay.imgUrls[3]} />
          </div>
          <div className='slider-img-div'>
            <img className='slider-img' src={stay.imgUrls[4]} />
          </div>
        </Slider>
      </div>
    );
  }
}
