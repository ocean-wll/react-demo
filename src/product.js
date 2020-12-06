import React from 'react';

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? product.name : <span style={{ color: 'red' }}>
      {product.name}
    </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const isStockOnly = this.props.isStockOnly;

    const rows = [];
    let lastCategory = null;
    this.props.products.forEach(product => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }

      if (isStockOnly && !product.stocked) {
        return;
      }

      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow category={product.category} key={product.category} />
        );
      }
      rows.push(
        <ProductRow product={product} key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {

  handleFilterTextChange = (e) => {
    this.props.handleFilterTextChange(e.target.value)
  }

  handleInStockChange = (e) => {
    this.props.handleInStockChange(e.target.checked)
  }

  render() {
    const filterText = this.props.filterText;
    const isStockOnly = this.props.isStockOnly;

    return (
      <form>
        <input
          type='text'
          placeholder="Search..."
          value={filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type='checkbox'
            checked={isStockOnly}
            onChange={this.handleInStockChange}
          />
          {' '}
          only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      isStockOnly: false
    };
  }

  handleFilterTextChange = (filterText) => {
    this.setState({
      filterText: filterText
    })
  }

  handleInStockChange = (isStockOnly) => {
    this.setState({
      isStockOnly: isStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          isStockOnly={this.state.isStockOnly}
          handleFilterTextChange={this.handleFilterTextChange}
          handleInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          isStockOnly={this.state.isStockOnly} />
      </div>
    );
  }
}

export default FilterableProductTable;
