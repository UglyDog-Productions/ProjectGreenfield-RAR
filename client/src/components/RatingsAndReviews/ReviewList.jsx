/* eslint-disable */

// the review List and functionality of the review list goes here
// imprts review tile
import React from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile.jsx';
import NewReview from './NewReview.jsx';
const url = 'http://localhost:3000reviews';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // showNewReview: false,
      productId: this.props.productId,
      reviewShown: [],
      reviewSplitNum: 0,
      data: [],
      selectedValue: 'newest',
      i: 2,
      totalReviews: 0,
    };
    this.moreReviews = this.moreReviews.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.loadList = this.loadList.bind(this);
  }

  async componentDidMount() {
    const { productId } = this.state;
    console.log(this.state.selectedValue);
    try {
      const getReviews = await axios.get(`${url}/${productId}/list?`, {
        params: {
          sort: this.state.selectedValue,
        },
      });
      this.setState({
        data: getReviews.data.results,
        totalReviews: getReviews.data.results.length,
      });
      // this.loadList();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state.selectedValue);
    if (prevProps.productId !== this.props.productId) {
      this.setState(
        {
          productId: this.props.productId,
        },
        () => {
          return this.componentDidMount();
        },
      );
    }
    if (prevState.selectedValue !== this.state.selectedValue) {
      this.componentDidMount();
    }
  }

  // loadList() {
  //   const listArr = this.state.data.results.slice(
  //     this.state.reviewSplitNum,
  //     this.state.reviewSplitNum + 2,
  //   );
  //   this.setState({
  //     reviewShown: this.state.reviewShown.concat(listArr),
  //     reviewSplitNum: this.state.reviewSplitNum + 2,
  //   });
  // }

  handleChange(e) {
    this.setState({
      selectedValue: e.target.value,
    });
  }

  moreReviews(e) {
    e.preventDefault();
    // want to change i to increase by 2
    this.setState((prevState) => {
      return {
        i: prevState.i + 2,
      };
    });
  }

  render() {
    const {
      data,
      i,
      reviewShown,
      reviewSplitNum,
      selectedValue,
      productId,
    } = this.state;

    // this.addToData();
    if (this.props.showReviewList === false) {
      return null;
    }
    console.log(this.state.totalReviews);
    return (
      <div>
        <div className="reviewSort">
          {this.state.totalReviews} Reviews sorted by
          <select
            className="reviewFilters"
            value={this.state.selectedValue}
            onChange={this.handleChange}
          >
            <option className="filterOptions" value="newest">
              Newest
            </option>
            <option value="helpful" className="filterOptions">
              Helpful
            </option>
            <option className="filterOptions" value="relevant">
              Relevant
            </option>
          </select>
        </div>
        <div className="reviewList">
          {this.state.data.slice(0, this.state.i).map((review) => {
            return <ReviewTile review={review} reviewId={review.review_id} />;
          })}
        </div>
        <button
          className="expandList"
          onClick={(e) => {
            this.moreReviews(e);
          }}
        >
          MORE REVIEWS
        </button>
        {/* <button
          className="expandList"
          onClick={() => {
            return this.openNewReview();
          }}
        >
          Add a Review +
        </button> */}
        <NewReview
          newReview={this.newReview}
          product={this.props.productId}
          // showNewReview={this.state.showNewReview}
          // closeNewReview={this.closeNewReview}
        />
      </div>
    );
  }
}

export default ReviewList;

// The list should display 2 tiles at a time, if more than 2 review button "More Reviews" appears
// below the list
// does button need to go in main page?
// if < 2 reviews no button to appear or if no more reviews in list
// button displays 2 moew reviews putting new reviews under the ones already generaterd

// list should be scrollable button and sort outside scross

// sort form (dropdown)

// if no reviews, om;ynew review button appears
