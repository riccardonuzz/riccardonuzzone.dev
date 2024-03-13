'use client'

import ParallaxCard from "@/components/common/animated-card/animated-card";
import styles from './window-card.module.css'
import { ReactNode, useState } from "react";
import classnames from "classnames";


interface WindowCard {
    title?: string | ReactNode;
    defaultOpen?: boolean;
    enableControls?: boolean;
    children: ReactNode;
    className?: string;
}

const WindowCard = ({ title = '', defaultOpen = false, enableControls = false, className = '', children }: WindowCard) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    const isOpenClass = isOpen ? styles['window-card-open'] : styles['window-card-closed']

    return (
        <ParallaxCard
            cursorPointer={false}
            shineStrength={0.3}
            className={classnames(styles['window-card'], className, isOpenClass)}
        >


            <div className="p-5 pt-3 flex items-center select-none">
                {
                    enableControls && <div className="flex mr-2 gap-1">
                        <div className="bg-green-600 hover:bg-green-800 rounded-full cursor-pointer h-4 w-4 flex items-center justify-center font-extrabold text-black text-[10px]">x</div>
                        <div className="bg-orange-600 hover:bg-orange-800 rounded-full cursor-pointer h-4 w-4 flex items-center justify-center font-extrabold text-black pb-[1px]" onClick={() => setIsOpen(false)}>-</div>
                        <div className="bg-red-800 hover:bg-red-900 rounded-full cursor-pointer h-4 w-4 flex items-center justify-center font-extrabold text-black text-[7px]" onClick={() => setIsOpen(true)}>▢</div>
                    </div>
                }
                <h2 className="text-lg font-bold">{title}</h2>

            </div>
            <div className="p-5 pt-3 text-sm">
                {children}
            </div>
        </ParallaxCard>

    )
}

export { WindowCard }