import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Searchbar.css';

class Searchbar extends Component {
  state = { querry: '' };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { querry } = this.state;

    this.props.onSubmitForm(querry);
    this.resetForm();
  };

  resetForm() {
    this.setState({ querry: '' });
  }

  render() {
    const { querry } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={querry}
            name="querry"
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default Searchbar;
