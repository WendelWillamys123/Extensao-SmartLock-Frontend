import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function FileSystemNavigator() {

    const [groups, setGroups] = useState([]);

    useEffect(()=>{
        async function loaderGroups() {
            const response = await api.get('/groups');
    
            setGroups(response.data);
         }
         loaderGroups();
     }, []);

     function check(group){
      if (group.holder[group.holder.length]===group.holder[0]) { 
        console.log(group.name);
        var newItem = React.createElement("TreeItem", {nodeId: `TreeItem${group._id}`}, {label: group.name});
        return({newItem});
      }
      else{
        var newItem = React.createElement("TreeItem", {nodeId: `TreeItem${group._id}`}, {label: group.name})
        
        console.log(newItem);

        console.log(`TreeItem${group.holder[group.holder.length-1]}`)

      }
     }

  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="1" label="Applications">
        <TreeItem nodeId="2" label="Calendar" />
        <TreeItem nodeId="3" label="Chrome" />
        <TreeItem nodeId="4" label="Webstorm" />
      </TreeItem>
     
     
            {groups.map(group => (
             check(group)
                )
              )}
       
    </TreeView>
  );
}