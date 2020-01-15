import React, {Component} from 'react';
import ListaZakupow from "./ListaZakupow";
import Naglowek from "./Naglowek";

//komponent nadrzędny
class ListaZakupowContainer extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }

    increaseNumberOfProduct(productId) {
        let productIndex = this.state.products.findIndex((product) => product.id === productId);
        let newState = this.state.products;
        newState[productIndex].count++;

        this.setState({products: newState});
    }

    zeroProduct(productId) {
        let productIndex = this.state.products.findIndex((product) => product.id === productId);
        let newState = this.state.products;
        newState[productIndex].count = 0;
        this.setState({products: newState});
    }

    resetAllProducts() {
        let newState = this.state.products;
        newState.forEach((product) => product.count = 0);
        this.setState({products: newState});
    }

    deleteProduct(productId) {
        let productIndex = this.state.products.findIndex(
            (product) => product.id === productId);
        let newState = this.state.products;
        newState.splice(productIndex, 1);
        this.setState({products: newState});
    }

    updateProduct(productId, productName, productPrice) {
        if (productPrice) {
            let productIndex = this.state.products.findIndex((product) => product.id === productId);
            let newState = this.state.products;
            if (productName) {
                newState[productIndex].name = productName;
            }
            newState[productIndex].price = parseFloat(productPrice);
            this.setState({products: newState});
        }
    }

    render() {
        return (
            <div className="app">
                <Naglowek products={this.state.products}
                          resetAll={this.resetAllProducts.bind(this)}
                />
                <ListaZakupow products={this.state.products}
                              taskCallbacks={{
                                  increase: this.increaseNumberOfProduct.bind(this),
                                  zero: this.zeroProduct.bind(this),
                                  delete: this.deleteProduct.bind(this),
                                  update: this.updateProduct.bind(this)
                              }}/>
            </div>)
    }

    componentDidMount() {
        fetch("./products.json")
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({products: responseData})
            })
            .catch((error) => {
                console.log('Blad pobierania przetwarzania danych: ', error)
            })
    }
}

export default ListaZakupowContainer;