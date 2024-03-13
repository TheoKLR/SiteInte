export {}

/*import { useState} from 'react';
import './users.css';
import UserInfo from '../users/actions/userInfo';
import Role from '../users/actions/role';

export const TraitementDesires = () => {

  const [activeComponent, setActiveComponent] = useState<'role' | 'userInfo' | null>(null);

  const handleButtonClick = (component: 'role' | 'userInfo') => {
    setActiveComponent(component);
  };

  return (
    <>
      <div id={"button_container"}>
        <button id="left" onClick={() => handleButtonClick('userInfo')}>Infos utilisateur</button>
        <button id="right" onClick={() => handleButtonClick('role')}>Infos rôle</button>
      </div>
      <div>
        {activeComponent === 'userInfo' && <UserInfo />}
        {activeComponent === 'role' && <Role />}
      </div>
    </>
  )

}*/