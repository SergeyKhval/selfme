import React, {Component, PropTypes} from 'react';

class Filters extends Component {
  handleAddFilterClick(e) {
    const img = new Image();
    const canvas = document.querySelector('canvas');
    const {filter} = e.target.dataset;

    img.src = this.props.source.original;

    this.props.filter.reset();
    this.props.filter.addFilter(filter);

    const filteredImg = this.props.filter.apply(img);

    canvas.getContext('2d').drawImage(filteredImg, 0, 0);

    this.props.setSource(canvas, true);
  }

  resetFilters() {
    const img = new Image();
    const canvas = document.querySelector('canvas');

    img.src = this.props.source.original;

    this.props.filter.reset();

    const filteredImg = this.props.filter.apply(img);

    canvas.getContext('2d').drawImage(filteredImg, 0, 0);

    this.props.setSource(false, true);
  }

  handleFiltersToggle() {
    this.props.toggleFilters();
  }

  render() {
    const {filtersVisible} = this.props;

    return (
      <div className={filtersVisible ? 'filters-pane filters-pane_visible' : 'filters-pane'}>
        <div className="filters-pane__header">
          <button className="filters-btn" onClick={::this.resetFilters}>
            Reset Filters
          </button>
          <button className="btn btn_flat" onClick={::this.handleFiltersToggle}>
            <i className="fa fa-times" aria-hidden="true"/>
          </button>
        </div>

        <div className="filters-pane__body">
          <button
            className="filters-btn"
            data-filter="negative"
            onClick={::this.handleAddFilterClick}>negative
          </button>
          <button
            className="filters-btn"
            data-filter="desaturate"
            onClick={::this.handleAddFilterClick}>desaturate
          </button>
          <button
            className="filters-btn"
            data-filter="desaturateLuminance"
            onClick={::this.handleAddFilterClick}>desaturateLuminance
          </button>
          <button
            className="filters-btn"
            data-filter="sepia"
            onClick={::this.handleAddFilterClick}>Sepia
          </button>
          <button
            className="filters-btn"
            data-filter="brownie"
            onClick={::this.handleAddFilterClick}>brownie
          </button>
          <button
            className="filters-btn"
            data-filter="vintagePinhole"
            onClick={::this.handleAddFilterClick}>vintagePinhole
          </button>
          <button
            className="filters-btn"
            data-filter="kodachrome"
            onClick={::this.handleAddFilterClick}>kodachrome
          </button>
          <button
            className="filters-btn"
            data-filter="technicolor"
            onClick={::this.handleAddFilterClick}>technicolor
          </button>
          <button
            className="filters-btn"
            data-filter="detectEdges"
            onClick={::this.handleAddFilterClick}>detectEdges
          </button>
          <button
            className="filters-btn"
            data-filter="sobelX"
            onClick={::this.handleAddFilterClick}>sobelX
          </button>
          <button
            className="filters-btn"
            data-filter="sobelY"
            onClick={::this.handleAddFilterClick}>sobelY
          </button>
          <button
            className="filters-btn"
            data-filter="polaroid"
            onClick={::this.handleAddFilterClick}>polaroid
          </button>

          <button
            className="filters-btn"
            data-filter="shiftToBGR"
            onClick={::this.handleAddFilterClick}>shiftToBGR
          </button>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  source: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  setSource: PropTypes.func.isRequired,
  toggleFilters: PropTypes.func.isRequired,
  filtersVisible: PropTypes.bool.isRequired
};

export default Filters;
