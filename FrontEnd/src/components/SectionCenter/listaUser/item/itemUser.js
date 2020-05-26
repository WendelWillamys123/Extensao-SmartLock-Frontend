import React from 'react';

import './style.css';

import UserIcon from '@material-ui/icons/AccountCircle';
import Button from './button/button';

function ItemUsuario ({idUser = () => {}, user, load}){

    return(
        <li className="userItem">
        <header>
        <UserIcon style={{ fontSize: 35, color: 'seashell', margin: '0px 10px 0px 10px'}}/>
            <div className="userInfo">
                <strong>{user.nome}</strong>
            </div>
          
        </header> 
        <div id="button">
        <Button user={user} load={load} idUser={idUser}/>
        </div>
    </li>

   );
}



export default ItemUsuario;