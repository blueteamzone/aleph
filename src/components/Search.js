import React, { Component } from 'react';
import queryString from 'query-string';
import debounce from 'lodash/debounce';

class Search extends Component {
  constructor(props)  {
    super(props);

    const params = queryString.parse(props.location.search);

    this.state = {
      searchTerm: params.q || ''
    }

    this.onChange = this.onChange.bind(this);
    this.updateLocation = this.updateLocation.bind(this);

    this.debouncedUpdate = debounce(this.updateLocation, 250);
  }

  updateLocation(searchTerm) {
    const { history, location } = this.props;

    const params = queryString.parse(location.search);
    const newParams = { ...params, q: searchTerm };

    if (!searchTerm) {
      delete newParams.q;
    }

    history.push({
      pathname: location.pathname,
      search: queryString.stringify(newParams)
    });
  }

  componentWillUpdate(nextProps, { searchTerm }) {
    if (searchTerm !== this.state.searchTerm) {
      this.debouncedUpdate(searchTerm);
    }
  }

  onChange(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="pt-form-group">
        <div className="pt-input-group">
          <span className="pt-icon pt-icon-search"></span>
          <input className="pt-input" type="text" onChange={this.onChange} value={searchTerm} />
        </div>
      </div>
    );
  }
}

export default Search;
