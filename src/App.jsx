const productTableHeadings = ['Product Name', 'Price', 'Category', 'Image'];
const productCategories = [
    {id: 1, name: 'Shirts'},
    {id: 2, name: 'Jeans'},
    {id: 3, name: 'Jackets'},
    {id: 4, name: 'Sweaters'},
    {id: 5, name: 'Accessories'}
]
const NO_DATA = 'No Data';

const ProductTableRow = ({product}) => {
    const {name, price, category, imageUrl} = product;
    return (
        <tr>
            <td>{name || NO_DATA}</td>
            <td>{price ? `${price}` : NO_DATA}</td>
            <td>{category}</td>
            <td>{imageUrl ? <a href={imageUrl} target="_blank">View</a> : NO_DATA}</td>
        </tr>
    );
}

const ProductTable = ({headings, products}) => {
    return (
        <table className="table">
            <thead>
            <tr>
                {headings.map((heading, index) => <th key={index}>{heading}</th>)}
            </tr>
            </thead>

            <tbody>
            {products.length > 0 ? (
                products.map((product) => <ProductTableRow key={product.id} product={product}/>)
            ) : (
                <tr className="text-center">
                    <td colSpan="4">No Products added yet</td>
                </tr>
            )}
            </tbody>
        </table>
    )
}

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            price: '$',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const {name, price, category, imageUrl} = document.forms.addProduct;
        const priceWithoutDollar = price.value.substring(1); // Getting value without '$'

        const product = {
            name: name.value,
            price: parseFloat(priceWithoutDollar),
            category: category.value,
            imageUrl: imageUrl.value
        }
        this.props.addProduct(product);

        name.value = '';
        category.value = 'Shirts';
        imageUrl.value = '';
        this.setState({price: '$'});
    }

    handlePriceChange(event) {
        const priceWithoutDollar = event.target.value.substring(1); // Getting value without '$'
        this.setState({price: `$${priceWithoutDollar}`})
    }

    render() {
        return (
            <form name="addProduct" onSubmit={this.handleSubmit} className="add-product-form">
                <div className="form-element-container">
                    <label htmlFor="category">Category</label>
                    <select name="category">
                        {
                            productCategories.map(({id, name}) => <option id={id} value={name}>{name}</option>)
                        }
                    </select>
                </div>

                <div className="form-element-container">
                    <label htmlFor="price">Price Per Unit</label>
                    <input type="text" name="price" value={this.state.price} onChange={this.handlePriceChange}/>
                </div>

                <div className="form-element-container">
                    <label htmlFor="name">Product Name</label>
                    <input type="text" name="name"/>
                </div>

                <div className="form-element-container">
                    <label htmlFor="imageUrl">Image URL</label>
                    <input type="text" name="imageUrl"/>
                </div>

                <button type="submit" className="submit-button submit-button-dark">Add Product</button>
            </form>
        )
    }
}

async function graphQLFetch(query, variables = {}) {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query, variables})
        });
        const result = await response.json();

        if (result.errors) {
            const error = result.errors[0];
            alert('Error while quering for data - ', error);
        }
        return result.data;
    } catch (e) {
        alert(`Error in sending data to server: ${e.message}`);
    }
}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = {products: []};
        this.addProduct = this.addProduct.bind(this);
    }

    componentDidMount() {
        this.fetchProductList();
    }

    async fetchProductList() {
        const query = `
            query {
                productList {
                    id
                    name
                    category
                    price
                    imageUrl
                }
            }
        `;

        const data = await graphQLFetch(query);

        if (data) {
            this.setState({products: data.productList});
        }
    }

    async addProduct(product) {
        const query = `
            mutation addProduct($product: ProductInputs!) {
                addProduct(product: $product) {
                    id
                }
            }
        `;

        const data = await graphQLFetch(query, {product});
        if (data) {
            this.fetchProductList();
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="root-container">
                    <h2>My Company Inventory</h2>
                    <div>Showing all available products</div>
                    <hr/>
                    <ProductTable headings={productTableHeadings} products={this.state.products}/>
                    <div>Add a new Product</div>
                    <hr/>
                    <ProductAdd addProduct={this.addProduct}/>
                </div>
            </React.Fragment>
        );
    }
}

const element = (<ProductList/>);

ReactDOM.render(element, document.getElementById('contents'));
