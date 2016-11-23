import React, {Component, PropTypes} from 'react';
import FilterButton from '../filterButton';

class Filters extends Component {
  clearActiveFilters() {
    document.querySelectorAll('.filters-btn')
      .forEach(btn => btn.classList.remove('filters-btn_active'));
  }

  handleAddFilterClick(e) {
    const img = new Image();
    const canvas = document.querySelector('canvas');
    const {filter} = e.target.dataset;

    img.src = this.props.source.original;

    this.clearActiveFilters();

    e.target.classList.add('filters-btn_active');

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

    this.clearActiveFilters();
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

    const buttons = [
      {
        title: 'Negative',
        filter: 'negative'
      },
      {
        title: 'Desaturate',
        filter: 'desaturate'
      },
      {
        filter: 'desaturateLuminance',
        title: 'Desaturate Luminance'
      },
      {
        filter: 'sepia',
        title: 'Sepia'
      },
      {
        filter: 'brownie',
        title: 'Brownie'
      },
      {
        filter: 'vintagePinhole',
        title: 'Vintage Pinhole'
      },
      {
        filter: 'kodachrome',
        title: 'Kodachrome'
      },
      {
        filter: 'technicolor',
        title: 'Technicolor'
      },
      {
        filter: 'detectEdges',
        title: 'Detect Edges'
      },
      {
        filter: 'sobelX',
        title: 'Sobel X'
      },
      {
        filter: 'sobelY',
        title: 'Sobel Y'
      },
      {
        filter: 'polaroid',
        title: 'Polaroid'
      },
      {
        filter: 'shiftToBGR',
        title: 'Shift To BGR'
      }
    ];

    const filterButtonsTemplate = buttons.map((b, i) =>
      <FilterButton
        key={i}
        title={b.title}
        filter={b.filter}
        click={::this.handleAddFilterClick}/>
    );

    return (
      <div
        className={filtersVisible ? 'filters-pane filters-pane_visible' : 'filters-pane'}
        style={{width: `${this.props.width}px`}}>
        <div className="filters-pane__header">
          <FilterButton title="Reset Filters" click={::this.resetFilters}/>
          <button className="btn btn_flat" onClick={::this.handleFiltersToggle}>
            <i className="fa fa-times" aria-hidden="true"/>
          </button>
        </div>

        <div className="filters-pane__body">
          {filterButtonsTemplate}
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
  filtersVisible: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired
};

export default Filters;
