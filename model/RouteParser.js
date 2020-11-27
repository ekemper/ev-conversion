
import * as jsonRoute from '../drivingRoutes/homeToWork.json'


export default class RouteParser {
    constructor(jsonRoute = null) {
        this.jsonRoute = jsonRoute
    }
}

const parser = new RouteParser(jsonRoute)