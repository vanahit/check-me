import React from 'react';
import ReactPlayer from 'react-player'


const VideoCreator = (props) => {
    return (

        <ReactPlayer
            url={props.video}
            width='100%'
            height='100%'
            playing={true}
            controls={true}
            volume={0}
            loop={true}

        />

    )
}

export default VideoCreator;