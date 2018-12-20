import React from 'react';

const ImgComponent = () => {
    return (
        <div className='info'>
            <div className='img-div'>
                <img
                    src="https://virtual-strategy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                    alt=""/>
            </div>
            <input type="file" placeholder='file'/>

        </div>
    )
}; 

export default ImgComponent;