import {Youtube} from "../services/youtube";


export const detectService = () => {
    const titleContent = document.querySelector('title').textContent
    if (titleContent.includes("YouTube") || window.location.host === "www.youtube.com") {
        document.querySelector('html').id = "youtube"
        return new Youtube
    }
    return null
}