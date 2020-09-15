import React, {useState} from 'react'
import Logo from '../../img/logo.svg'
import '../../css/styles.css'
import {SettingsWindow} from "./SettingsWindow.jsx";

export const SettingsButton = () => {
    const [showWindow, toggleShowWindow] = useState(false)
    return (
        <div className="subs-settings-container">
            <div onClick={() => toggleShowWindow(!showWindow)} className="subs-settings-container-logo">
                <Logo/>
            </div>
            <SettingsWindow display={showWindow ? 'flex' : 'none'}/>
        </div>
    )
}