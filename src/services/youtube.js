import { parse } from "subtitle";

export class Youtube {
    constructor() {
        this.subCache = {};
        this.processSubData = this.processSubData.bind(this);
        window.addEventListener("subs_data", this.processSubData);
    }

    init() {
        this.injectScript()
    }

    async getSubs(language) {
        if (language === "") return parse("");
        const videoId = this.getVideoId();
        const urlObject = new URL(this.subCache[videoId][language])
        urlObject.searchParams.set("fmt", "vtt")
        console.log(urlObject)
        const subUri = urlObject.href
        console.log(subUri)
        const resp = await fetch(subUri);
        const text = await resp.text();
        return parse(text);
    }

    settingSelector() {
        return ".ytp-right-controls > .ytp-size-button";
    }

    playerContainerSelector() {
        return ".html5-video-player";
    }

    getVideoId() {
        const regExpression = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = window.location.href.match(regExpression);
        if (match && match[2].length === 11) {
            return match[2];
        }
        console.error("Can't get youtube video id");
    }

    injection() {
        window.setInterval(() => {
            const player = document.getElementById("movie_player");
            const subsToggleElement = document.querySelector(".ytp-subtitles-button");

            if (player) {
                if (!window.isLoaded) {
                    window.isLoaded = true;
                    window.dispatchEvent(new CustomEvent("subsVideoReady"));
                    if (subsToggleElement.getAttribute("aria-pressed") === "true") {
                        player.toggleSubtitles();
                        player.toggleSubtitles();
                    } else {
                        window.dispatchEvent(new CustomEvent("subsSubtitlesChanged", {detail: ""}));
                    }
                }
            } else {
                window.isLoaded = false;
            }

            if (subsToggleElement) {
                if (window.subtitlesEnabled && subsToggleElement.getAttribute("aria-pressed") === "false") {
                    window.subtitlesEnabled = false;
                    window.dispatchEvent(new CustomEvent("subsSubtitlesChanged", {detail: ""}));
                }
            }
        }, 500);
        (open => {
            XMLHttpRequest.prototype.open = function (method, url) {
                if (url.match(/^http/g) !== null) {
                    const urlObject = new URL(url);
                    if (urlObject.pathname === "/api/timedtext") {
                        window.subtitlesEnabled = true;
                        const lang = urlObject.searchParams.get("tlang") || urlObject.searchParams.get("lang")
                        window.dispatchEvent(new CustomEvent("subs_data", { detail: urlObject.href }));
                        window.dispatchEvent(
                            new CustomEvent("subsSubtitlesChanged", { detail: lang })
                        );
                    }
                }
                open.call(this, method, url);
            };
        })(XMLHttpRequest.prototype.open);
    };

    injectScript() {
        const sc = document.createElement("script");
        const scData = this.injection.toString().split('injection() {')[1].slice(0, -1)
        sc.innerHTML = `(function() {${scData}})()`;
        document.head.appendChild(sc);
        document.head.removeChild(sc);
    }

    processSubData(event) {
        const urlObject = new URL(event.detail)
        const lang = urlObject.searchParams.get("tlang") || urlObject.searchParams.get("lang")
        const videoId = urlObject.searchParams.get("v")
        this.subCache[videoId] = {}
        this.subCache[videoId][lang] = urlObject.href
    }

}