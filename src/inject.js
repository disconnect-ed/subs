import {detectService} from "./utils/utils";

try {
    const service = detectService()
    console.log(service)
} catch (e) {
    console.log('unknown error: ', e)
}