import React from 'react';
import {Switch, Route} from 'react-router-dom';

import "./index.css";

import Header from './components/Header';
import SectionLeft from './components/SectionLeft';

import Lista from './components/SectionCenter/listaUser/lista';
import Home from './components/SectionCenter/home';


function App (){

  return (
        <div className="App">
          <Header/>
          <aside>
            <SectionLeft/>
          </aside>
          <main id="center"> 
          <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/listaUser" component={Lista}/>
                <Route component={()=> <div>Erro 404</div>} />
            </Switch>
          </main>
        </div>
  );
}


export default App;
