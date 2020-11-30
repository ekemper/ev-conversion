
export default class VehicleDynamics {
    constructor() {
        this.g = 9.81 // m/s^2
        this.airDensity = 1.2466 // kg/m^3 @ 10 deg C
    }

    acceleration(
        mass, 
        tractiveForce, 
        dragForce, 
        gradeForce, 
        rollingForce) {
        return (1 / mass) * (tractiveForce - dragForce - gradeForce - rollingForce)
    }

    dragForce(
        frontArea, 
        dragCoefficient, 
        vehicleSpeed, 
        windSpeed) {

        return .5 * this.airDensity * frontArea * dragCoefficient * (vehicleSpeed - windSpeed) * (vehicleSpeed - windSpeed)
    }

    gradeForce(mass, roadAngleRadians) {
        return mass * this.g * Math.sin(roadAngleRadians)
    }

    rollingForce(
        mass, 
        rollingResistanceCoefficient, 
        roadAngleRadians) {
        return mass * this.g * rollingResistanceCoefficient * Math.cos(roadAngleRadians)
    }

    // https://x-engineer.org/automotive-engineering/chassis/vehicle-dynamics/calculate-wheel-torque-engine/
    tractiveForce(
        engineTorqueNm, 
        wheelRadius, 
        transmissionGearRatio, 
        differentialGearRatio) {
        return ( engineTorqueNm * transmissionGearRatio * differentialGearRatio ) / wheelRadius
    }
 }