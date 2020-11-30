import VehicleProperties from './VehicleProperties'

const Impreza = new VehicleProperties({
    mass: {
        lb: 2500
    },
    dragCoeff: 0.25,
    rollResistCoeff: 0.01,
    frontArea: 2.5, // m^2
    wheelRadiusMeters: 0.6304 / 2, // meters 
    transmissionGearRatios: [3.454, 2.062, 1.448, 1.088, 0.871], 
    differentialGearRatio: 3.545
})

export default Impreza