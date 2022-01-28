import React, { Component } from "react";

class Home extends Component {
  render() {
    console.log(this.state.msg);
    return (
      <div>
        <p>Home</p>
      </div>
    );
  }
}

export default Home;
