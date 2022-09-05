import React, { Component } from 'react';
import FoodCard from './FoodCard';
import LinearProgress from '@mui/material/LinearProgress';
import DBRequest from '../lib/api'
// import {foods} from '../lib/foodData'

class FoodCards extends Component {
	state = { 
		foods: [this.props.foods],
		categories: []
	 } 

	 async componentDidMount(){
		// const promise = DBRequest.get("/metadata/?search=Restaurant SignUp&limit=0");
		// const response = await promise;
		// let restaurants = []
		// response.data.map(restau => 
		// 	restaurants.push(restau.metadata)
		// )
		// console.log("Test:", this.state.foods)

		let categoriesArray =	this.props.foods.map(food => 
			food.category
		)
		
		
		this.setState({foods: this.props.foods})
		this.setState({categories: [... new Set(categoriesArray)]})
	}


	render() { 
		if(this.state.foods.length === 0){
			return (
				<React.Fragment>
					<div className="center-container">
						Loading Foods
					</div>
					<LinearProgress  style={{width: 345, margin:'20px auto'}}/>
				</React.Fragment>)
		}

		// console.log(this.state.categories)

		return (
				<div className="center-container" style={{flexWrap: 'wrap', textAlign: 'center'}}>

					{this.state.categories.map(category => {

				

						
						return (
							<div className="container">
							
									<h3>{category}</h3>
							<div className="row">
							{this.state.foods.filter((food) => food.category == category).map(food => 
							<div>
							<FoodCard 
								key={food.id}
							
								food={food}
									/>
								</div>
						)}
						</div>
						</div>
						)
						
						
	})}

				
				</div>
		);
	}
}
 
export default FoodCards;