import React, {Component} from "react";
import PropTypes from "prop-types";

class Produkt extends Component {

    constructor() {
        super();
        this.state = {
            nazwa: '',
            price: ''
        }
    }

    handleNameInput(event) {
        this.setState({nazwa: event.target.value})
    }

    handlePriceInput(event) {
        this.setState({price: event.target.value})
    }

    handleUpdateButton() {
        this.props.taskCallbacks.update(this.props.id, this.state.nazwa, this.state.price)
        this.setState({
            price: '',
            nazwa: ''
        })
    }

    render() {

        let backgroundStyle = {
            backgroundColor: this.props.color
        }

        return (
            <div key={this.props.id}>
                <div style={backgroundStyle}>
                    <button type="button">{this.props.count}</button>

                    <button type="button">{this.props.name} - {this.props.price} zł</button>

                    <button type="button"
                            onClick={this.props.taskCallbacks.increase.bind(null, this.props.id)}>+
                    </button>

                    <button type="button"
                            onClick={this.props.taskCallbacks.zero.bind(null, this.props.id)}>0
                    </button>

                    <button type="button"
                            onClick={this.props.taskCallbacks.delete.bind(null, this.props.id)}> Usuń
                    </button>

                    <input type="text" placeholder="Podaj nazwe" value={this.state.nazwa}
                           onChange={this.handleNameInput.bind(this)}></input>

                    <input type="number" placeholder="Podaj cene" value={this.state.price}
                           onChange={this.handlePriceInput.bind(this)}></input>

                    <button type="button"
                            onClick={this.handleUpdateButton.bind(this)}> Zaktualizuj
                    </button>
                </div>
            </div>)
    }
}

Produkt.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    color: PropTypes.string,
    taskCallbacks: PropTypes.object,
}

Produkt.defaultProps = {
    name: "Brak nazwy",
    color: '#11AA55'
}
export default Produkt;