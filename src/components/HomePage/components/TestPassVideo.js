import React, {Component} from 'react';
import ReactPlayer from 'react-player'


class Video extends Component {
    render () {
        return (
         
            <ReactPlayer
              url={testPassVideo}
              width='100%'
              height='100%'
              playing={true}
              controls={true}
              volume={0}
              loop={true}
              
            />
          
        )
      }
}   
       
export default Video;