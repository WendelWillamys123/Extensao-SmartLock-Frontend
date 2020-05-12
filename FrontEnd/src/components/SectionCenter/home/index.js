import React, {useState, useEffect} from "react";
import "./style.css";
import api from '../../../services/api';

import UserIcon from '@material-ui/icons/PersonOutlineOutlined';

function Header() {
    
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        async function loaderUser() {
             const response = await api.get('/users');

            setUsers(response.data);
         }
         loaderUser();
     }, []);
   
    return(
         <>
        <div className="section">
                    <spam >Usuários</spam>
            </div> 
    
        <div id="sectionUser">
            {users.map(user => 
                <div id="buttonUser" key={user._id}>
                    <UserIcon style={{margin: '0px 10px 0px 10px'}}/>
                    <strong>{user.nome}</strong>
                    </div>
                )}
        </div>
        </>
    );
}

export default Header;