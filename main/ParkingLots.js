parkingLotOwner = require('./ParkingLotOwner');
airportSecurity = require('./AirportSecurity');
const EventEmitter = require('events').EventEmitter;

class ParkingLots extends EventEmitter {
    vehicle;
    capacity;
    currentCapacity;

    constructor(capacity) {
        super();
        this.capacity = capacity;
        this.vehicle = [];
        this.currentCapacity = 0;
    }

    park(vehicle, slotNumber) {
        if (vehicle === undefined)
            throw new Error('vehicle can not be undefined');

        if (vehicle == null)
            throw new Error('vehicle can not be null');
        let isParked = this.checkAlreadyPark(vehicle);
        if (!isParked) {
            if (this.currentCapacity < this.capacity) {
                this.vehicle[slotNumber] = vehicle;
                this.currentCapacity++;
                return false;
            } else {
                const e = {message: ""}
                this.emit('isFull', e);
                return e.message;
            }
        }
    }

    unPark(vehicle) {
        if (vehicle === undefined)
            throw new Error('vehicle can not be undefined');
        if (vehicle == null)
            throw new Error('vehicle can not be null');
        let isAvailable = false;
        if (this.capacity == this.currentCapacity) {
            isAvailable = true;
        }

        let index = -1;
        if (this.currentCapacity <= this.capacity) {
            for (let i = 0; i < this.vehicle.length; i++) {
                if (this.vehicle[i] == vehicle) {
                    index = i;
                    this.vehicle.splice(index, 1, undefined);
                    break;
                }
            }
            this.currentCapacity--;
            if (index == -1)
                throw new Error('Vehicle is already parked');
            return true;
        }

        if (isAvailable) {
            const e = {message: ""}
            this.emit('isEmpty', e);
            return e.message;
        }
    }

    giveEmptySlots() {
        let emptySlotsArray = []
        if (this.currentCapacity < this.capacity) {
            for (let i = 0; i < this.capacity; i++) {
                if (this.vehicle[i] == null) {
                    emptySlotsArray.push(i);
                }
            }
        }
        return emptySlotsArray;
    }

    checkAlreadyPark(vehicle) {
        let isParked = false;
        for (let i = 0; i < this.capacity; i++) {
            if (this.vehicle[i] === vehicle) {
                throw new Error('Vehicle is already parked');
            }
        }
        return isParked;
    }

    // checkVehicleIsAvaiableToUnpark(vehicle) {
    //     console.log(this.vehicle)
    //     console.log(this.vehicle[0]==vehicle)
    //     for (let i = 0; i < this.capacity; i++) {
    //         if (this.vehicle[i] == vehicle) {
    //             return true;
    //         }
    //     }
    //     throw new Error('Vehicle is already parked');
    //
    // }

    findMyVehicle(vehicle) {
        let slotIndex = -1;
        for (let i = 0; i < this.vehicle.length; i++) {
            if (this.vehicle[i] == vehicle) {
                slotIndex = i;
                break;
            }
        }
        return slotIndex;
    }
}

let parkinglotObject = new ParkingLots(1)
parkinglotObject.on("isFull", (e) => {
    e.message = "lot is Full";
    parkingLotOwner.isFull(e);
    airportSecurity.isFull(e);
});

parkinglotObject.on("isEmpty", (e) => {
    e.message = "free space available"
    parkingLotOwner.isAvailable(e);

});

module.exports = {ParkingLots, parkinglotObject}



