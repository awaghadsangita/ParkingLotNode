parkingLotOwner = require('./ParkingLotOwner');
airportSecurity = require('./AirportSecurity');
const EventEmitter = require('events').EventEmitter;

class ParkingLots extends EventEmitter {
    parkingLot;
    currentCapacity = [];
    row;

    constructor() {
        super();
        this.row = new Map();
    }

    park(vehicle, isHandicap) {

        if (vehicle === undefined || vehicle == null)
            throw new Error('vehicle can not be undefined or null');

        let isParked = false;
        let parkingLotNumber = this.getParkingLot(isHandicap);

        if (this.currentCapacity[parkingLotNumber] != 0)
            isParked = this.checkAlreadyPark(vehicle.vehicle);

        if (!isParked) {
            if (this.currentCapacity[parkingLotNumber.row][parkingLotNumber.lot] < this.parkingLot[parkingLotNumber.row][parkingLotNumber.lot].length) {
                for (let i = 0; i < this.parkingLot[parkingLotNumber.row].length; i++) {
                    if (this.parkingLot[parkingLotNumber.row][parkingLotNumber.lot][i] == undefined) {
                        this.parkingLot[parkingLotNumber.row][parkingLotNumber.lot][i] = {
                            "vehicle": vehicle,
                            "inTime": vehicle.inTime,
                            "isHandicap": isHandicap
                        };
                        this.currentCapacity[parkingLotNumber.row][parkingLotNumber.lot]++;
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
            for (let j = 0; j < this.parkingLot[i].length; j++) {
                if (this.parkingLot[i][j].length == this.currentCapacity[i][j]) {
                    isAvailable = true;
                }
                if (this.currentCapacity[i][j] <= this.parkingLot[i][j].length) {
                    for (let k = 0; k < this.parkingLot[i][j].length; k++) {
                        if (this.parkingLot[i][j][k] != undefined) {
                            if (this.parkingLot[i][j][k].vehicle.vehicle == vehicle) {
                                index = i;
                                this.parkingLot[i][j][k] = undefined;
                                this.currentCapacity[i][j]--;
                                break;
                            }
                        }
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
        console.log("dddddddd", vehicle);
        for (let i = 0; i < this.parkingLot.length; i++) {
            for (let j = 0; j < this.parkingLot[i].length; j++) {
                for (let k = 0; k < this.parkingLot[i][j].length; k++) {
                    console.log(this.parkingLot[i][j][k]);
                    if (this.parkingLot[i][j][k] != undefined && this.parkingLot[i][j][k].vehicle.vehicle == vehicle.vehicle) {
                        slotIndex = i;
                        break;
                    }
                }
            }
        }

        return slotIndex;
    }

    createParkingLotArray(numberLots, lotsCapacity, rows) {
        this.parkingLot = [];
        for (let i = 0; i < numberLots; i++) {
            this.parkingLot[i] = new Array()
            this.currentCapacity[i] = new Array();

            for (let j = 0; j < rows[i]; j++) {
                this.currentCapacity[i][j] = 0
                this.parkingLot[i][j] = new Array()
                for (let k = 0; k < lotsCapacity[i]; k++)
                    this.parkingLot[i][j][k] = undefined;
            }
        }
    }

    getParkingLot(isHandicap) {
        let slotCountArray = [];
        for (let i = 0; i < this.parkingLot.length; i++) {

            slotCountArray[i] = new Array()
            for (let j = 0; j < this.parkingLot[i].length; j++) {
                let count = 0;
                for (let k = 0; k < this.parkingLot[i][j].length; k++) {
                    if (this.parkingLot[i][j][k] == undefined) {
                        count++;
                    }
                }
                slotCountArray[i][j] = count;
            }
        }
        let max = slotCountArray[0][0];
        let min = slotCountArray[0][0];
        let lotNumber = {'row': 0, 'lot': 0};

        if (isHandicap) {
            for (let i = 0; i < slotCountArray.length; i++) {
                for (let j = 0; j < slotCountArray.length; j++) {
                    if (min > slotCountArray[i][j] && slotCountArray[i][j] != 0 || min == 0) {
                        lotNumber = {'row': i, 'lot': j};
                        min = slotCountArray[i][j];
                    }
                }
            }
        } else {
            for (let i = 0; i < slotCountArray.length; i++) {
                for (let j = 0; j < slotCountArray.length; j++) {
                    if (max < slotCountArray[i][j] && slotCountArray[i][j] != 0) {
                        lotNumber = {'row': i, 'lot': j};
                        max = slotCountArray[i][j];
                    }
                }
            }
        }
        return lotNumber;
    }

    findVehicleFromAttributes = (color, model) => {
        let slotIndex = [];

        for (let i = 0; i < this.parkingLot.length; i++) {
            for (let j = 0; j < this.parkingLot[i].length; j++) {
                for (let k = 0; k < this.parkingLot[i][j].length; k++) {
                    if (this.parkingLot[i][j][k] != undefined) {
                        if (this.parkingLot[i][j][k].vehicle.vehicle.color == color
                            || color == undefined
                            && this.parkingLot[i][j][k].vehicle.vehicle.model == model) {
                            slotIndex.push({
                                "vehicle number": this.parkingLot[i][j][k].vehicle.vehicle.numberPlate,
                                "lotNumber": i,
                                "rowNumber": j,
                                "slotNumber": k
                            });
                        }
                    }
                }
            }
        }
        return slotIndex;
    }

    findVehicle = (time) => {
        let slotIndex = [];
        for (let i = 0; i < this.parkingLot.length; i++) {
            for (let j = 0; j < this.parkingLot[i].length; j++) {
                for (let k = 0; k < this.parkingLot[i][j].length; k++) {
                    if (this.parkingLot[i][j][k] != undefined) {
                        let resultInMinutes = Math.round((new Date().getTime() - this.parkingLot[i][j][k].inTime) / 60000);
                        if (resultInMinutes <= 30 && resultInMinutes > 0) {
                            slotIndex.push({
                                "vehicle number": this.parkingLot[i][j][k].vehicle.vehicle.numberPlate,
                                "lotNumber": i,
                                "rowNumber": j,
                                "slotNumber": k
                            });
                        }
                    }
                }
            }
            return slotIndex;
        }
    }

    findLocationGivenLotRowsAndVehicleType(rows, vehicleType) {
        let slotIndex = [];
        for (let i = 0; i < this.parkingLot.length; i++) {
            for (let row = 0; row < rows.length; row++) {
                for (let j = 0; j < this.parkingLot[i].length; j++) {
                    if (j == rows[row]) {
                        for (let k = 0; k < this.parkingLot[i][j].length; k++) {
                            if (this.parkingLot[i][j][k] != undefined && this.parkingLot[i][j][k].isHandicap == true && this.parkingLot[i][j][k].vehicle.vehicle.vehicleType == vehicleType) {
                                slotIndex.push({
                                    "vehicle number": this.parkingLot[i][j][k].vehicle.vehicle.numberPlate,
                                    "lotNumber": i,
                                    "rowNumber": j,
                                    "slotNumber": k
                                });
                            }
                        }
                    }
                }
            }
        }
        return slotIndex;
    }

    findAllVehicles() {
        let slotIndex = [];
        for (let i = 0; i < this.parkingLot.length; i++) {
            for (let j = 0; j < this.parkingLot[i].length; j++) {
                for (let k = 0; k < this.parkingLot[i][j].length; k++) {
                    if (this.parkingLot[i][j][k] != undefined) {
                        slotIndex.push({
                            "vehicle number": this.parkingLot[i][j][k].vehicle.vehicle.numberPlate,
                            "lotNumber": i,
                            "slotNumber": j
                        });
                    }
                }
            }
        }
        return slotIndex;
    }
}


let
    parkinglotObject = new ParkingLots(1)
parkinglotObject
    .on(
        "isFull"
        , (
            e
        ) => {
            e
                .message = "lot is Full";
            parkingLotOwner
                .isFull(e);

            airportSecurity
                .isFull(e);
        }
    )
;

parkinglotObject.on("isEmpty", (e) => {
    e.message = "free space available"
    parkingLotOwner.isAvailable(e);

});

module.exports = {ParkingLots, parkinglotObject}



