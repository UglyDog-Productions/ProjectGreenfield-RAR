/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import NewReview from './NewReview.jsx';
import ReviewBreakdown from './Graph/ReviewBreakdown.jsx';
import exampleData from '../../../../sampleData/RAR/reviewsList.json';
import './RAR.scss';

const url = 'http://localhost:3000';

class RatingsAndReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      productDetails: {},
    };
  }

  async componentDidMount() {
    const { productId } = this.props;
    const getProductDetails = await axios.get(`${url}/products/${productId}`);
    this.setState({
      productDetails: getProductDetails.data,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.setState({
        productId: this.props.productId,
      });
      this.componentDidMount();
    }
  }

  render() {
    return (
      <div id="ratingsComp" className="ratingsComp">
        <div className="rarHeading">RATINGS & REVIEWS</div>
        <br />
        <br />
        <div className="rar">
          <div className="graph">
            <ReviewBreakdown
              data={this.state.data}
              productId={this.state.productId}
            />
          </div>
          <div className="list">
            <ReviewList
              productDetails={this.state.productDetails}
              productId={this.state.productId}
              showReviewList={this.state.showReviewList}
            />
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default RatingsAndReviews;

// things to take in a review list
// the review graphic on the sideß
// teakes in new review
