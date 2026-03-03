import React from 'react'

const FormGroup = ({ label, type, placeholder, value, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor={label}>{label}</label>
            <div className="input-wrapper">
                <input
                value={value}
                onChange={onChange}
                type={type} id={label} name={label} placeholder={placeholder} />
            </div>
        </div>


    )
}

export default FormGroup