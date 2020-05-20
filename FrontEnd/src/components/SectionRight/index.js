import React from "react";
import './style.css';

import { useState } from "react";
import { useEffect } from "react";

import BoxRM from './confirmacao/BoxRM';
import BoxEdit from './confirmacao/BoxEdit';

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
            <strong id="nameComponent">{render.name}</strong>
            <span className="typeComponent"> {type} </span>
            <div className="crud">
            <button className="Editar"  onClick={()=>setBoxEdit(true)}>Editar</button>
            <button className="Excluir"  onClick={()=>setBoxRm(true)}>Excluir</button>
            </div>       
       </div>
        {boxEdit? <BoxEdit type={type} _id={render._id} onClose={()=> setBoxEdit(false)} load={reload}/> : null}
        {boxRm? <BoxRM type={type} _id={render._id} onClose={()=> setBoxRm(false)} onDelete={onDelete}/> : null}
    </div>
);
};

export default SectionLeft;

//No button folder, colocar componente folders dps da conecção com a api