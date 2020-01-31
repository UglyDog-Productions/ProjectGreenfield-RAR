/* eslint-disable react/jsx-no-bind */
// bassed on radio button clicked fill in stars
import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class NewReviewStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({
      rating: nextValue,
    });
  }

  render() {
    const { rating } = this.state;
    return (
      <div>
        <StarRatingComponent
          name="newReviewStar"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

export default NewReviewStar;
/*  */