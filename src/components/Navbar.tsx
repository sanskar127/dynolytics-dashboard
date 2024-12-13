import React from 'react'

interface propsInterface {
    title: string;
    element1: JSX.Element;
    element2: JSX.Element;
}

const Navbar: React.FC<propsInterface> = ({ title, element1, element2 }) => {
    return (
        <div className="px-6 navbar bg-base-100">
            <div className="flex-1">
                <span className="text-xl">{title}</span>
            </div>

            {element1}
            {element2}
        </div>
    )
}

export default Navbar
