'use client'

import { CSSProperties, Children, MouseEvent, ReactElement, ReactNode, TouchEvent, cloneElement, createElement, useEffect, useRef, useState } from 'react'
import './animated-card.css'

interface ParallaxCardProps {
    isStatic?: boolean;
    borderRadius?: string;
    shineStrength?: number;
    cursorPointer?: boolean;
    onClick?: (event: MouseEvent) => void;
    style?: CSSProperties;
    className?: string;
    children: ReactElement[];
}

const ParallaxCard = ({
    isStatic = false,
    borderRadius = '20px',
    shineStrength = 0.4,
    cursorPointer = true,
    style = {},
    onClick,
    className = '',
    children
}: ParallaxCardProps) => {
    const [rootElemWidth, setRootElemWidth] = useState(0)
    const [rootElemHeight, setRootElemHeight] = useState(0)
    const [isOnHover, setIsOnHover] = useState(false)
    const [container, setContainer] = useState({})
    const [shine, setShine] = useState({})

    const layers = (children ? (children as ReactElement[]).length ? children : [children] : [createElement('div', { style, className }, [])])
    const [layersTransform, setLayersTransform] = useState<ReactNode[] | { transform: string }[]>([])

    const node = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isStatic) {
            setRootElemHeight(node.current?.clientHeight || node.current?.offsetHeight || node.current?.scrollHeight || 0)
            setRootElemWidth(node.current?.clientHeight || node.current?.offsetHeight || node.current?.scrollHeight || 0)
        }
    }, [isStatic])

    const handleMove = ({ pageX, pageY }: { pageX: number, pageY: number }) => {
        const layerCount = layers ? layers.length : 1
        const bodyScrollTop =
            document.body.scrollTop ||
            document.getElementsByTagName('html')[0].scrollTop
        const bodyScrollLeft = document.body.scrollLeft
        const offsets = node.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 }
        const wMultiple = 320 / rootElemWidth
        const multiple = wMultiple * 0.02
        const offsetX =
            0.52 - (pageX - offsets.left - bodyScrollLeft) / rootElemWidth
        const offsetY =
            0.52 - (pageY - offsets.top - bodyScrollTop) / rootElemHeight
        const dy = pageY - offsets.top - bodyScrollTop - rootElemHeight / 2
        const dx = pageX - offsets.left - bodyScrollLeft - rootElemWidth / 2
        const yRotate = (offsetX - dx) * multiple
        const xRotate =
            (dy - offsetY) * (Math.min(offsets.width / offsets.height, 1) * multiple)
        const arad = Math.atan2(dy, dx)
        const rawAngle = (arad * 180) / Math.PI - 90
        const angle = rawAngle < 0 ? rawAngle + 360 : rawAngle

        setContainer({
            transform: `rotateX(${xRotate}deg) rotateY(${yRotate}deg) ${isOnHover ? ' scale3d(1.07,1.07,1.07)' : ''}`
        })

        setShine({
            background: `linear-gradient(${angle}deg, rgba(255, 255, 255, ${((pageY - offsets.top - bodyScrollTop) / rootElemHeight) *
                shineStrength
                }) 0%, rgba(255, 255, 255, 0) 80%)`,
            transform: `translateX(${offsetX * layerCount - 0.1}px) translateY(${offsetY * layerCount - 0.1
                }px)`
        })

        let layersToBeSetted = []

        if (layers) {
            layersToBeSetted = layers.map((_, idx: number) => ({
                transform: `translateX(${offsetX * layerCount * ((idx * 1) / wMultiple)
                    }px) translateY(${offsetY * layerCount * ((idx * 1) / wMultiple)
                    }px)`
            }))
        } else {
            layersToBeSetted = children
        }

        setLayersTransform(layersToBeSetted)
    }

    const handleTouchMove = (evt: TouchEvent) => {
        evt.preventDefault()
        const { pageX, pageY } = evt.touches[0]
        handleMove({ pageX, pageY })
    }

    const handleEnter = () => {
        setIsOnHover(true)
    }

    const handleLeave = () => {
        setIsOnHover(false)
        setContainer({})
        setShine({})
        setLayersTransform([])
    }

    const renderLayers = () => {
        return (
            <div
                className={`${className} parallax-card-layers`}
                style={{
                    borderRadius,
                    ...style
                }}
            >
                {
                    layersTransform &&
                    Children.map(layers as ReactElement[], (child: ReactElement, idx) => {
                        const childStyle = child?.props.style
                        const layersData = layersTransform[idx] ? layersTransform[idx] : {}
                        return cloneElement(child, {
                            style: {
                                ...childStyle,
                                transition: 'all 0.1s ease-out',
                                ...layersData
                            }
                        })
                    })
                }
            </div>
        )
    }


    return (
        <div style={{ display: 'flex' }}>
            <div
                onClick={onClick}
                style={{
                    borderRadius,
                    transformStyle: 'preserve-3d',
                    WebkitTapHighlightColor: 'rgba(#000, 0)',
                    cursor: cursorPointer ? 'pointer' : undefined,
                    // transform: `perspective(${rootElemWidth * 3}px)`,
                    // zIndex: isOnHover ? '9' : 'unset',
                    width: '100%'
                }}
                onMouseMove={handleMove}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                onTouchMove={handleTouchMove}
                onTouchStart={handleEnter}
                onTouchEnd={handleLeave}
                className='parallax-card'
                ref={node}
            >
                <div
                    className='parallax-card-container'
                    style={{
                        position: 'relative',
                        borderRadius: borderRadius,
                        transition: 'all 0.2s ease-out',
                        ...container
                    }}
                >
                    <div
                        className='parallax-card-shadow'
                        style={{
                            position: 'absolute',
                            // top: '5%',
                            // left: '5%',
                            // right: '5%',
                            // bottom: '5%',
                            // transition: 'all 0.2s ease-out',
                            // zIndex: '0',
                            // boxShadow: isOnHover
                            //     ? '0 45px 100px rgba(14, 21, 47, 0.4), 0 16px 40px rgba(14, 21, 47, 0.4)'
                            //     : '0 8px 30px rgba(14, 21, 47, 0.6)'
                        }}
                    />
                    <div
                        className='parallax-card-shine'
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            borderRadius,
                            // background: `linear-gradient(135deg,rgba(255, 255, 255, ${shineStrength / 1.6
                            //     }) 0%,rgba(255, 255, 255, 0) 60%)`,
                            // zIndex: '8',
                            ...shine
                        }}
                    />
                    {renderLayers()}
                </div>
            </div>
        </div>
    )
}

export default ParallaxCard