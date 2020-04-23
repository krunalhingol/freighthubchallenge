import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import './style.scss';
import { getShipmentDetails } from '../Services/restClient';

export default class ShipmentDetails extends Component {
  getShipmentsDetails = async (shipmentID) => {
    getShipmentDetails(shipmentID);
  };

  componentDidMount() {
    const { match } = this.props;
    const shipmentID = match.params.id;
    this.getShipmentsDetails(shipmentID);
  }

  render() {
    return <Container></Container>;
  }
}
