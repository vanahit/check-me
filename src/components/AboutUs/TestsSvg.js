import React from 'react';

const TestsIcon = ({ width = '110%', height = '100%',  viewBox="0 0 48 48"}) =>  {
      return (
          <div>
             <svg  width={width}   height={height}   viewBox={viewBox} 
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                 <g id="tests" transform="translate(-474 -916)">
                    <g id="black-check-box-with-white-check" transform="translate(478 920)">
                    <g id="check-box">
                        <path id="Path_68" data-name="Path 68" fill='#fff' d="M35.556,0H4.444A4.458,4.458,0,0,0,0,4.444V35.556A4.458,4.458,0,0,0,4.444,40H35.556A4.458,4.458,0,0,0,40,35.556V4.444A4.458,4.458,0,0,0,35.556,0Zm-20,31.111L4.444,20l3.111-3.111,8,8L32.444,8l3.111,3.111Z"/>
                    </g>
                    </g>
                    <rect id="Rectangle_297" data-name="Rectangle 297"  fill='none' width="48" height="48" transform="translate(474 916)"/>
                </g>
            </svg>
        </div>
        );
  };
  
  export default TestsIcon