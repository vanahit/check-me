import React from 'react';

const UsersIcon = ({ width = '110%', height = '100%',  viewBox="0 0 48 48"}) =>  {
      return (
          <div>
             <svg  width={width}   height={height}   viewBox={viewBox} 
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g id="Users" transform="translate(-1352 -886)">
                <g id="Group_669" data-name="Group 669">
                <rect id="Rectangle_293" data-name="Rectangle 293" fill='none' width="48" height="48" transform="translate(1352 886)"/>
                <g id="multiple-users-silhouette" transform="translate(1352 883.652)">
                    <path id="Path_98" data-name="Path 98" fill='#fff' d="M28.966,13.213a8.628,8.628,0,0,1,4.059,6.416,6.957,6.957,0,1,0-4.059-6.416ZM24.354,27.487a6.971,6.971,0,1,0-7.041-6.97A7.006,7.006,0,0,0,24.354,27.487Zm2.986.475H21.367a8.981,8.981,0,0,0-9.014,8.926v7.234l.019.113.5.156A41.4,41.4,0,0,0,25.13,46.348c6.625,0,10.464-1.87,10.7-1.99l.47-.235h.05V36.888A8.978,8.978,0,0,0,27.34,27.962Zm11.647-7.2H33.06a8.553,8.553,0,0,1-2.678,5.984A10.62,10.62,0,0,1,38.032,36.9v2.229a24.452,24.452,0,0,0,9.447-1.965l.47-.236H48V29.69A8.98,8.98,0,0,0,38.987,20.765ZM12,20.291a7.043,7.043,0,0,0,3.744-1.076,8.612,8.612,0,0,1,3.275-5.5c.007-.131.02-.26.02-.392A7.04,7.04,0,1,0,12,20.291Zm6.322,6.459A8.559,8.559,0,0,1,15.648,20.8c-.22-.016-.437-.033-.661-.033H9.014A8.98,8.98,0,0,0,0,29.69v7.235l.019.112.5.157a42.633,42.633,0,0,0,10.151,1.889V36.9A10.623,10.623,0,0,1,18.324,26.749Z" transform="translate(0 0)"/>
                </g>
                </g>
            </g>
            </svg>
        </div>
        );
  };
  
  export default UsersIcon