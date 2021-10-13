import React from 'react';
import { loadStays } from '../store/stay.actions.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class _DropDownStayType extends React.Component {
  state = {
    filterBy: {
      stayType: '',
    },
  };

  componentDidMount() {}

  SetFilterStayType = (type) => {
    console.log('SetFilterStayType');
    const { stays } = this.props;
    console.log(' stays in dropdowntype', stays);
    return stays.filter((stay) => {
      return stay.stayType === type;
    });
    // const staysToDisplay=stays.filter((stay)=>{
    //   return stay.stayType===type;
    // })
    // const { filterBy } = this.state
    // let filterBy={stayType: type};

    // this.setState((prevstate) => ({ filterBy: { ...prevstate.filterBy, stayType: stayType } }))
    // this.props.loadStays(filterBy)---
  };

  render() {
    const { modalPos, onSetFrontFilter } = this.props;
    const { left } = this.props.modalPos;
    const { filterBy } = this.state;
    console.log('this.props.modalPos in stayType', this.props.modalPos);
    return (
      <div className='drop-down-stay-type' style={{ left }}>
        <ul>
          <li
            className='li-type-item'
            onClick={() => {
              onSetFrontFilter('stayType', 'Entire place');
            }}
          >
            Entire Place
          </li>
          {/* <li className='li-type-item' onClick={() => {
                   this.setState((prevstate) => ({  filterBy:{...prevstate.filterBy, stayType:'Entire Place'} }), ()=>{
                       this.props.loadStays(filterBy)
                     
                       
                   });
                  }}>
                Entire Place
                
                </li>  */}

          {/* <li className='li-type-item' onClick={() => {
                    this.setState((prevstate) => ({  filterBy:{...prevstate.filterBy, stayType:'Private Room'} }), ()=>{
                        this.props.loadStays(filterBy)
                        
                    });
                  }}
                
                >
                
                Private Room
                </li> */}
          <li
            className='li-type-item'
            onClick={() => {
              onSetFrontFilter('stayType', 'Private room');
              // this.SetFilterStayType('Private Room')
            }}
          >
            Private Room
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
  loadStays,
};

export const DropDownStayType = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DropDownStayType);
