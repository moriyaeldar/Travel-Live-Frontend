import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { onRemoveStay } from '../store/stay.actions';

export function _HostStayList({ stays, onEditStay, onRemoveStay, userId }) {
  stays = stays.filter((stay) => {
    return stay.host._id === userId;
  });
  console.log('stays in hostliststsays', stays);

  return (
    <div className='host-stay-list'>
      <table>
        <thead>
          <th>Name</th>
          <th>Type</th>
          <th>Price</th>
          <th>Actions</th>
        </thead>
        {stays.map((stay) => (
          <tr>
            <td>{stay.title}</td>
            <td>{stay.type}</td>
            <td>${stay.price}</td>{' '}
            <td>
              <button onClick={() => onRemoveStay(stay._id)}>Delete</button>
              <button onClick={() => onEditStay(stay._id)}>Edit</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    stays: state.stayModule.stays,
  };
}

const mapDispatchToProps = {
  onRemoveStay,
};

export const HostStayList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_HostStayList);
