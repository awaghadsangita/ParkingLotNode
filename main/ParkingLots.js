parkingLotOwner = require('./ParkingLotOwner');
airportSecurity = require('./AirportSecurity');
const EventEmitter = require('events').EventEmitter;

class ParkingLots extends EventEmitter {
    vehicle = [];
    capacity;

    constructor(capacity) {
        super();
        this.capacity = capacity;
    }

    park(vehicle) {
        if (vehicle === undefined)
            throw new Error('vehicle can not be undefined');

        if (vehicle == null)
            throw new Error('vehicle can not be null');

        if (this.vehicle.length < this.capacity) {
            this.vehicle.push(vehicle);
            return false;
        } else {
            const e = {message: ""}
            this.emit('isFull', e);
            return e.message;
        }
    }

    unPark(vehicle) {
        if (vehicle === undefined)
            throw new Error('vehicle can not be undefined');
        if (vehicle == null)
            throw new Error('vehicle can not be null');
        let isAvailable = false;
        if (this.capacity == this.vehicle.length) {
            isAvailable = true;
        }
        if (this.vehicle.length < this.capacity) {
            this.vehicle.pop();
            return true;
        }
        if (isAvailable) {
            const e = {message: ""}
            this.emit('isEmpty', e);
            return e.message;
        }
    }

}

let parkinglotObject = new ParkingLots(1)
parkinglotObject.on("isFull", (e) => {
    if (parkinglotObject.capacity == parkinglotObject.vehicle.length) {
        e.message = "lot is Full";
        parkingLotOwner.isFull(e);
        airportSecurity.isFull(e);
    } else
        e.message = "free space available"
});

parkinglotObject.on("isEmpty", (e) => {
    e.message = "free space available"
    parkingLotOwner.isAvailable(e);

});

module.exports = {ParkingLots, parkinglotObject}



