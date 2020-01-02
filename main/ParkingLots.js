class ParkingLots {
    park(vehicle) {
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