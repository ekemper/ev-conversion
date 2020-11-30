import VehicleDynamics from './VehicleDynamics'
import Impreza from './Impreza'
import Hyper9Model from './hyper9Model'
export default class ZeroToSixty {

    in() {
        const tractiveForce = VehicleDynamics.tractiveForce(
            Hyper9Model.engineTorqueNm, 
            Impreza.wheelRadiusMeters, 
            Impreza.transmissionGearRatio, 
            Impreza.differentialGearRatio
        )

        const acc = VehicleDynamics.acceleration( Impreza.mass, 
            tractiveForce, 
            0,//dragForce, 
            0,//gradeForce, 
            0,//rollingForce
        )

        console.log({acc})
    }
}

const model = new ZeroToSixty()
model.in()