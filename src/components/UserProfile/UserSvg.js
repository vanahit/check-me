import React from 'react';

const UserSvg = ({ width = '80%', height = '80%',  viewBox = "-3 -3 30 30"}) =>  {
      return (
          <div>
             <svg  width={width}   height={height}   viewBox={viewBox} 
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
            
            <g id="info"/><g id="icons"><g id="user"><ellipse cx="12" cy="8" rx="5" ry="6"/><path d="M21.8,19.1c-0.9-1.8-2.6-3.3-4.8-4.2c-0.6-0.2-1.3-0.2-1.8,0.1c-1,0.6-2,0.9-3.2,0.9s-2.2-0.3-3.2-0.9   
             C8.3,14.8,7.6,14.7,7,15c-2.2,0.9-3.9,2.4-4.8,4.2C1.5,20.5,2.6,22,4.1,22h15.8C21.4,22,22.5,20.5,21.8,19.1z"/>
             </g></g>
             </svg>
        </div>
        );
  };
  
  export default UserSvg
        
