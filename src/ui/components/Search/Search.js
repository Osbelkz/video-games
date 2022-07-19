import React, {useState} from 'react';
import classes from "./Search.module.scss"

const Search = React.memo(({getSearchWord}) => {
    const [text, setText] = useState("");

    const onChangeHandler = (e) => {
        setText(e.target.value);
    };

    const onClickHandler = () => {
        getSearchWord(text);
    };

    return (
        <input className={classes.search}
               type="search"
               placeholder={"search..."}
               value={text}
               onChange={onChangeHandler}
               onKeyDown={(e) => e.key === "Enter" && onClickHandler()}
        />
    );
});

export default Search;
