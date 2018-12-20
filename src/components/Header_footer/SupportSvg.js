import React from 'react';

const SupportSvg = ({ width = '20px', height = '100%',  viewBox="0 0 24 24"}) =>  {
      return (
          <div>
             <svg  width={width}   height={height}   viewBox={viewBox} 
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <g id="Support" transform="translate(-656 -3786)">
                <rect id="Rectangle_35" data-name="Rectangle 35"  width="24" height="24" fill="none"  stroke='none' transform="translate(656 3786)"/>
                <g id="Group_98" data-name="Group 98" transform="translate(-1)">
                <g id="Ellipse_1" data-name="Ellipse 1" fill='none' transform="translate(657 3786)">
                    <circle cx="12" cy="12" r="12" />
                    <circle  cx="12" cy="12" r="11.5" />
                </g>
                <text id="_" data-name="?"  transform="translate(669 3803)"><tspan x="-3.305" y="0">?</tspan></text>
                </g>
            </g>
            </svg>
        </div>
        );
  };
  
  export default SupportSvg