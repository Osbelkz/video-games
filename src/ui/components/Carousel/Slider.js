import React from 'react'
import classes from './Slider.module.scss'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export const Slider = React.memo(({images}) => {
    return (
        <section className={classes.carousel}>
            <h2>Screenshots</h2>
            <Slide easing="ease">
                {images.map(image => {
                    return <div className={classes.eachSlide} key={image.id}>
                        <div style={{'backgroundImage': `url(${image.image})`}}>
                        </div>
                    </div>
                })}
            </Slide>
        </section>
    )
});
