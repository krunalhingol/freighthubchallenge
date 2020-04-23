import React, { Component } from 'react';
import { getShipments } from '../Services/restClient';
import { Container, Table, Input } from 'reactstrap';
import Pagination from '../Pagination';
import './style.scss';

export default class Shipments extends Component {
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
    this.state = {
      shipmentsList: [],
      page: 1,
      pageSize: 20,
      search: '',
      sorting: {},
      sortBy: '',
      order: '',
    };
  }

  getShipmentsList = async (page, pageSize, search = '', sortBy = '', order = '') => {
    const shipmentsList = await getShipments(page, pageSize, search, sortBy, order);
    this.setState({ shipmentsList, page, pageSize, search, sortBy, order });
  };

  handlePageChange = ({ selected }) => {
    const { pageSize, search, sortBy, order } = this.state;
    this.getShipmentsList(selected, pageSize, search, sortBy, order);
  };

  handlePageSizeChange = (_, size) => {
    const { search, sortBy, order } = this.state;
    this.getShipmentsList(1, size, search, sortBy, order);
  };

  handleSearchText = (event) => {
    const { pageSize, sortBy, order } = this.state;
    this.getShipmentsList(1, pageSize, event.target.value, sortBy, order);
  };

  sortField = (name) => {
    const { pageSize, search, sortBy } = this.state;
    let { order } = this.state;
    if (sortBy === name) {
      order = order === 'asc' ? 'desc' : 'asc';
    }
    this.getShipmentsList(1, pageSize, search, name, order);
  };

  componentDidMount() {
    const { page, pageSize, search, sortBy, order } = this.state;
    this.getShipmentsList(page, pageSize, search, sortBy, order);
  }

  render() {
    const { shipmentsList, page, pageSize } = this.state;
    const headers = ['id', 'name', 'mode', 'type', 'destination', 'origin', 'total', 'status', 'userId'];
    return (
      <Container>
        <Input type="text" id="shipments-search-input" onInput={this.handleSearchText} />
        <Table responsive size="sm" hover bordered striped id="shipments-data-table">
          <thead>
            <tr>
              {headers.map((headerItem, index) => (
                <th key={index} onClick={() => this.sortField(headerItem)}>
                  {headerItem}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shipmentsList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.mode}</td>
                  <td>{item.type}</td>
                  <td>{item.destination}</td>
                  <td>{item.origin}</td>
                  <td>{item.total}</td>
                  <td>{item.status}</td>
                  <td>{item.userId}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination page={page} pageSize={pageSize} onPageChange={this.handlePageChange} onPageSizeChange={this.handlePageSizeChange} pageCount={10} />
      </Container>
    );
  }
}
