import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ListaZakupowContainer from "./ListaZakupowContainer";

ReactDOM.render(<ListaZakupowContainer/>, document.getElementById('root'));

serviceWorker.unregister();
