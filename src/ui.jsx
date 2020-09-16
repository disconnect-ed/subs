import React from 'react'
import ReactDOM from 'react-dom'
import {SettingsButton} from "./components/Settings/SettingsButton.jsx";

export class UI {
    static renderSettings(settingSelector) {
        const prevNode = document.querySelector(".subs-settings");
        if (prevNode) return;
        const referenceNode = document.querySelector(settingSelector);
        const parentNode = referenceNode.parentNode;
        const settingNode = document.createElement("div");
        settingNode.className = "subs-settings ytp-button";
        parentNode.insertBefore(settingNode, referenceNode);

        ReactDOM.render(<SettingsButton />, document.querySelector(".subs-settings"));
    }
}