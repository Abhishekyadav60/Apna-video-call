import React, { useEffect, useState } from 'react'
import {X, Menu} from 'lucide-react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [md, setMd] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 768) {
                setIsOpen(false);
                setMd(false);
            } else {
                console.log(true)
                setMd(true);
                setIsOpen(true)
            }
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    },[])

    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className="top">
                    <div className='navHeader'>
                        <h2>Apna Video Call</h2>
                    </div>
                    {(!md && !isOpen) && <div onClick={() => setIsOpen(true)}><Menu/></div>}
                    {(!md && isOpen) && <div onClick={() => setIsOpen(false)}><X/></div>}
                </div>
                {(md || isOpen) && <div className='navlist'>
                    <p onClick={() => {
                        router("/aljk23")
                    }}>Join as Guest</p>
                    <p onClick={() => {
                        router("/auth")
                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")

                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>}
            </nav>


            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>

                    <p>Cover a distance by Apna Video Call</p>
                    <div role='button'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>

                    <img src="/mobile.png" alt="" />

                </div>
            </div>
        </div>
    )
}
