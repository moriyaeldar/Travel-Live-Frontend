import React, { isValidElement } from 'react';
import { loadStays } from "../store/stay.actions.js";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
class _DropDownAmenities extends React.Component {
  state = {
    // filterBy: {
    //   amenities: []
    // },
    TV: false,
    Wifi: false,
    Kitchen:false,
    'Pets allowed': false,
    'Cooking basics': false,
    'Smoking allowed': false
  };

  // toggleAmenity = () => {
  //   const {isTV, isWifi, isKitchen, isPetsAllowed, isCookingBasics, isSmokingAllowed } = this.state
  //   const amenities = []
    

  // }


  render() {
    // const { stays } = this.props;
    
    const {TV, Wifi, Kitchen } = this.state
    const { left } = this.props.modalPos;
    return (
      <div className='drop-down-amenity' style={{ left }}>
        <ul >
          <li className={`li-type-item ${TV && 'amenity-active'}`} onClick={() => {
                    this.setState({
                      TV: !this.state.TV
                    }, ()=>{this.props.onSetFrontFilter('amenities' ,this.state)});
                  }}
          >
            TV

          </li>
          <li className={`li-type-item ${Wifi && 'amenity-active'}`} onClick={() => {
                    this.setState({
                      Wifi: !this.state.Wifi
                    }, ()=>{this.props.onSetFrontFilter('amenities',this.state)});
                  }}
          >
            Wifi

          </li>
          <li className={`li-type-item ${Kitchen && 'amenity-active'}`} onClick={() => {
                    this.setState({
                      Kitchen: !this.state.Kitchen
                    }, ()=>{this.props.onSetFrontFilter('amenities', this.state)});
                  }}
          >
           Kitchen

          </li>
          <li className={`li-type-item ${this.state['Pets allowed'] && 'amenity-active'}`} onClick={() => {
                    this.setState({
                      'Pets allowed': !this.state['Pets allowed']
                    }, ()=>{this.props.onSetFrontFilter('amenities', this.state)});
                  }}
          >
            Pets allowed

          </li>
          <li className={`li-type-item ${this.state['Cooking basics'] && 'amenity-active'}`} onClick={() => {
                    this.setState({
                      'Cooking basics': !this.state['Cooking basics']
                    }, ()=>{this.props.onSetFrontFilter('amenities', this.state)});
                  }}
          >
            Cooking basics

          </li>
          <li className={`li-type-item ${this.state['Smoking allowed'] && 'amenity-active'}`} onClick={() => {
                    this.setState({
                      'Smoking allowed': !this.state['Smoking allowed']
                    }, ()=>{this.props.onSetFrontFilter('amenities',this.state)});
                  }}
          >
           Smoking allowed

          </li>


        </ul>

      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    stays: state.stayModule.stays,
    filterBy: state.stayModule.filterBy,
    modalPos: state.pageModule.modalPos,
  };
}

const mapDispatchToProps = {
  loadStays
};

export const DropDownAmenities = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DropDownAmenities);