

export default class VehicleDynamics {
    constructor() {
        this.g = 9.81 // m/s^2
    }

    acceleration(mass, tractiveForce, dragForce, gradeForce, rollingForce) {
        return (1 / mass) * (tractiveForce - dragForce - gradeForce - rollingForce)
    }

    dragForce(airDensity, frontArea, dragCoefficient, vehicleSpeed, windSpeed) {
        // wind speed is assumed to be in the same or opposite to vehicle speed

        return .5 * airDensity * frontArea * dragCoefficient * (vehicleSpeed - windSpeed) ^ 2
    }

    gradeForce(mass, roadAngleRadians) {
        return mass * this.g * Math.sin(roadAngleRadians)
    }

    rollingForce(mass, rollingResistanceCoefficient, roadAngleRadians) {
        return mass * this.g * rollingResistanceCoefficient * Math.cos(roadAngleRadians)
    }

    /*

    the total tractive force is the sum of the rear and front ractive forces

        tractiveForce = frontTractiveForce + rearTractiveForce

    where the front and rear tractive forces are expressed as a function of the friction coef and the normal forces

        frontTractiveForce = frontFrictionCoef * frontNormalForce
        rearTractiveForce = rearFrictionCoef * rearNormalForce

        

    */
}