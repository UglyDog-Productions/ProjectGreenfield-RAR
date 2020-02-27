/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import axios from 'axios';
import RedDot from './RedDot.jsx';

const url = 'http://localhost:3000/reviews/report';

class ReportReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      report: 'Report',
    };
    this.markReport = this.markReport.bind(this);
  }

  markReport() {
    const { reviewId } = this.props;
    axios.put(`${url}/${reviewId}`);
    this.setState({
      report: 'Reported',
    });
  }

  render() {
    const { show } = this.state;
    return (
      <div className="reportTile">
        <button
          type="button"
          className="reviewReport"
          onClick={() => this.markReport()}
        >
          {this.state.report}
        </button>
      </div>
    );
  }
}

export default ReportReview;
