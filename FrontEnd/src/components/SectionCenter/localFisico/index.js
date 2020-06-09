import React, {useState, useEffect} from "react";
import "./style.css";

import api from '../../../services/api';
import SectionRight from '../../SectionRight';

import GroupIcon from '@material-ui/icons/PeopleAltOutlined';
import LockIcon from '@material-ui/icons/LockOutlined';


function LocalFisico({idCloseSectionRight= "local"}) {
    
    
    const [content, setContent] = useState([]);

    const [sectionSee, setSectionSee] = useState(false);
    const [component, setComponent] = useState('');
    const [type, setType] = useState("");

    const [typeComponent, setTypeComponent] = useState("localFisico");



     useEffect(()=>{
        async function loaderComponents() {
            var data = await sessionStorage.getItem("localId");
            var componentMaster = await JSON.parse(data);

        const response = await api.get('/search/localFisico', {
            headers: {
                 _id: componentMaster
                }});

                
        var newContent = [];
        newContent.push(response.data)
        console.log(newContent)
        setContent(newContent)

                }
         loaderComponents();
     }, []);

     async function reloadComponents() {
        var data = await sessionStorage.getItem("localId");
        var componentMaster = await JSON.parse(data);

      
        const response = await api.get('/search/localFisico', {
             headers: {
                 _id: componentMaster
            }});

        var newContent = [];
        newContent.push(response.data)
        
        setContent(newContent)
          
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
       
        
        const response = await api.get(component.path, {
            headers: {
                 _id: component.id
                }});
        
         var newContent = [];
        newContent.push(response.data)
        
        setContent(newContent)

        if(component.type==="localFisico") setTypeComponent("localFisico");
        if(component.type==="group") setTypeComponent("Group");

        }

    function seeContent(){
        
        if (typeComponent==="Group") return(
            
            content.map( comp => {
                if(comp.content===undefined ) return null;
                else return comp.content.map( item => (
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
               
    })
        );
        else return (
            content.map( comp => {
                if(comp.groups===undefined ) return null;
                else {
                    console.log(comp);
                return comp.groups.map( item => (
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
                )) }                 
               
    })
        )

    }
    
    function seeLocks(){
         return(
            content.map( comp => {
                if(comp.locks===undefined ) return null;
                else return comp.locks.map( item => {
                    console.log({item, comp}); return(
                   <div className="buttonComponent" 
                   onClick={()=> { setComponent(item); setType("Trava"); setSectionSee(!sectionSee); }}
                   key={item._id}>
                   <LockIcon style={{margin: '0px 10px 0px 10px'}}/>
                   <strong id="name">{item.name}</strong>
                   </div>)
                })
                })
        )
    }
            
       
                return( 
                    <div id="local" onClick={handleClose}>
                        
                        <div className="section" id="section"> 
                               <spam >Local Físico</spam>
                       </div> 
           
                   <div className="sectionComponent">
                       {seeContent()}
                       {seeLocks()}
                   </div>
           
                   {sectionSee ? <SectionRight component={component} type={type} onDelete={onDelete} onClose={()=> setSectionSee(false)} onUpload={onUpdate}/> : null}
                   </div>
               );
            

}

export default LocalFisico;