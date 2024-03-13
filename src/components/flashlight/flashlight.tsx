'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './flashlight.module.css'


const Flashlight = () => {
    const [position, setPosition] = useState({ top: 0, left: 0 })

    const onMouseMove = (event: MouseEvent) => {
        setPosition({
            top: event.pageY - 250,
            left: event.pageX - 250
        })
    }

    useEffect(() => {
        document.body.addEventListener('mousemove', onMouseMove)

        return () => {
            document.body.removeEventListener('mousemove', onMouseMove)
        }
    }, [])

    return (
        <div className='top-0 left-0 h-full fixed max-md:hidden -z-[1]' style={{ width: 'calc(100% - 11px)' }} >
            <div
                className={styles.light}
                style={position}
            ></div>
        </div>
    )
}

export default Flashlight