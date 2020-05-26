import React, {useState, useEffect} from 'react';
import ButtonPadrao from '../../utils/buttons/buttonPadrao';
import api from '../../../services/api'
import './style.css';

import UserIcon from '@material-ui/icons/AccountCircle';

function User(){

    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [matricula, setMatricula] = useState("");
    const [Macs, setMacs] = useState([]);

    
    useEffect(()=>{
        async function load(){
            var data = await localStorage.getItem("userId");
            var userLocal= await JSON.parse(data)

            setId(userLocal._id);
            setNome(userLocal.nome);
            setEmail(userLocal.email);
            if(userLocal.matricula==="") setMatricula("Adicionar uma matricula");
            else setMatricula(userLocal.matricula);
            setMacs(userLocal.Macs);
        }
        load();
    },[]);

   async function handleReset(){
    
        const response = await api.get('/search/users', {
            headers: {
                _id: id
            }
        });

        await localStorage.setItem("userId", JSON.stringify(response.data));

        setNome(response.data.nome);
        setEmail(response.data.email);
        if(response.data.matricula==="") setMatricula("Adicionar uma matricula");
        else setMatricula(response.data.matricula);
        setMacs(response.data.Macs);
    }

    async function handleUpdate(e){
        e.preventDefault();

        const response = await api.put('/users', {
             _id: id,
            nome: nome,
            email: email,
            Macs: Macs,
            matricula: matricula
        })
       
        console.log(response.data);

    }

    function findMac(e){
      var newMac =  e.target.value;
      var index = Macs.findIndex( mac => (mac.includes(e.target.origemMac)));
      console.log(newMac);
      console.log(index);
      console.log(Macs);
    }

    return(
        <div className="body">
        <header className="user">
        <UserIcon style={{ fontSize: 48, color: 'seashell', margin: '-5px 10px 0px 10px'}}/>
            <label htmlFor="name">{nome}</label>
            </header>
        <div className="dados">
            <form className="userData" onSubmit={e => handleUpdate(e)}>
                <div className="infos" id="user_Nome">
                    <label htmlFor="">Nome</label>
                    <input  name="nomeUser" 
                        type="text" 
                        value={nome}
                        required
                        onChange={e => setNome(e.target.value)}
                        />
                </div>
                <div className="infos" id="user_Email">
                    <label htmlFor="">Email</label>
                    <input  name="nomeUser" 
                        type="text" 
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="infos" id="user_Matricula">
                    <label htmlFor="">Matricula</label>
                    <input  name="nomeUser" 
                        type="text" 
                        value={matricula}
                        onChange={e => setMatricula(e.target.value)}
                        />
                </div>
                <div className="infos" id="user_Macs">
                <label htmlFor="">Macs</label>
                {
                  Macs.map(mac => (
                    <input key={mac} name="nomeUser" 
                        type="text" 
                        value={mac}
                        origemMac= {mac}
                        onChange={e => findMac(e)}/>
                    ))
               }
               <input name="nomeUser" 
                        type="text" 
                        value="Adicionar novo mac..."
                        onChange={e => setMacs(e.target.value)}/>
                </div>
                 <div id="buttons">
            <ButtonPadrao type="submit" title="Salvar"/>
            <ButtonPadrao title="Cancelar" cancel={handleReset}/>
            </div> 
            </form>
           
        </div>
        </div>
    )
}

export default User;