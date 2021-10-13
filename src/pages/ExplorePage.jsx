import React from 'react';
import { connect } from 'react-redux';
import { StayList } from '../cmps/StayList';
import { loadStays, filterStays } from '../store/stay.actions.js';
import { changePage, setModalPos } from '../store/page.actions.js';
import { DateRange } from '../cmps/DateRange';
import { Loader } from '../cmps/Loader';
import { DropDownStayType } from '../cmps/DropDownStayType';
import { DropDownPropertyType } from '../cmps/DropDownPropertyType';
import { DropDownAmenities } from '../cmps/DropDownAmenities';
import { DropDownStayPrice } from '../cmps/DropDownStayPrice';
import { stayService } from '../services/stay.service';

class _ExplorePage extends React.Component {
  state = {
    stays: [],
    filterBy: {
      city: '',
      // type: '',
      // propertyType: '',
      // price: ''
    },
    frontFilter: {},

    bottom: null,
    left: null,
    isStayTypeShown: false,
    isPropertyTypeShown: false,
    isAmenitiesShown: false,
    isDropDownPriceShown: false,
    isLoaded: false,
  };

  async componentDidMount() {


    window.scrollTo(0, 0);
    this.props.changePage('explore');
    const city = this.urlParamCity;

    // await this.props.loadStays(city);
    const filterBy = { city: city };//city filter
    await this.props.loadStays(filterBy);

    this.setState((prevstate) => ({
      isLoaded: true,
      filterBy: { ...prevstate.filterBy, city },
    }));
    const { stays } = this.props;
    this.setState({ stays });
    this.onClearFrontFilter();
  }

  get urlParamCity() {
    console.log('this.props.location.search', this.props.location);
    const urlSrcPrm = new URLSearchParams(this.props.location.search);
    return urlSrcPrm.get('city');
    // return urlSrcPrm.get('city, checkIn, checkOut');
  }
  staysToDisplay = () => {
    // const { stays } = this.props;
    const { stays } = this.state;
    const city = this.urlParamCity;
    if (!city) return stays;
    this.props.loadStays(city);
  };

  onFilterBy = () => {
    const { city } = this.state.filterBy;
    this.setState((prevstate) => ({
      isLoaded: true,
      filterBy: { ...prevstate.filterBy, city },
    }));
  };



  onSetFrontFilter = (filterKey, value) => {
    console.log('onSetFrontFilter');
    console.log('filterKey:', filterKey);
    console.log('value:', value);
    this.setState({ ...this.state, stays: this.props.stays })
    const { stays, frontFilter } = this.state;
    if (frontFilter[filterKey] === value) value = ''
    
    this.setState({ frontFilter: { ...this.state.frontFilter, [filterKey]: value } },
      () => {
        console.log('frontFilter in onSetFrontFilter', frontFilter);
        const staysToDisplay = stayService.queryFront(this.props.stays, this.state.frontFilter)
        console.log('staysToDisplay: ', staysToDisplay);
        this.setState({ ...this.state, stays: staysToDisplay }, () => {
        })

      }
    )

  }

  onClearFrontFilter = () => {
    console.log('onClearFrontFilter');
    this.setState({
      frontFilter: {
        stayType: '',
        type: '',
        price: {
          min: 0,
          max: Infinity
        },
        amenities: {
          "TV": false,
          "Wifi": false,
          "Kitchen": false,
          "Pets allowed": false,
          "Cooking basics": false,
          "Smoking allowed": false

        }
      }
    })
  }

  componentWillUnmount() {
    this.setState({ isLoaded: false });
  }

  onChange = (ranges) => {
    alert('changed check the console log');
    console.log(ranges);
  };

  render() {
    // const { stays } = this.props;
    const { city } = this.state.filterBy;
    const { stays } = this.state;
    const { bottom, left } = this.state;
    const {
      isSaved,
      isLoaded,
      isStayTypeShown,
      isPropertyTypeShown,
      isAmenitiesShown,
      isDropDownPriceShown
    } = this.state;
    if(!stays||!stays.length) return  <Loader />
    // if (!isLoaded || !this.props.stays.length) return <Loader />;
    return (
      <section className='explore-page main-container'>
        <p className='stays-num'>{stays.length} stays</p>
        {city? <h1>Stays in <span className="city-title">{city}</span></h1>: <h1>Find a place to stay </h1>}
        <section className='stay-filter'>
          <button
            onClick={(ev) => {
              const { left } = ev.target.getBoundingClientRect()
              this.props.setModalPos({ left })
              console.log(ev.target.getBoundingClientRect()
              );
              this.setState({
                isStayTypeShown: !isStayTypeShown,
              });
            }}

          >
            Type of place
          </button>
          {isStayTypeShown && <DropDownStayType onSetFrontFilter={this.onSetFrontFilter} />}
          <button
            onClick={(ev) => {
              const { left } = ev.target.getBoundingClientRect()
              this.props.setModalPos({ left })
              console.log(ev.target.getBoundingClientRect()

              );
              this.setState({
                isPropertyTypeShown: !isPropertyTypeShown,
              });
            }}
          >
            Property type
          </button>
          {isPropertyTypeShown && <DropDownPropertyType onSetFrontFilter={this.onSetFrontFilter} />}
          <button
            onClick={(ev) => {
              const { left } = ev.target.getBoundingClientRect()
              this.props.setModalPos({ left })
              this.setState({
                isDropDownPriceShown: !isDropDownPriceShown,
              });
            }}

          >Price</button>
          {isDropDownPriceShown && <DropDownStayPrice onSetFrontFilter={this.onSetFrontFilter}/>}
          <button
            onClick={(ev) => {
              const { left } = ev.target.getBoundingClientRect()
              this.props.setModalPos({ left })
              this.setState({
                isAmenitiesShown: !isAmenitiesShown,
              });
            }}
          >
            Amenities
          </button>
          {isAmenitiesShown && <DropDownAmenities onSetFrontFilter={this.onSetFrontFilter} />}
          <button
            onClick={() => {
              this.setState({ ...this.state, stays: this.props.stays })
              // this.onClearFrontFilter()
              // const filterBy = {};
              // this.props.loadStays(this.state.filterBy);
            }}
          >
            Clear
          </button>
        </section>
        <StayList stays={stays} />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    stays: state.stayModule.stays,
    filterBy: state.stayModule.filterBy,
  };
}

const mapDispatchToProps = {
  loadStays,
  filterStays,
  changePage,
  setModalPos
};

export const ExplorePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ExplorePage);
