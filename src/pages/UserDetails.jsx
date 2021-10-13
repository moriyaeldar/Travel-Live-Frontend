import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAndWatchUser } from '../store/user.actions';
import { changePage } from '../store/page.actions.js';
export class _UserDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.changePage('user');
  }

  render() {
    return (
      <section className='user-details main-container'>
        <h1>User Details</h1>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = {
  changePage,
};

export const UserDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_UserDetails);
