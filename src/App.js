
import { Component } from 'react';
import Table from './components/Table/Table.component';
import Loader from './components/loader/Loader.component';
import _ from 'lodash';


class App extends Component {

  state = {
    isLoading: true,
    data: [],
    sort: 'asc', // mozhno desc
    sortField: 'id'
  }

  async componentDidMount() {
    const response = await fetch(`https://social-network.samuraijs.com/api/1.0/users`)
    const data = await response.json()

    this.setState({
      isLoading:false,
      data: _.orderBy(data.items, this.state.sortField, this.state.sort)
    });
    
  }

  onSort = sortField => {
    const clonedData = this.state.data.concat()
    const sortType = this.state.sort === 'asc' ? 'desc' : 'asc'

    const orderedData = _.orderBy(clonedData, sortField, sortType)

    this.setState({
      data: orderedData,
      sort: sortType,
      sortField: sortField
    })
  }

  render() {
  return (
    <div className="container">
        {
          this.state.isLoading 
          ? <Loader/> 
          : <Table 
          data={this.state.data}
          onSort={this.onSort}
          sort={this.state.sort}
          sortField={this.state.sortField}
          />
        }
    </div>
  );
  }
}

export default App;
