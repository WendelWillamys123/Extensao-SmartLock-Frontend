import React, {useState, useEffect} from "react";
import './styleList.css';
import './style.css';
import ItemUser from '../item/itemUser';
import Cadastro from '../item/cadastro/cadastro';
import api from '../../../../services/api';
import UserAdd from '@material-ui/icons/PersonAdd';

function Lista ({idUser = () => {}, id ="listagem"}){

    const [users, setUsers] = useState([]);
    const [nome, setName] = useState('');
    const [array, setArray] = useState([]);
    const [busca, setBusca] = useState([]);
    const [visibleForm, setVisibleForm] = useState(false);


    async function load() {
        const response = await api.get('/users');

       setArray(response.data);
       setUsers(response.data);
    }


    useEffect(()=>{
        async function loaderUser() {
             const response = await api.get('/users');
  
            setUsers(response.data);
            setArray(response.data);
         }
         loaderUser();
     }, []);

     async function handleReset() {
        setArray(users);
        setName('');
    }

    async function handleClick(e){
        e.preventDefault();

       await setBusca(users.filter( user =>  (user.nome.includes(nome))));
       setArray(busca);
    }

    const handleClose = (e) => {
        if(e.target.id === id) setVisibleForm(false);
        else ;
    }

    return (
       
        <>
        <aside>
                <div className="main-seach">
                <form className="seachForm" onSubmit={handleClick}>
                <strong>Filtro</strong>
                    <div className="input-block">
                        <label htmlFor="nomeUser">Nome do usuário</label>
                        <input 
                        name="nomeUser" 
                        id="nomeUser"
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
        <div id="listagem" onClick={handleClose}>

        <ul id="itens">

              {array.map(user => (
                <ItemUser load={load} user={user} key={user._id} idUser={idUser} />
              ))}

            </ul>

            <div className="add" onClick={()=> setVisibleForm(!visibleForm)}>
                <UserAdd style={{margin: '20px 0px 0px 20px'}}/>
                </div>
            {visibleForm ? <Cadastro onClose={()=> setVisibleForm(false)} load={load}/> : null}
        </div>
        </main>
    </>

);
    }

    export default Lista;