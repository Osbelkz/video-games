import React, {useState} from 'react';
import classes from "./Select.module.scss"
import useComponentVisible from "../../../hooks/useComponentVisible";

const Select = React.memo(({options, title, onChange}) => {

    const [selectedOption, setSelectedOption] = useState("");

    const toggleOptions = (value) => {
        setIsComponentVisible(value => !value);
    };
    const selectOption = (e) => {
        console.log(e)
        setSelectedOption(e.target.innerHTML);
        onChange(e.currentTarget.dataset.option);
    };

    let {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

    return (
        <div className={classes.select}
             onClick={toggleOptions}>
            <h4>{title} {selectedOption} </h4>
            {isComponentVisible && <div ref={ref} className={classes.optionsWrapper}>
                <ul className={classes.options}>
                    {options.map((option) => {
                        return <li className={classes.option}
                                   data-option={option.id}
                                   onClick={selectOption}
                                   key={option.id}
                        >{option.name}</li>
                    })}
                </ul>
            </div>}
        </div>
    );
});

export default Select;
