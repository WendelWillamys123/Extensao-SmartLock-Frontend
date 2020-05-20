import React, {useState, useEffect} from "react";
import "./style.css";
import {Redirect, Link} from 'react-router-dom';

import api from '../../../services/api';
import SectionRight from '../../SectionRight';

import UserIcon from '@material-ui/icons/PersonOutlineOutlined';
import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import LockIcon from '@material-ui/icons/LockOutlined';

function Home({idCloseSectionRight= "home"}) {
    
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [locks, setLocks] = useState([]);

    const [redirect, setRedirect] = useState(false);
    const [path, setPath] = useState("");

    const [sectionSee, setSectionSee] = useState(false);
    const [component, setComponent] = useState('');
    const [type, setType] = useState("");

    useEffect(()=>{
        async function loaderUser() {
             const response = await api.get('/users');

            setUsers(response.data);
         }
         loaderUser();
     }, []);

     useEffect(()=>{
        async function loaderComponents() {
            const responseGroup = await api.get('/groups');
            const responseLocks = await api.get('/locks');
    
            setLocks(responseLocks.data);
            setGroups(responseGroup.data);
         }
         loaderComponents();
     }, []);

     async function reloadComponents() {
        const responseGroup = await api.get('/groups');
        const responseLocks = await api.get('/locks');

        setLocks(responseLocks.data);
        setGroups(responseGroup.data);

        setSectionSee(true);
    }

    async function onUpdate(){
        reloadComponents();
        setSectionSee(false);
    }

    async function onDelete(){
        reloadComponents();
        setSectionSee(false);
    }

     const handleClose = (e) => {
        if(e.target.id === idCloseSectionRight) setSectionSee(false);
        else ;
    }
   

    if(redirect) return <Redirect to={path}/>
        else {
            return( 
         <div id="home" onClick={handleClose}>
        <div className="section">
                    <spam >Usuários</spam>
            </div>

        <div className="section" id="sectionGroups">
                    <spam >Grupos</spam>
            </div> 

        <div className="section" id="sectionLocks">
                    <spam >Travas</spam>
            </div>  
    
        <div className="sectionComponent">
            {users.map(user => 
                <div className="buttonComponent" key={user._id} onDoubleClickCapture={()=> {
                    setPath("/users");
                   setRedirect(true);
                   }}>
                    <UserIcon style={{margin: '0px 10px 0px 10px'}}/>
                    <strong id="name">{user.nome}</strong>
                    </div>
                )}
        </div>
        <div className="sectionComponent" id="groups">
            {groups.map(group => 
                <div className="buttonComponent" 
                    onClick={()=> {
                    setComponent(group);
                    setType("Grupo");
                    setSectionSee(!sectionSee);
                        }}
                        onDoubleClick={ ()=> {
                             setPath("/groups");
                            setRedirect(true);
                            }
                        }
                    key={group._id}>
                    <GroupIcon style={{margin: '0px 10px 0px 10px'}}/>
                    <strong id="name">{group.name}</strong>
                    </div>
                )}
        </div>
        <div className="sectionComponent" id="locks">
            {locks.map(lock => 
                <div className="buttonComponent" 
                    onClick={()=> {
                    setComponent(lock);
                    setType("Trava");
                    setSectionSee(!sectionSee);
                        }}
                    onDoubleClick={()=> {
                        setPath("/groups");
                       setRedirect(true);
                       }}
                    key={lock._id}>
                    <LockIcon style={{margin: '0px 10px 0px 10px'}}/>
                    <strong id="name">{lock.name}</strong>
                    </div>
                )}
        </div>
        {sectionSee ? <SectionRight component={component} type={type} onDelete={onDelete} onClose={()=> setSectionSee(false)} onUpload={onUpdate}/> : null}
        </div>
    ); 
}
}

export default Home;