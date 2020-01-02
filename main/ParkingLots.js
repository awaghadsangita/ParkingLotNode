class ParkingLots {
    vehicle;
    park(vehicle) {
        if(vehicle==null)
            throw new Error('vehicle can not be null');

        this.vehicle = vehicle;
        return true;
    }

    unPark(vehicle) {
        if (this.vehicle ==vehicle) {
            this.vehicle = null;
            return true;
        }
        return false;
    }
}
module.exports = { ParkingLots }