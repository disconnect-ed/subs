import {detectService} from "./utils/utils";
import {UI} from "./ui.jsx";

try {
    const service = detectService()
    console.log('Проверка')
    if (service) {
        console.log('Subs initialized')
        window.addEventListener("subsVideoReady", () => {
            console.log("subsVideoReady");


            window.addEventListener("subsSubtitlesChanged", (event) => {
                console.log("subsSubtitlesChanged Doooooooone");
                UI.renderSettings(service.settingSelector());
                service.getSubs(event.detail).then(subs => {
                    console.log(subs)
                });
            });
        });
        service.init()
    }
} catch (e) {
    console.log('unknown error: ', e)
}