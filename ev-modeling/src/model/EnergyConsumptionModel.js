import homeToWork from '../drivingRoutes/homeToWork.json'
import VehicleProperties from "./VehicleProperties"
import VehicleDynamics from "./VehicleDynamics"
import RouteParser from './RouteParser'

export default class EnergyConsumptionModel {
    constructor() {
        const parser = new RouteParser(homeToWork)
        this.drivingRoute = parser.jsonRoute

        this.vehicleDynamics = new VehicleDynamics()

        this.vehicle = new VehicleProperties({
            mass: {
                lb: 3000
            },
            dragCoeff: 0.25,
            rollResistCoeff: 0.01,
            frontArea: 2.5 // m^2
        })

        this.EnergyConsumedForRouteJoules = 0
        this.calculateTotalConsumed()

        this.EnergyConsumedForRouteKWh = this.EnergyConsumedForRouteJoules / 3.6e+6
    }

    /**
     * Energy expended to overcome dissipative forces for each segment along the route
     * 
     * note: the velocity of the car is assumed to be constant 30 mph for each segment
     *  accounting for acceleration and deceleration ( regen braking... ) will come next 
     */

    dynamicsForSegment(segment) {

        const speed = 13.4112 // m/s , 30 mph
        const windSpeed = 0

        const FAirResist = this.vehicleDynamics.dragForce(
            this.vehicle.props.frontArea,
            this.vehicle.props.dragCoeff,
            speed,
            windSpeed
        )

        const FRollingResist = this.vehicleDynamics.rollingForce(
            this.vehicle.props.mass.kg,
            this.vehicle.props.rollResistCoeff,
            segment.roadAngle
        )

        const FClimbing = this.vehicleDynamics.gradeForce(
            this.vehicle.props.mass.kg,
            segment.roadAngle
        )
        return {
            energyForSegment: segment.distanceToNextPoint * (FAirResist + FRollingResist + FClimbing),
            FAirResist,
            FRollingResist,
            FClimbing
        }
    }

    calculateTotalConsumed() {
        for (let i = 0; i < this.drivingRoute.points.length; i++) {
            const segment = this.drivingRoute.points[i];
            const dynamicsForSegment = this.dynamicsForSegment(segment)

            if(!isNaN(dynamicsForSegment.energyForSegment)) {
                this.EnergyConsumedForRouteJoules = this.EnergyConsumedForRouteJoules + dynamicsForSegment.energyForSegment
            }

            this.drivingRoute.points[i].dynamics = dynamicsForSegment
        }
    }

}
