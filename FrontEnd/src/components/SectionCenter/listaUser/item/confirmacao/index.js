import React from 'react';
import './style.css';

import api from '../../../../../services/api';

function Check({ idUser = 'shadow', onClose = () => {}, user, load}){
    const _id = user._id;

    const handleClose = (e) => {
        if(e.target.id === idUser) onClose();
        else ;
    }

    async function onDelete(){

        await api.delete('/users/delete', { 
           headers:{
               id: _id,
           }, 
        });
         load();
     }

    async function handlDelete() {
        await onDelete();
        onClose();
    }

    return(
        <div className="shadow" id={idUser} onClick={handleClose}>
            <div className="modal">
                <h1>Excluir usuário</h1>
                <p>Os dados do usuário serão apagados permanentemente. Deseja excluir mesmo assim?</p>
                <div className="buttons">
                <button type="reset" className="cancelar" id="menorButton" onClick={onClose}>Cancelar</button>
               <button type="submit" className="cadastrar" id="menorButton" onClick={handlDelete}>Excluir</button>
               </div>
            </div>
        </div>
    );
}

export default Check;