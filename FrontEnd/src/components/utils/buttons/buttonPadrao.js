import React from 'react';
import './style.css'

function buttons({type, title, cancel = () => {}}) {
  if(title==="Salvar") return <button type={type} className="buttonSalvar"> {title} </button>;
  if(title==="Cancelar") return <button onClick={()=> cancel()} className="buttonCancelar"> {title} </button>;
  if(title==="Excluir") return <button className="buttonExcluir"> {title} </button>;
}

export default buttons;
