parkingLotOwner = require('./ParkingLotOwner');
airportSecurity = require('./AirportSecurity');
const EventEmitter = require('events').EventEmitter;

class ParkingLots extends EventEmitter {
    parkingLot;
    currentCapacity = [];

    constructor(capacity) {
        super();
        this.capacity = capacity;
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
                console.log(this.parkingLot);
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
        console.log(this.parkingLot)
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
                    console.log(this.parkingLot[i].vehicle)
                    console.log(vehicle);
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
                console.log("Before checking", this.parkingLot[i][j]);
                console.log("CHecking variable", vehicle.vehicle);
                console.log(j);
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
        console.log(this.parkingLot);
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
                if (this.currentCapacity[i] <= this.parkingLot[i].length) {
                    if (min > slotCountArray[i] && slotCountArray[i] != 0 || min == 0) {
                        lotNumber = i;
                        min = slotCountArray[i]
                    }
                }
            }

        } else {
            for (let i = 1; i < slotCountArray.length; i++) {
                console.log(this.parkingLot[i].length + "NotHandicap")
                if (max < slotCountArray[i] && slotCountArray[i] != 0) {
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



