import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { onSetCurrStay } from '../store/stay.actions';

import { StayPreview } from '../cmps/StayPreview.jsx';
import {Loader} from '../cmps/Loader.jsx'
export class _StayList extends React.Component {

  setStay = async (stayId) => {
    await this.props.onSetCurrStay(stayId);
  };

  render() {
    
    const { stays } = this.props;
    if(!stays||!stays.length) return <Loader/>  
    console.log('stay in stayList', stays);
    return (
      <div className='stay-list'>
        {stays.map((stay) => (
          <span key={stay._id} onClick={() => this.setStay(stay._id)}>
            <Link key={stay._id} to={`/stay/${stay._id}`}>
              <StayPreview key={stay._id} stay={stay} />
            </Link>
          </span>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  onSetCurrStay,
};

export const StayList = connect(mapStateToProps, mapDispatchToProps)(_StayList);
