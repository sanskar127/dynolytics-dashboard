import React from 'react'

interface propsInterface {
    title: string;
    element1: JSX.Element;
    element2: JSX.Element;
}

const Navbar: React.FC<propsInterface> = ({ title, element1, element2 }) => {
    return (
        <div className="navbar rounded-s-lg bg-base-200 shadow-l">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">{title}</a>
            </div>
            <div className="gap-2">
                {element1}
                {element2}
            </div>
        </div>
    )
}

export default Navbar
