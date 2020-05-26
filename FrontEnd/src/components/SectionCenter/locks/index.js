import React, {useState, useEffect} from "react";
import './style.css';

import SectionRight from '../../SectionRight';
import api from '../../../services/api';

import LockIcon from '@material-ui/icons/LockOutlined';

function Locks ({idCloseSectionRight ="listagem"}){

    const [locks, setLocks] = useState([]);
    
    const [nome, setName] = useState('');

    const [array, setArray] = useState([]);

    const [sectionSee, setSectionSee] = useState(false);
    const [component, setComponent] = useState('');
    const [type, setType] = useState("");

    useEffect(()=>{
        async function loaderUser() {
             const response = await api.get('/locks');
  
            setLocks(response.data);
            setArray(response.data);
         }
         loaderUser();
     }, []);

     async function handleReset() {
        setArray(locks);
        setName('');
    }

    async function handleClick(e){
        e.preventDefault();

       await setArray(locks.filter( lock =>  (lock.name.includes(nome))));
      
    }

    const handleClose = (e) => {        
        if(e.target.id === idCloseSectionRight) setSectionSee(false);
       
    }
    async function reloadComponents() {
        const response = await api.get('/locks');

        setLocks(response.data);
        setArray(response.data);
    }

    async function onUpdate(){
        reloadComponents();
        setSectionSee(true);
    }

    async function onDelete(){
        reloadComponents();
        setSectionSee(false);
    }

    return (
       
        <>
        <aside>
                <div className="main-seach">
                <form className="seachForm" onSubmit={(e)=> handleClick(e)}>
                <strong>Filtro</strong>
                    <div className="input-block">
                        <label htmlFor="nomeLock">Nome da trava</label>
                        <input 
                        name="nomeLock" 
                        id="nomeLock"
                        type="text" 
                        required 
                        value={nome}
                        onChange={e => setName(e.target.value)}/>   
                    </div>
                <button type="reset" className="excluir" onClick={handleReset}>Excluir filtro</button>
               <button type="submit" className="filtrar">Pesquisar</button>
            </form>
            </div>
        </aside>
            <main>
        <div className="sectionComponent" onClick={handleClose}>

            {array.map( item => (
                   <div className="buttonComponent" 
                   onClick={()=> { setComponent(item); setType("Trava"); setSectionSee(!sectionSee); }}
                   key={item._id}>
                   <LockIcon style={{margin: '0px 10px 0px 10px'}}/>
                   <strong id="name">{item.name}</strong>
                   </div>
                   ))
            }
        </div> 
     {sectionSee ? <SectionRight component={component} type={type} onDelete={onDelete} onClose={()=> setSectionSee(false)} onUpload={onUpdate}/> : null}

        </main>
    </>

);
    }

    export default Locks;