import React, {ChangeEvent} from 'react';
import styles from './Input.module.css';

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({placeholder, value, onChange}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };
    return (<div className={styles.inputWrapper}>
            <input className={styles.input} type="text" placeholder={placeholder} value={value}
                   onChange={handleChange}/>
        </div>)
};

export default Input;
