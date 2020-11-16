

class VehicleDynamics {
    constructor() {

    }

    acceleration(mass, tractiveForce, dragForce, gradeForce, rollingForce) {
        return (1/mass) * (tractiveForce - dragForce - gradeForce - rollingForce)
    }

    dragForce(airDensity, frontArea, dragCoefficient, vehicleSpeed, windSpeed ) {
        // wind speed is assumed to be in the same or opposite to vehicle speed

        return .5 * airDensity * frontArea * dragCoefficient * (vehicleSpeed - windSpeed)^2
    }

    gradeForce(mass, roadAngle) {
        const g = 9.81 // m/s^2
        return mass * g * Math.sin(roadAngle)
    }       

    // TODO : come back to the rolling force calculation
    // rollingForce(normalForce, rollingResistanceCoefficient) {
    //     return normalForce * rollingResistanceCoefficient * Math.cos(theta)
    // }

    /*

    the total tractive force is the sum of the rear and front ractive forces

        tractiveForce = frontTractiveForce + rearTractiveForce

    where the front and rear tractive forces are expressed as a function of the friction coef and the normal forces

        frontTractiveForce = frontFrictionCoef * frontNormalForce
        rearTractiveForce = rearFrictionCoef * rearNormalForce

        

    */
}