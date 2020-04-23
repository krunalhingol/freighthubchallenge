import React, { Component } from 'react';
import { Container } from 'reactstrap';

class AppComponent extends Component {
  render() {
    return <Container className="app-root">{this.props.children}</Container>;
  }
}

export default AppComponent;
