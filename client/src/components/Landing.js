import React, { Component } from 'react';
import Background from '../components/img/cryptocurrency.jpg';

let sectionStyle = {
  width: "100%",
  backgroundImage: `url(${Background})`
};

export default class Landing extends Component {

  render() {

    // {
    //   return (
    //     <section style={ sectionStyle }>
    //     </section>
    //   );
    // }

    return (
      <div className="landing">
      <h1>Landing page</h1>
        {/* { this.props.children } */}
      </div>
    )
  }
}
