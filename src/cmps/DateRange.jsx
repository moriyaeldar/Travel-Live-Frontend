import React from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { connect } from 'react-redux';

export class _DateRange extends React.Component {
  state = {
    startDate: Date.now(),
    endDate: Date.now(),
  };
  handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    this.setState({ startDate, endDate }, () => {
      this.props.setDates(startDate, endDate);
    });
  };
  render() {
    const { startDate, endDate } = this.state;
    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    };
    const { left, top } = this.props.relativePos;

    return (
      <div className='date-range-container' style={{ left, top }}>
        <DateRangePicker
          className='date-range'
          ranges={[selectionRange]}
          onChange={this.handleSelect}
          months={1}
          direction='horizontal'
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
        />
        <button
          className='date-range-close-btn'
          type='button'
          onClick={this.props.toggleDateCmp}
        >
          Close
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    relativePos: state.pageModule.relativePos,
  };
}
const mapDispatchToProps = {};

export const DateRange = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DateRange);
