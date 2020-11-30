import VehicleDynamics from './VehicleDynamics'
import Impreza from './Impreza'
import Hyper9Model from './hyper9Model'
export default class ZeroToSixty {
    constructor() {
        this.dynamics = new VehicleDynamics()
        this.Impreza = Impreza.props
        this.Hyper9Model = Hyper9Model.props
    }

    in() {
        const tractiveForce = this.dynamics.tractiveForce(
            this.Hyper9Model.engineTorqueNm, 
            this.Impreza.wheelRadiusMeters, 
            this.Impreza.transmissionGearRatios[1], 
            this.Impreza.differentialGearRatio
        )

        const accMpsSqr = this.dynamics.acceleration( 
            this.Impreza.mass.kg, 
            tractiveForce, 
            0,//dragForce, 
            0,//gradeForce, 
            0,//rollingForce
        )

        // 1mph is 0.44704 Mps
        const speedMps = 60 * 0.44704

        const zeroToSixtyInSec = speedMps / accMpsSqr

        return {
            tractiveForce, 
            accMpsSqr,
            zeroToSixtyInSec
        }
    }
}

const model = new ZeroToSixty()
model.in()