import React, { Component } from 'react';
import RestaurantCard from './RestaurantCard';
import LinearProgress from '@mui/material/LinearProgress';
import DBRequest from '../lib/api'

class RestaurantCards extends Component {

	render() { 
		if(this.props.restaurants.length === 0){
			return (
				<React.Fragment>
					<div className="center-container">
						Loading Restaurants
					</div>
					<LinearProgress  style={{width: 345, margin:'20px auto'}}/>
				</React.Fragment>)
		}

		return (
				<div className="center-container" style={{flexWrap: 'wrap', textAlign: 'center'}}>
					{this.props.restaurants.map(restau => 
						<RestaurantCard 
						// temporary to make keys unique because I added 2 transactions with the same restau id.
							key={restau.id + restau.name}
							restauId={restau.id}
							name={restau.name}
							description={restau.description}
							address={restau.address}
							image={restau.image}  />
					)}
				</div>
		);
	}
}
 
export default RestaurantCards;