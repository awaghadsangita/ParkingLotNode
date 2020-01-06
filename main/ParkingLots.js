parkingLotOwner = require('./ParkingLotOwner');
airportSecurity = require('./AirportSecurity');
const EventEmitter = require('events').EventEmitter;

class ParkingLots extends EventEmitter {
    parkingLot;
    currentCapacity = [];

    constructor() {
        super();
    }

    park(vehicle, isHandicap) {

        if (vehicle === undefined || vehicle == null)
            throw new Error('vehicle can not be undefined or null');

        let isParked = false;
        let parkingLotNumber = this.getParkingLot(isHandicap);

        if (this.currentCapacity[parkingLotNumber] != 0)
            isParked = this.checkAlreadyPark(vehicle.vehicle);

        if (!isParked) {
            if (this.currentCapacity[parkingLotNumber] < this.parkingLot[parkingLotNumber].length) {
                for (let i = 0; i < this.parkingLot[parkingLotNumber].length; i++) {
                    if (this.parkingLot[parkingLotNumber][i] == undefined) {
                        this.parkingLot[parkingLotNumber][i] = vehicle;
                        this.currentCapacity[parkingLotNumber]++;
                        break;
                    }
                }
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
        let index = -1;

        for (let i = 0; i < this.parkingLot.length; i++) {
            if (this.parkingLot[i].length == this.currentCapacity) {
                isAvailable = true;
            }
            if (this.currentCapacity[i] <= this.parkingLot[i].length) {
                for (let j = 0; j < this.parkingLot[i].length; j++) {
                    if (this.parkingLot[i][j] != undefined && this.parkingLot[i][j].vehicle == vehicle.vehicle) {
                        index = i;
                        this.parkingLot[i][j] = undefined;
                        this.currentCapacity[i]--;
                        break;
                    }
                }
            }
        }
        if (index == -1)
            throw new Error('Vehicle is already parked');
        if (isAvailable) {
            const e = {message: ""}
            this.emit('isEmpty', e);
            return e.message;
        }

        return true;
    }

    giveEmptySlots() {
        let emptySlotsArray = [];
        for (let i = 0; i < this.parkingLot.length; i++) {
            for (let j = 0; j < this.parkingLot[i].length; j++) {
                if (this.parkingLot[i][j] === undefined) {
                    emptySlotsArray.push({i, j});
                }
            }
        }
        return emptySlotsArray;
    }

    checkAlreadyPark(vehicle) {
        let isParked = false;
        for (let i = 0; i < this.parkingLot.length; i++) {
            if (this.parkingLot[i] !== undefined) {
                if (this.parkingLot[i].vehicle == vehicle) {
                    throw new Error('Vehicle is already parked');
                }
            }
        }
        return isParked;
    }

    findMyVehicle(vehicle) {
        let slotIndex = -1;
        console.log(vehicle);
        for (let i = 0; i < this.parkingLot.length; i++) {
            for (let j = 0; j < this.parkingLot[i].length; j++) {
                if (this.parkingLot[i][j] === undefined) {
                    break;
                } else if (this.parkingLot[i][j].vehicle == vehicle.vehicle) {
                    slotIndex = i;
                    break;
                }
            }
        }
        return slotIndex;
    }

    createParkingLotArray(numberLots, lotsCapacity) {
        this.parkingLot = [];
        for (let i = 0; i < numberLots; i++) {
            this.parkingLot[i] = new Array()
            this.currentCapacity[i] = 0;
            for (let j = 0; j < lotsCapacity[i]; j++) {
                this.parkingLot[i][j] = undefined;
            }
        }
    }

    getParkingLot(isHandicap) {
        let slotCountArray = [];
        for (let i = 0; i < this.parkingLot.length; i++) {
            let count = 0;
            for (let j = 0; j < this.parkingLot[i].length; j++) {
                if (this.parkingLot[i][j] == undefined) {
                    count++;
                }
            }
            slotCountArray[i] = count;
        }

        let max = slotCountArray[0];
        let min = slotCountArray[0];
        let lotNumber = 0;

        if (isHandicap) {
            for (let i = 0; i < slotCountArray.length; i++) {
                if (min > slotCountArray[i] && slotCountArray[i] != 0 || min == 0) {
                    lotNumber = i;
                    min = slotCountArray[i]
                }
            }
        } else {
            for (let i = 1; i < slotCountArray.length; i++) {
                if (max < slotCountArray[i]) {
                    lotNumber = i;
                    max = slotCountArray[i]
                }
            }
        }
        return lotNumber;
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



