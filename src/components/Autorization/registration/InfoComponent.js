import React from 'react';

const inputs = ['name', 'surname', 'email', 'phone', 'password'];


const InfoComponent = ({changeField, arr}) => {
    return (
        <div className='info'>
            {inputs.map((item, index) =>
                <input
                    value={arr[index]}
                    key={item}
                    type='text'
                    placeholder={item}
                    onChange={(event) => changeField(event, item)}
                    required
                />)}
        </div>
    )
};

export default InfoComponent;