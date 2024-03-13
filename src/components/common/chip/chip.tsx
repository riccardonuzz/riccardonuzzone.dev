import { ReactNode } from "react"


interface ChipProps {
    children: ReactNode
}

const Chip = ({ children }: ChipProps) => {
    return (
        <div className="h-7 rounded-3xl bg-white/30 flex items-center pr-3">
            {children}
        </div>
    )
}

export default Chip