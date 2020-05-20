import React, {useState, useEffect} from "react";
import "./style.css";

import api from '../../../services/api';
import SectionRight from '../../SectionRight';

import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import LockIcon from '@material-ui/icons/LockOutlined';

function Group({idCloseSectionRight= "group"}) {
    
    const [responses, setResponses] = useState([]);
    const [render, setRender] = useState([]);

    const [primeira, setPrimeira] = useState(true);

    const [sectionSee, setSectionSee] = useState(false);
    const [component, setComponent] = useState('');
    const [type, setType] = useState("");


     useEffect(()=>{
        async function loaderComponents() {
            const responseGroup = await api.get('/groups');
    
            setRender(responseGroup.data);
         }
         loaderComponents();
     }, []);

     async function reloadComponents() {
        const responseGroup = await api.get('/groups');

        setRender(responseGroup.data);
    }

    async function onUpdate(){
        reloadComponents();
        setSectionSee(true);
    }

    async function onDelete(){
        reloadComponents();
        setSectionSee(false);
    }

     const handleClose = (e) => {
        if(e.target.id === idCloseSectionRight) setSectionSee(false);
        else ;
    }

    async function viewContent(group){
                console.log(group.content);
                const responseGroup = await api.get('/search/groups', {
                headers: {
                     content: group.content
                    }});

                setRender(responseGroup.data);
                setPrimeira(false);
            
        }

            return( 
         <div id="group" onClick={handleClose}>
             
             <div className="section" id="section">
                    <spam >Grupos</spam>
            </div> 

        <div className="sectionComponent">
            {render.map(group => {
                if(primeira===true){
                     if(group.hasOwnProperty("content")){
                    if(group.holder.length===0){
                        return( 
                            <div className="buttonComponent" 
                            onClick={()=> { setComponent(group); setType("Grupo"); setSectionSee(!sectionSee); }}
                            onDoubleClick={ ()=> { viewContent(group); }  }
                            key={group._id}>
                            <GroupIcon style={{margin: '0px 10px 0px 10px'}}/>
                            <strong id="name">{group.name}</strong>
                            </div>)
                    }
                  
                }
            } else{
                if(group.hasOwnProperty("content")){
                        return( 
                            <div className="buttonComponent" 
                            onClick={()=> { setComponent(group); setType("Grupo"); setSectionSee(!sectionSee); }}
                            onDoubleClick={ ()=> { viewContent(group); }  }
                            key={group._id}>
                            <GroupIcon style={{margin: '0px 10px 0px 10px'}}/>
                            <strong id="name">{group.name}</strong>
                            </div>)
                } else {
                    return( 
                        <div className="buttonComponent" 
                        onClick={()=> { setComponent(group); setType("Grupo"); setSectionSee(!sectionSee); }}
                        key={group._id}>
                        <LockIcon style={{margin: '0px 10px 0px 10px'}}/>
                        <strong id="name">{group.name}</strong>
                        </div>)
                }
            }

                }
               
            
               
                )}
        </div>

        {sectionSee ? <SectionRight component={component} type={type} onDelete={onDelete} onClose={()=> setSectionSee(false)} onUpload={onUpdate}/> : null}
        </div>
    ); 

}

export default Group;