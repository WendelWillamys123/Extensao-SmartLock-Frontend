import React from 'react';
import {Switch, Route} from 'react-router-dom';

import "./index.css";

import Header from './components/Header';
import SectionLeft from './components/SectionLeft';

import Lista from './components/SectionCenter/listaUser/lista';
import Home from './components/SectionCenter/home';
import Groups from './components/SectionCenter/groups';
import Locks from './components/SectionCenter/locks';
import User from './components/SectionCenter/users';


function App (){

  var id= null;

  function loadUser(idUser){
    
    id= idUser;
  }

  return (
        <div className="App">
          <Header/>
          <aside>
            <SectionLeft/>
          </aside>
          <main id="center"> 
          <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/listaUser" render={()=> <Lista idUser={loadUser}/>}/>
                <Route exact path="/user" render={()=> <User idUser={id}/>}/>
                <Route exact path="/groups" component={Groups}/>
                <Route exact path="/locks" component={Locks}/>
                <Route component={()=> <div>Erro 404</div>} />
            </Switch>
          </main>
        </div>
  );
}


export default App;
