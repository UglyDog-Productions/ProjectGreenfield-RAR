import React from 'react';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';

import '../App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 5,
    };
  }

  changeProduct = (e, newId) => {
    e.preventDefault();
    this.setState({
      productId: newId,
    });
  };

  render() {
    const { productId } = this.state;
    return (
      <div className="mains">
        <ProductOverview
          changeProduct={this.changeProduct}
          productId={productId}
        />
        <QuestionsAndAnswers productId={productId} />
        <RatingsAndReviews productId={productId} />
      </div>
    );
  }
}

export default App;
