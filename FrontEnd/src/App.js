import React from 'react';
import {Switch, Route} from 'react-router-dom';

import "./index.css";

import Header from './components/Header';
import SectionLeft from './components/SectionLeft';

import Lista from './components/SectionCenter/listaUser/lista';
import Home from './components/SectionCenter/home';
import Groups from './components/SectionCenter/groups';
import Locks from './components/SectionCenter/locks';
import LocalFisico from './components/SectionCenter/localFisico';
import User from './components/SectionCenter/users';
import Aplication from './components/Aplication';


function App (){

  var id= null;

  function loadUser(idUser){
    
    id= idUser;
  }

  return (
        <div className="App">
          {(window.location.href==="http://localhost:3000/")? null : <Header/>}
          <aside>
            {(window.location.href==="http://localhost:3000/")? null : <SectionLeft/>}
          </aside>
           <Switch>
           <Route exact path="/" component={Aplication}/>
          <main id="center"> 
                <Route exact path="/home" component={Home}/>
                <Route exact path="/listaUser" render={()=> <Lista idUser={loadUser}/>}/>
                <Route exact path="/user" render={()=> <User idUser={id}/>}/>
                <Route exact path="/groups" component={Groups}/>
                <Route exact path="/locks" component={Locks}/>
                <Route exact path="/localFisico" component={LocalFisico}/>
           
          </main>
           </Switch>
        </div>
  );
}


export default App;
