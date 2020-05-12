import React, {useState} from 'react';
import "./styleCadastro.css";
import api from '../../../../../services/api.js';

function Cadastro ({onClose = () => {}, load}){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [Macs, setMacs] = useState([]);
    const [matricula, setMatricula] = useState('');

    async function cadastrarUser(e) {
        e.preventDefault();

        const response = await api.post('/users', {
            nome,
            email,
            Macs,
            matricula, 
        });

        setNome('');  
        setEmail('');
        setMacs('');
        setMatricula('');
        load();
        onClose();
    }

    return(
        <div className="container">
            <div id="BoxCadastro" >
                <form className="formCadastro" onSubmit={cadastrarUser}>
                <strong>Cadastro</strong>
                    <div className="input">
                        <label htmlFor="nomeUser">Nome</label>
                        <input 
                        name="nomeUser" 
                        id="nomeUser"
                        type="text" 
                        required 
                        value={nome}
                        onChange={e => setNome(e.target.value)}/>   
                    </div>
                
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <input 
                        name="email" 
                        id="email"
                        type="text" 
                        required 
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>   
                    </div>

                    <div className="input">
                        <label htmlFor="Macs">Macs</label>
                        <input 
                        name="Macs" 
                        id="Macs"
                        type="text" 
                        required 
                        value={Macs}
                        onChange={e => setMacs(e.target.value)}/>   
                    </div>

                    <div className="input">
                        <label htmlFor="matricula">Matricula</label>
                        <input 
                        name="matricula" 
                        id="matricula"
                        type="text"  
                        value={matricula}
                        onChange={e => setMatricula(e.target.value)}/>   
                    </div>
                <div id="buttonDirection">
                <button type="reset" className="cancelar" onClick={onClose}>Cancelar</button>
               <button type="submit" className="cadastrar">Cadastrar</button>
               </div>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;