import React from "react";
import './style.css';

import { useState } from "react";
import { useEffect } from "react";

import BoxRM from './confirmacao/BoxRM';
import BoxEdit from './confirmacao/BoxEdit';

import {Breadcrumbs} from '@material-ui/core'
import { Link } from "react-router-dom";
import api from "../../services/api";
 
function SectionLeft({type, component, onDelete=() =>{}, onUpload=() =>{}}){ 

    const [render, setRender] = useState('');
    const [boxRm, setBoxRm] = useState(false);
    const [boxEdit, setBoxEdit] = useState(false);

    useEffect(()=>{
        setRender(component);

    }, []);

    async function reload(updateComponent){
        await onUpload(updateComponent);
        setRender(updateComponent);
    }

    

return(
    <div id="sectionRight">
       <div className="infoComponent">
            <h3 id="nameComponent">{render.name}</h3>
            <h5 className="typeComponent"> {type} </h5>
       </div>
       <div className="crud">
            <button className="buttonSectionRight"  onClick={()=>setBoxEdit(true)}>Editar</button>
            <button className="buttonSectionRight"  onClick={()=>setBoxRm(true)}>Excluir</button>
        </div>
      
        {boxEdit? <BoxEdit type={type} _id={render._id} onClose={()=> setBoxEdit(false)} load={reload}/> : null}
        {boxRm? <BoxRM type={type} _id={render._id} onClose={()=> setBoxRm(false)} onDelete={onDelete}/> : null}
    </div>
);
};

export default SectionLeft;
