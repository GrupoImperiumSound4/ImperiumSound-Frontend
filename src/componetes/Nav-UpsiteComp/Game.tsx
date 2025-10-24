import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/iconojugo.css"
import {  motion ,AnimatePresence } from "framer-motion";

export function IconGame () {

    const navegar = useNavigate();
    
    const [abierto,setAbierto] = useState(false)
    
        const toggleMenu = () => {
             setAbierto(!abierto);
        };


    return (
    <>
        <div className="relative">
    <div className="icon-jugo">
        <button
        onClick={toggleMenu}
        style={{
            border: "none",
            background: "transparent",
            padding: 0,
            cursor: "pointer",     
            overflow: "hidden",       
            width: "3.5em",
            height: "3.5em",
        }}
        >
            
            <img
            src="../../../public/iconojugo.svg"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",     
                    

            }}
            />
            
        </button>
    </div>
    
    <AnimatePresence>
    {abierto && (
    <motion.div
         className="jarra"
         initial={{ opacity: 0, x: 50 }} 
         animate={{ opacity: 1, x: 0 }}       
         exit={{ opacity: 0, x: 50 }}       
         transition={{ duration: 0.5 }}       
        >
         <a className="jugos" onClick={() => navegar ("/didactico3")}>JaviBlock</a>
         

    </motion.div>
    )}
    </AnimatePresence>
    </div>
    </>
    )
}