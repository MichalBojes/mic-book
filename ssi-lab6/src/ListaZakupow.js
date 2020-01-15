import React, {Component} from 'react';
import Produkt from "./Produkt";
import PropTypes from 'prop-types';

//komponent nadrzędny
class ListaZakupow extends Component {
    render() {
        let prods = this.props.products.map((product) =>
            <Produkt key={product.id}
                     id={product.id}
                     name={product.name}
                     count={product.count}
                     price={product.price}
                     color={product.color}
                     taskCallbacks={this.props.taskCallbacks}/>);
        return (
            <div>
                {prods}
            </div>
        )
    }
}

ListaZakupow.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object
}

export default ListaZakupow;