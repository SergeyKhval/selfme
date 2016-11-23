import React, {Component, PropTypes} from 'react';

class FilterButton extends Component {
  render() {
    const {title, filter, click} = this.props;

    return (
      <button
        className="filters-btn"
        data-filter={filter}
        onClick={click}>
        {title}
      </button>
    );
  }
}

FilterButton.propTypes = {
  title: PropTypes.string.isRequired,
  filter: PropTypes.string,
  click: PropTypes.func.isRequired
};

export default FilterButton;
