import React, { Component } from 'react';
import Layout from './Hoc/Layout/Layout'
import BurgerBuilder from './Containers/Burgerbuilder/BurgerBuilder'


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;
