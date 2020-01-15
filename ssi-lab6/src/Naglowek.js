import React, {Component} from "react";
import PropTypes from "prop-types";

class Naglowek extends Component {
    render() {
        let iloscRoznychProduktow = this.props.products.filter((product) => product.count !== 0).length;
        let iloscWszystkichProduktow = this.props.products.map(p => p.count).reduce((a, b) => a + b, 0);
        let cenaWszystkichProduktow = this.props.products.map(p => p.count * p.price).reduce((a, b) => a + b, 0);

        return (
            <div>
                <div>
                    <h1>Michał Bojęś</h1>
                </div>
                <div>
                    <div>
                        Ile różnych produktów?

                        <button>{iloscRoznychProduktow}</button>
                    </div>
                </div>
                <div>
                    <div>
                        Ile wszystkich produktów?

                        <button type="button">{iloscWszystkichProduktow}</button>
                    </div>
                </div>
                <div>
                    <div>
                        Cena wszystkich produktów?

                        <button type="button">{cenaWszystkichProduktow}zł</button>
                    </div>
                </div>
                <div>
                    <button type="button"
                            onClick={this.props.resetAll.bind(null)}>
                        Resetuj
                    </button>
                </div>
            </div>
        )
    }
}

Naglowek.propTypes = {
    products: PropTypes.arrayOf(PropTypes.object),
    resetAll: PropTypes.func
}

export default Naglowek;