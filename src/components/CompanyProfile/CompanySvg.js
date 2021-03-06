import React from 'react';

const CompanySvg = ({ width = '100%', height = '100%',  viewBox = "-250 -250 1000 1000"}) =>  {
      return (
          <div>
             <svg  width={width}   height={height}   viewBox={viewBox} 
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
            
            <path d="M435.248,440.934h-0.164V16.418C435.084,7.351,427.733,0,418.666,0H93.334
                c-9.066,0-16.418,7.351-16.418,16.418v424.516H24.905l-0.321-0.004v0.004h-0.16v70.687v0.215l0,0V512h463.152v-71.066H435.248z
                M379.982,166.742h-41.328V86.383h41.328V166.742z M379.982,279.641h-41.328v-80.359h41.328V279.641z M338.654,357.309v-33.293
                h41.328v33.293h-41.234H338.654z M290.44,86.383v80.359h-68.829h-0.05V86.383h68.828H290.44z M221.561,279.641v-80.359h68.879
                v80.359h-68.829H221.561z M290.44,324.016v144.359h-68.879V324.016H290.44z M132.018,357.309v-33.293h41.328v33.293h-41.234
                H132.018z M173.346,279.641h-41.328v-80.359h41.328v80.273V279.641z M173.346,166.742h-41.328V86.383h41.328v80.273V166.742z"></path>
             </svg>
        </div>
        );
  };
  
  export default CompanySvg
        