import React from 'react';
import { loadStays } from "../store/stay.actions.js";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {PriceSlider} from './PriceSlider.jsx';
class _DropDownStayPrice extends React.Component {
  state = {
    price:[200, 500],
    valuetext:'0',
    minPrice:50,
    maxPrice:1920
    // filterBy: {
    //   price: ''
    // }
  };


  handleChange = (ev) => {
        // console.log('state in the start of handle change', this.state);
        // console.log('event in the start of handle change', ev);
       const minPrice = ev.target.value[0]
       const maxPrice = ev.target.value[1]
       this.setState({minPrice}, ()=>{

         this.props.onSetFrontFilter('price', {minPrice, maxPrice})
       })

       this.setState({maxPrice}, ()=>{

        this.props.onSetFrontFilter('price', {minPrice, maxPrice})
        })
        // const field = ev.target.name;
        // const value = ev.target.value;
        // console.log('ev.target.value', ev.target.value);
        // console.log('ev.target.value-min', ev.target.value[0]);
        // console.log('ev.target.value-max', ev.target.value[1]);
        // this.setState({ ...this.state, [field]: value });
        // console.log('state in the end of handle change', this.state);
      };
  

  render() {
    // const { stays} = this.props;
    const { filterBy, price, valuetext} = this.state
    const { left } = this.props.modalPos;
    return (
      <div className='drop-down-stay-price'  style={{ left }}>

        <PriceSlider 
        // value={[100, 500]}
         min={this.state.minPrice}
         max={this.state.maxPrice}
        // getAriaLabel={() => 'Minimum distance'}
        value={price}
        handleChange={this.handleChange}
        // valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
        // disableSwap
        // defaultValue={30}
        
        />
        <div className='price-range price-min'>min price: ${this.state.minPrice} </div>
        <div  className='price-range price-max'>max price: ${this.state.maxPrice}</div>

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

export const DropDownStayPrice = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DropDownStayPrice);