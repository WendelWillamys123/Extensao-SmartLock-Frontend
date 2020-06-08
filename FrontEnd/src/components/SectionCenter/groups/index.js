import React, {useState, useEffect} from "react";
import "./style.css";

import api from '../../../services/api';
import SectionRight from '../../SectionRight';

import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import LockIcon from '@material-ui/icons/LockOutlined';
import DoorIcon from '@material-ui/icons/MeetingRoomOutlined';

function Group({idCloseSectionRight= "group"}) {
    
    const [primeiraVez, setPrimeiraVez]= useState(true);
    const [content, setContent] = useState([]);

    const [render, setRender] = useState([]);

    const [sectionSee, setSectionSee] = useState(false);
    const [component, setComponent] = useState('');
    const [type, setType] = useState("");

    const [typeComponent, setTypeComponent] = useState("");



     useEffect(()=>{
        async function loaderComponents() {
            var data = await sessionStorage.getItem("componentMaster");
            var componentMaster = await JSON.parse(data);

            if(componentMaster===null){
            const responseGroup = await api.get('/groups');
    
            setRender(responseGroup.data);
         }else if(componentMaster==="reload"){
            const responseGroup = await api.get('/groups');
    
            setRender(responseGroup.data);
         }
         else{
            viewContent(componentMaster);
                }}
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

    async function viewContent(component){
        var newContent = [];   
        
        const response = await api.get(component.path, {
            headers: {
                 _id: component.id
                }});
        
                
        newContent.push(response.data);
        setContent(newContent); 

        if(component.type==="localFisico") setTypeComponent("localFisico");
        if(component.type==="group") setTypeComponent("Group");

        setPrimeiraVez(false);
        
        
                            //checar entrada: se entra direto no grupo ou no local
                            //ideia principal: entrar no grupo não mostrar o grupo para poder entra    
                   
        }


    function seeContent(){
        
        if (typeComponent==="Group") return(

            content.map( comp => (
                comp.content.map( item => (
                <div className="buttonComponent" 
                onClick={()=> { setComponent(item); setType("Grupo"); setSectionSee(!sectionSee); }}
                onDoubleClick={ ()=> { 
                    
                    var myItens = {
                        path: "/search/groups",
                        id: item._id,
                        type: "group"
                    }
                    viewContent(myItens); }  }
                key={item._id}>
                <GroupIcon style={{margin: '0px 10px 0px 10px'}}/>
                <strong id="name">{item.name}</strong>
                </div>
                ))                  
               
                ))
        );
        else return (
            content.map( comp => (
                comp.groups.map( item => (
                <div className="buttonComponent" 
                onClick={()=> { setComponent(item); setType("Grupo"); setSectionSee(!sectionSee); }}
                onDoubleClick={ ()=> { 
                    
                    var myItens = {
                        path: "/search/groups",
                        id: item._id,
                        type: "group"
                    }
                    viewContent(myItens); }  }
                key={item._id}>
                <GroupIcon style={{margin: '0px 10px 0px 10px'}}/>
                <strong id="name">{item.name}</strong>
                </div>
                ))                  
               
                ))
        )

    }

    function seeLocalFisico(){
        if (typeComponent==="localFisico") return(

           null
        );
        else return (  content.map( comp => (
            comp.localFisico.map( item => (
            <div className="buttonComponent" 
            onClick={()=> { setComponent(item); setType("Local Físico"); setSectionSee(!sectionSee); }}
            onDoubleClick={ ()=> { 
                
                var myItens = {
                    path: "/search/localFisico",
                    id: item._id,
                    type: "localFisico"
                }
                viewContent(myItens); }  }
            key={item._id}>
            <DoorIcon style={{margin: '0px 10px 0px 10px'}}/>
            <strong id="name">{item.name}</strong>
            </div>
            ))                  
           
            ))  )
    }

    
    function seeLocks(){
         return(
            content.map( comp => (
                comp.locks.map( item => (
                   <div className="buttonComponent" 
                   onClick={()=> { setComponent(item); setType("Trava"); setSectionSee(!sectionSee); }}
                   key={item._id}>
                   <LockIcon style={{margin: '0px 10px 0px 10px'}}/>
                   <strong id="name">{item.name}</strong>
                   </div>
                   ))
            ))
        )
    }
            
        if(primeiraVez){
                return( 
                    <div id="group" onClick={handleClose}>
                        
                        <div className="section" id="section"> 
                               <spam >Grupos</spam>
                       </div> 
           
                   <div className="sectionComponent">
                       {render.map(group => {
                                if(group.hasOwnProperty("content")){
                               if(group.holder.length===0){
                                   return( 
                                       <div className="buttonComponent" 
                                       onClick={()=> { setComponent(group); setType("Grupo"); setSectionSee(!sectionSee); }}
                                       onDoubleClick={ ()=> { 
                                        var myItens = {
                                            path: "/search/groups",
                                            id: group._id,
                                            type: "group"
                                        }
                                        viewContent(myItens); }  }
                                       key={group._id}>
                                       <GroupIcon style={{margin: '0px 10px 0px 10px'}}/>
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
            }else{
                return(
                        <div id="group" onClick={handleClose}>
                            
                            <div className="section" id="section"> 
                                   <spam >Grupos</spam>
                           </div> 
               
                       <div className="sectionComponent">
     
                        {seeLocalFisico()}
                        {seeContent()    }
                        {seeLocks()      }
        
                       </div>
               
                       {sectionSee ? <SectionRight component={component} type={type} onDelete={onDelete} onClose={()=> setSectionSee(false)} onUpload={onUpdate}/> : null}
                       </div>
                   );
            }
             

}

export default Group;