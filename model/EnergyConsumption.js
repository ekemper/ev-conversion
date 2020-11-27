const G = 9.81

let VehicleProperties = require("./VehicleProperties")

const vh = new VehicleProperties({
    mass: {
        lb: 3000
    },
    dragCoeff: 0.25,
    rollResistCoeff: 0.01,
})

console.log({ vh })
