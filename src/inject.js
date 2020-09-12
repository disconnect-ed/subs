import {detectService} from "./utils/utils";

try {
    const service = detectService()
    console.log('Проверка')
    if (service) {
        console.log('Subs initialized')
        window.addEventListener("subsVideoReady", () => {
            console.log("subsVideoReady");


            window.addEventListener("subsSubtitlesChanged", (event) => {
                console.log("subsSubtitlesChanged Doooooooone");
            });
        });
        service.init()
    }
} catch (e) {
    console.log('unknown error: ', e)
}