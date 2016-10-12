import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import RatingItem from '../components/RatingItem'
import { bindActionCreators } from 'redux';
import {fetchAllRatings} from '../actions/actions_ratings'

class RatingList extends Component {

  constructor (props) {
		super(props)

    this.ratingList = this.ratingList.bind(this)
  }

  ratingList() {
    if(Array.isArray(this.props.ratingList.data)) {
      sessionStorage.setItem('review_on', this.props.ratingList.data.shift())

      let results = this.props.ratingList.data.reverse();

      return results.map( (rating) => {
        return (
          <RatingItem
            key={rating[0].id}
            stars={rating[0].star}
            review = {rating[0].review}
            reviewer = {rating[0].reviewed_by}
          />
        )
      })
    }
  }

  render() {
    return (
        <div className='rating-container'>
          {this.ratingList()}
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ratingList: state.ratings.ratingList
  };
}


//Promote bookList from a component to a containers - it needs to  know abut this new dispatch method, selectBook. Make is available as a prop.
export default connect(mapStateToProps,{fetchAllRatings:fetchAllRatings})(RatingList);
