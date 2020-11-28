
export default class RouteParser {
    constructor(jsonRoute = null) {
        this.jsonRoute = jsonRoute
        this.calculateEnrichedDataPoints()
    }
    
    calculateEnrichedDataPoints() {
       for (let i = 0; i < this.jsonRoute.points.length; i++) {
            const point = this.jsonRoute.points[i];
            const nextPoint = this.jsonRoute.points[i+1]

            if(point && nextPoint) {
                this.jsonRoute.points[i]['distanceToNextPoint'] = this.haversineDistance(point, nextPoint)
                this.jsonRoute.points[i]['verticalDistanceToNextPoint'] = this.verticalDistance(point, nextPoint)
                this.jsonRoute.points[i]['roadAngle'] = this.roadAngle(
                    this.jsonRoute.points[i]['distanceToNextPoint'],
                    this.jsonRoute.points[i]['verticalDistanceToNextPoint']
                )

            } else {
                this.jsonRoute.points[i]['distanceToNextPoint'] = null
                this.jsonRoute.points[i]['verticalDistanceToNextPoint'] = null
            }
        }
    }

    roadAngle(distanceToNextPoint,verticalDistance) {
        return Math.atan2(verticalDistance, distanceToNextPoint)
    }

    verticalDistance(p1, p2) {
        return p2.elevation.meters - p1.elevation.meters
    }

    hav(theta) {
        return Math.sin(theta/2) * Math.sin(theta/2)
    }

    haversineDistance(p1, p2) {
        if( !p1 || !p2 ) {
            throw new Error('could not calculate haversine distance')
        }

        const R = 6371e3; // metres
        const φ1 = p1.lat * Math.PI/180; // φ, λ in radians
        const φ2 = p2.lat * Math.PI/180;
        const Δφ = (p2.lat-p1.lat) * Math.PI/180;
        const Δλ = (p2.lng-p1.lng) * Math.PI/180;

        const a = this.hav(Δφ) + Math.cos(φ1) * Math.cos(φ2) * this.hav(Δλ);
                
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const distance = R * c; // in metres
        return distance
    }
}

