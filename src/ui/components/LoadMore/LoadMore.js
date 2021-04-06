import React from 'react';
import {useUnlimScroll} from "../../../hooks/useUnlimScroll";
import Preloader from "../Preloader/Preloader";

const LoadMore = React.memo(({getMoreCards, isMorePages}) => {

    const {ref} = useUnlimScroll(getMoreCards, isMorePages)

    return (
        <>
            {isMorePages &&
            <div ref={ref}><Preloader/></div>
            }
        </>
    );
});

export default LoadMore;
