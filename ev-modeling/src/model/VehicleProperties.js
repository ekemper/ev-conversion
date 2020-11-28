import _ from  "lodash" 

export default class VehicleProperties {
    constructor(initalProperties) {
        this.props = { ...initalProperties }

        this.convertInitialProps()
    }

    convertInitialProps() {
        if (_.get(this, 'props.mass.lb', null)) {
            this.props.mass.kg = this.convertLbToKg(this.props.mass.lb)
        }

        if (_.get(this, 'props.mass.kg', null)) {
            this.props.mass.lb = this.convertKgToLb(this.props.mass.kg)
        }
    }

    convertKgToLb(massKg) {
        return massKg * 2.205
    }

    convertLbToKg(massLb) {
        return massLb / 2.205
    }
}