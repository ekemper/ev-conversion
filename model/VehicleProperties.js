const _ = require("lodash")


class VehicleProperties {
    constructor(initalProperties) {
        this.props = { ...initalProperties }

        this.convertInitialProps()
    }

    convertInitialProps() {
        if (_.get(this, 'props.mass.lb', null)) {
            this.props.mass.lb = this.convertKgToLb(this.props.mass.kg)
        }

        if (_.get(this, 'props.mass.kg', null)) {
            this.props.mass.kg = this.convertLbToKg(this.props.mass.lb)
        }
    }

    convertKgToLb(massKg) {
        return massKg * 2.205
    }

    convertLbToKg(massLb) {
        return massLb / 2.205
    }
}

module.exports = VehicleProperties