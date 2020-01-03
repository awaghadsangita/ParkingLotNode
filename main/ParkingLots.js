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

        if (!this.isFull()) {
            this.vehicle.push(vehicle);
            return false;
        }
        const e = {message: ""}
        this.emit('isFull', e);
        return e.message;
    }

    unPark(vehicle) {
        if (vehicle === undefined)
            throw new Error('vehicle can not be undefined');

        if (vehicle == null)
            throw new Error('vehicle can not be null');

        if (!this.isEmpty()) {
            this.vehicle.pop();
            return true;
        }
        return false;
    }

    isFull() {
        let isFull = this.vehicle.length == this.capacity;
        return isFull;
    }

    isEmpty() {
        return this.vehicle.length == 0;
    }
}

let obj = new ParkingLots(1)
obj.on("isFull", (e) => {
    if(obj.capacity==obj.vehicle.length)
        e.message = "lot is Full";
    else
        e.message= "free space available"
});
module.exports = {ParkingLots, obj}



