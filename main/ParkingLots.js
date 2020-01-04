parkingLotOwner = require('./ParkingLotOwner');
airportSecurity = require('./AirportSecurity');
let dateFormat = require('dateformat');
const EventEmitter = require('events').EventEmitter;

class ParkingLots extends EventEmitter {
    parkingSlot;
    capacity;
    currentCapacity;

    constructor(capacity) {
        super();
        this.capacity = capacity;
        this.parkingSlot = [];
        this.currentCapacity = 0;
    }

    park(vehicle, slotNumber) {
        if (vehicle === undefined || vehicle == null)
            throw new Error('vehicle can not be undefined or null');

        let isParked = false;
        if (this.currentCapacity != 0)
            isParked = this.checkAlreadyPark(vehicle.vehicle);

        if (!isParked) {
            if (this.currentCapacity < this.capacity) {
                this.parkingSlot[slotNumber] = vehicle;
                this.currentCapacity++;
                console.log(this.parkingSlot);
                return false;
            } else {
                const e = {message: ""}
                this.emit('isFull', e);
                return e.message;
            }
        }
    }

    unPark(vehicle) {
        if (vehicle === undefined || vehicle == null)
            throw new Error('vehicle can not be undefined or null');

        let isAvailable = false;
        if (this.capacity == this.currentCapacity) {
            isAvailable = true;
        }

        let index = -1;
        let diff=0;
        if (this.currentCapacity <= this.capacity) {
            for (let i = 0; i < this.parkingSlot.length; i++) {
                    if (this.parkingSlot[i] != undefined && this.parkingSlot[i].vehicle == vehicle.vehicle ) {
                        index = i;
                        console.log(vehicle)
                        this.parkingSlot.splice(index, 1, undefined);
                        break;
                    }
            }
            this.currentCapacity--;
            if (index == -1)
                throw new Error('Vehicle is already parked');
        }

        if (isAvailable) {
            const e = {message: ""}
            this.emit('isEmpty', e);
            return e.message;
        }
        return true;
    }

    giveEmptySlots() {
        let emptySlotsArray = []
        if (this.currentCapacity < this.capacity) {
            for (let i = 0; i < this.capacity; i++) {
                if (this.parkingSlot[i] == null) {
                    emptySlotsArray.push(i);
                }
            }
        }
        return emptySlotsArray;
    }

    checkAlreadyPark(vehicle) {
        let isParked = false;
        for (let i = 0; i < this.parkingSlot.length; i++) {
            if (this.parkingSlot[i] != undefined) {
                if (this.parkingSlot[i].vehicle === vehicle) {
                    throw new Error('Vehicle is already parked');
                }
            }
        }
        return isParked;
    }

    findMyVehicle(vehicle) {
        let slotIndex = -1;
        console.log(vehicle);
        for (let i = 0; i < this.parkingSlot.length; i++) {
                if (this.parkingSlot[i].vehicle == vehicle.vehicle && this.parkingSlot[i] != undefined) {
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



