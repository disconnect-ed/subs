export class Youtube {

    init() {
        this.injectScript()
    }

    settingSelector() {
        return ".ytp-right-controls > .ytp-size-button";
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
                    window.dispatchEvent(new CustomEvent("easysubsSubtitlesChanged", {detail: ""}));
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


}