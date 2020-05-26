import React, {useState} from 'react';
import './style.css';

import MenuItem from './menuItem';
import MenuIcon from '@material-ui/icons/Menu';

 function ButtonUser({idUser = () => {}, user, load}) {

  const [box, setBox] = useState(false);

  function handleClick() {
    setBox(!box);
  };

  return (
    <>
      <div>
      <button id="menuUser" onClick={handleClick}>
        <MenuIcon/>
      </button>     
    </div>
     {box ? <MenuItem user={user} load={load} idUser={idUser}/> : null}
     </>
  );
}

export default ButtonUser;