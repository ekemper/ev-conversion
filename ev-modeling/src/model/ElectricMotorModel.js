import _ from 'lodash'
export default class ElectricMotorModel {

    constructor(initalProperties) {
        this.props = { ...initalProperties }

        this.convertInitialProps()
    }

    convertInitialProps() {
        if(_.get(this, 'props.engineTorqueFtLb', null)) {
            this.footPoundsToNewtonMeters()
        }
    }

    footPoundsToNewtonMeters() {
        //  1 Nm = 0.74 ft-lb
        this.props.engineTorqueNm = this.props.engineTorqueFtLb / 0.74
    }    
}