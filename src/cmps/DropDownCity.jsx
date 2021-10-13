import React from 'react';

import { Link } from 'react-router-dom';
export class DropDownCity extends React.Component {
    state = {
        // locSearch: ''
        city:''
    };
    componentDidMount() {
      
    }


    render() {
        const {addCityToSearch} = this.props
        const {city} = this.state
  return (
    <div className='drop-down-city'>
        <ul >
                <li className='li-city-item'>
                  <img src='https://a0.muscache.com/im/pictures/20e74de0-0eb8-4fca-afb8-b111875acdf5.jpg?im_q=medq&im_w=240'/>
                <span onClick={()=>{
                  addCityToSearch('New York')
                  // this.setState({city: 'New York'})
                }}>
                      New York
                    </span>
                
                </li> 
                <li className='li-city-item' >
                <img src='https://a0.muscache.com/im/pictures/52e8083e-2de2-446d-a860-534eab250541.jpg?im_q=medq&im_w=240'/>
                <span  onClick={()=>{
                  // this.setState({city: 'London'})
                  addCityToSearch('London')
                }} >
                   London
                   </span>
                </li>

               
                  <li className='li-city-item' >
                  <img src='https://a0.muscache.com/im/pictures/7c309a70-bc93-4603-8d3b-9d4cd9bf75b2.jpg?im_q=medq&im_w=240'/>
                  <span  onClick={()=>{
                  // this.setState({addCityToSearch: ' Amsterdam'})
                  addCityToSearch('Amsterdam')
                }}>
                    Amsterdam
                    </span>
                  </li>
                

           
                  <li className='li-city-item' >
                  <img src='https://a0.muscache.com/im/pictures/ca3737ef-0faf-46ba-b055-b4a2d99e2cea.jpg?im_q=medq&im_w=240'/>
                  <span  onClick={()=>{
                  // this.setState({addCityToSearch: 'Los Angeles'})
                  addCityToSearch('Los Angeles')
                }}>
                     Los Angeles
                     </span>
                  </li>
                  <li className='li-city-item' >
                  <img src='https://a0.muscache.com/im/pictures/e639b7ab-aee3-48ee-9743-216684a51319.jpg?im_q=medq&im_w=240'/>
                  <span  onClick={()=>{
                  // this.setState({addCityToSearch: 'Los Angeles'})
                  addCityToSearch('Barcelona')
                }}>
                     Barcelona
                     </span>
                  </li>
                  <li className='li-city-item' >
                  <img src='https://a0.muscache.com/im/pictures/585d1e53-e2e1-4baf-a34e-36301dd1e2da.jpg?im_q=medq&im_w=240'/>
                  <span  onClick={()=>{
                  // this.setState({addCityToSearch: 'Los Angeles'})
                  addCityToSearch('Paris')
                }}>
                     Paris
                     </span>
                  </li>
                  <li className='li-city-item' >
                  <img src='https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&im_w=240'/>
                  <span  onClick={()=>{
                  // this.setState({addCityToSearch: 'Los Angeles'})
                  addCityToSearch('Tel Aviv-Yafo')
                }}>
                     Tel Aviv-Yafo
                     </span>
                  </li>
                  <li className='li-city-item' >
                  <img src='https://a0.muscache.com/im/pictures/7253e011-7c22-48fd-b75d-d0da35372397.jpg?im_q=medq&im_w=240'/>
                  <span  onClick={()=>{
                  // this.setState({addCityToSearch: 'Los Angeles'})
                  addCityToSearch('Jerusalem')
                }}>
                     Jerusalem
                     </span>
                  </li>
                
              </ul>
      
    </div>

  );
    }
}