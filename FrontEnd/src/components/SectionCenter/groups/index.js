import React, {useState, useEffect} from "react";
import "./style.css";

import api from '../../../services/api';
import SectionRight from '../../SectionRight';

import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import LockIcon from '@material-ui/icons/LockOutlined';

function Group({idCloseSectionRight= "group"}) {
    
    const [primeiraVez, setPrimeiraVez]= useState(true);
    const [content, setContent] = useState([]);

    const [render, setRender] = useState([]);

    const [sectionSee, setSectionSee] = useState(false);
    const [component, setComponent] = useState('');
    const [type, setType] = useState("");


     useEffect(()=>{
        async function loaderComponents() {
            var data = await localStorage.getItem("componentMaster");
            var componentMaster = await JSON.parse(data);

            if(componentMaster===null){
            const responseGroup = await api.get('/groups');
    
            setRender(responseGroup.data);
         }else if(componentMaster==="reload"){
            const responseGroup = await api.get('/groups');
    
            setRender(responseGroup.data);
         }else{
            viewContentMaster(componentMaster);
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

    async function viewContentMaster(component){
                
        if(component.element.hasOwnProperty("content")){
                const responseGroup = await api.get(component.path, {
                headers: {
                     _id: component.element._id
                    }});
                    var newContent = [];
                    newContent.push(responseGroup.data);
                    console.log(newContent);
                    setPrimeiraVez(false);
                    setContent(newContent);
                } else {
                    const responseGroup = await api.get(component.path, {
                        headers: {
                             _id: component.element.holder[component.element.holder.length-1]
                            }});
                            var newContent = [];
                            newContent.push(responseGroup.data);
                            console.log(newContent);
                            setPrimeiraVez(false);
                            setContent(newContent);
                }
                   
        }

        async function viewContent(group){
                
            const responseGroup = await api.get('/search/groups', {
            headers: {
                 _id: group._id
                }});
                var newContent = [];
                newContent.push(responseGroup.data);
                console.log(newContent);
                setPrimeiraVez(false);
                setContent(newContent);
               
    }
    
    function seeContent(){
        return(
            content.map( comp => (
                comp.content.map( item => (
                <div className="buttonComponent" 
                onClick={()=> { setComponent(item); setType("Grupo"); setSectionSee(!sectionSee); }}
                onDoubleClick={ ()=> { viewContent(item); }  }
                key={item._id}>
                <GroupIcon style={{margin: '0px 10px 0px 10px'}}/>
                <strong id="name">{item.name}</strong>
                </div>
                ))                  
               
                ))
        )
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
                                       onDoubleClick={ ()=> { viewContent(group); }  }
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
                           
                     
                        { seeContent()}
                         {seeLocks() }
                               
                       </div>
               
                       {sectionSee ? <SectionRight component={component} type={type} onDelete={onDelete} onClose={()=> setSectionSee(false)} onUpload={onUpdate}/> : null}
                       </div>
                   );
            }
             

}

export default Group;