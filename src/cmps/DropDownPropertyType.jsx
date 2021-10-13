import React from 'react';
import { loadStays } from "../store/stay.actions.js";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
class _DropDownPropertyType extends React.Component {
  state = {
    filterBy: {
      type: ''
    }
  };

  SetFilterStayType = (type) => {

    // const { filterBy } = this.state
    let filterBy = { type: type };

    // this.setState((prevstate) => ({ filterBy: { ...prevstate.filterBy, stayType: stayType } }))
    this.props.loadStays(filterBy)



  }

  render() {
    const { stays, onSetFrontFilter } = this.props;
    const { left } = this.props.modalPos;
    const { filterBy } = this.state
    return (
      <div className='drop-down-property-type' style={{ left }}>
        <ul >

          <li className='li-type-item' onClick={() => {

            onSetFrontFilter('type', 'Apartment')
          }}>
            Appartment

          </li>
          {/* <li className='li-type-item' onClick={() => {

            onSetFrontFilter('type', 'GuestHouse')
          }}>
            GuestHouse

          </li> */}
          <li className='li-type-item' onClick={() => {

            onSetFrontFilter('type', 'Studio')
          }}>
            Studio

          </li>
          <li className='li-type-item' onClick={() => {

            onSetFrontFilter('type', 'Loft')
          }}>
            Loft

          </li>
          {/* <li className='li-type-item' onClick={() => {

            onSetFrontFilter('type', ' Private Home')
          }}>
            Private Home

          </li> */}
          <li className='li-type-item' onClick={() => {

            onSetFrontFilter('type', 'Room')
          }}>
            Room

          </li>
          <li className='li-type-item' onClick={() => {

            onSetFrontFilter('type', 'Villa')
          }}>
            Villa

          </li>


          {/* <li className='li-type-item' onClick={() => {
                   this.setState((prevstate) => ({  filterBy:{...prevstate.filterBy, type:'Appartment'} }), ()=>{
                       this.props.loadStays(filterBy)
                     
                       
                   });
                  }}>
                Appartment
                
                </li>  */}


          {/* <li className='li-type-item' onClick={() => {
            this.setState((prevstate) => ({ filterBy: { ...prevstate.filterBy, type: 'GuestHouse' } }), () => {
              this.props.loadStays(filterBy)

            });
          }}

          >

            GuestHouse
          </li> */}


        </ul>

      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    stays: state.stayModule.stays,
    filterBy: state.stayModule.filterBy,
    modalPos: state.pageModule.modalPos
  };
}

const mapDispatchToProps = {
  loadStays
};

export const DropDownPropertyType = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DropDownPropertyType);