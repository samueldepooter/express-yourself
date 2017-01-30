import React, {Component} from 'react';
import {TransitionMotion, spring} from 'react-motion';

class Page1 extends Component {

  state = {
    items: [
      {
        key: `a`,
        size: 10
      },
      {
        key: `b`,
        size: 20
      },
      {
        key: `c`,
        size: 30
      }
    ]
  }

  componentDidMount() {
    this.setState({
      items: [{key: `a`, size: 10}, {key: `b`, size: 20}], // remove c.
    });
  }

  willLeave() {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return {width: spring(0), height: spring(0)};
  }

  render() {
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        styles={this.state.items.map(item => ({
          key: item.key,
          style: {width: item.size, height: item.size},
        }))}>

        {interpolatedStyles =>
          // first render: a, b, c. Second: still a, b, c! Only last one's a, b.

          <div>
            {interpolatedStyles.map(config => {
              console.log(interpolatedStyles);
              return <div key={config.key} style={{...config.style, border: `1px solid`}} />;
            })}
          </div>
        }
      </TransitionMotion>
    );
  }

}

Page1.propTypes = {};

export default Page1;
