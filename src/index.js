import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarvelService from './services/MarvelService';

import './style/style.sass';

const marvelService = new MarvelService();

// marvelService.getAllCharacters().then(res => console.log(res));  
marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name, item.id))); 

// marvelService.getCharacter(1009225).then(res => console.log(res));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);