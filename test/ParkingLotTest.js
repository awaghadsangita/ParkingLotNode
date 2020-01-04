let assert = require('assert');
let Parkinglot = require('../main/ParkingLots');
let vehicle = require('../main/Vehicle');

describe('test for parking vehicle in parking lot', () => {
    it('given vehicle when parked should return false', () => {
        let vehicleObj = new vehicle.Vehicle();
        assert.equal(new Parkinglot.ParkingLots(1).park(vehicleObj), false);
    });

    it('given null when parked should return throw error', () => {
        try {
            new Parkinglot.ParkingLots(1).park(null)
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined or null");
        }
    });

    it('given undefined when parked should return throw error', () => {
        try {
            new Parkinglot.ParkingLots(1).park(undefined)
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined or null");
        }
    });

    it('when parking lot is full informed to airport security should return lot is Full', () => {
        let vehicle1 = new vehicle.Vehicle();
        Parkinglot.parkinglotObject.park(vehicle1);
        assert.equal(Parkinglot.parkinglotObject.park(new vehicle.Vehicle()), "lot is Full");
    });

    it('when parking lot is full informed to parking lot owner should return lot is Full', () => {
        let vehicle1 = new vehicle.Vehicle();
        Parkinglot.parkinglotObject.park(vehicle1);
        assert.equal(Parkinglot.parkinglotObject.park(new vehicle.Vehicle()), "lot is Full");
    });

    it('given vehicle already parked When again parked should throw error', () => {
        try {
            let vehicle1 = new vehicle.Vehicle();
            let parkingLotObject = new Parkinglot.ParkingLots(2)
            parkingLotObject.park(vehicle1, 0);
            parkingLotObject.park(vehicle1, 1);
        } catch (e) {
            assert.equal(e.message, "Vehicle is already parked");
        }
    });

    it('given vehicle when parked and un parked should return time difference', () => {
        let vehicle1 = new vehicle.Vehicle();
        let vehicle2 = new vehicle.Vehicle();
        let parkingLot = new Parkinglot.ParkingLots(2)
        parkingLot.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"},0);
        parkingLot.park({'vehicle':vehicle2,'inTime':"2012-05-18 06:37:21"},1);
      //  assert.equal(Parkinglot.parkinglotObject.park(new vehicle.Vehicle()), "lot is Full");
    });
});

describe('test for un parking vehicle from parking lot', () => {
    it('given vehicle parked and when un parked should return true', () => {
        let vehicleObj = new vehicle.Vehicle(1);
        let parkingLotObject = new Parkinglot.ParkingLots(2);
        parkingLotObject.park({'vehicle':vehicleObj,'inTime':"2012-05-18 05:37:21"},0);
        assert.equal(parkingLotObject.unPark({'vehicle':vehicleObj,'inTime':"2012-05-18 05:37:21"}), true);
    });

    it('given undefined when un parked should return throw error', () => {
        try {
            let vehicleObj = new vehicle.Vehicle(1);
            let parkingLotObject = new Parkinglot.ParkingLots();
            parkingLotObject.park(vehicleObj);
            parkingLotObject.unPark(undefined);
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined or null");
        }
    });

    it('given null when un parked should return throw error', () => {
        try {
            let vehicleObj = new vehicle.Vehicle(1);
            let parkingLotObject = new Parkinglot.ParkingLots();
            parkingLotObject.park({'vehicle':vehicleObj,'inTime':"2012-05-18 05:37:21"},1);
            parkingLotObject.unPark(undefined);
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined or null");
        }
    });

    it('when parking lot space is available informed to parking lot owner should return lot free space available', () => {
        let vehicle1 = new vehicle.Vehicle();
        Parkinglot.parkinglotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"},0);
        assert.equal(Parkinglot.parkinglotObject.unPark({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"}), "free space available");
    });

    it('given vehicle is not parked when try to un park should throw error', () => {
        try {
            let vehicle1 = new vehicle.Vehicle();
            let vehicle2 = new vehicle.Vehicle();
            let parkingLotObject = new Parkinglot.ParkingLots(2)
            parkingLotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"}, 0);
            parkingLotObject.unPark(vehicle2);
        } catch (e) {
            assert.equal(e.message, "Vehicle is already parked");
        }
    });
});

describe('test for parking lot is full', () => {
    it('when parking lot is full informed to parking lot owner should return lot is Full', () => {
        let vehicle1 = new vehicle.Vehicle();
        Parkinglot.parkinglotObject.park(vehicle1);
        let vehicle2 = new vehicle.Vehicle();
        assert.equal(Parkinglot.parkinglotObject.park(vehicle2), "lot is Full");
    });

    it('when parking lot is full informed to airport security should return lot is Full', () => {
        let vehicle1 = new vehicle.Vehicle();
        Parkinglot.parkinglotObject.park(vehicle1);
        let vehicle2 = new vehicle.Vehicle();
        assert.equal(Parkinglot.parkinglotObject.park(vehicle2), "lot is Full");
    });
});

describe('test for checking empty parking slot', () => {
    it('given vehicles when parked and two unparked then one parked should informed available empty slot', () => {
        let vehicle1 = new vehicle.Vehicle();
        let parkingLotObject = new Parkinglot.ParkingLots(5);
        parkingLotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"}, 0);
        let vehicle2 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle2,'inTime':"2012-05-18 05:37:21"}, 1);
        let vehicle3 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle3,'inTime':"2012-05-18 05:37:21"}, 2);
        let vehicle4 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle4,'inTime':"2012-05-18 05:37:21"}, 3);
        let vehicle5 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle5,'inTime':"2012-05-18 05:37:21"}, 4);
        parkingLotObject.unPark({'vehicle':vehicle2,'inTime':"2012-05-18 05:37:21"});
        parkingLotObject.unPark({'vehicle':vehicle4,'inTime':"2012-05-18 05:37:21"});
        parkingLotObject.park({'vehicle':new vehicle.Vehicle(),'inTime':"2012-05-18 05:37:21"}, 1);
        let arr = parkingLotObject.giveEmptySlots();
        assert.equal(arr, 3);
    });
});

describe('test for finding vehicle in parking lot', () => {
    it('given vehicle should return slotnumber of parkinglot', () => {
        let vehicle1 = new vehicle.Vehicle();
        let parkingLotObject = new Parkinglot.ParkingLots(3);
        parkingLotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"}, 0);
        let vehicle2 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle2,'inTime':"2012-05-18 05:37:21"}, 1);
        let vehicle3 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle3,'inTime':"2012-05-18 05:37:21"}, 2);
        let result = parkingLotObject.findMyVehicle({'vehicle':vehicle3,'inTime':"2012-05-18 05:37:21"});
        assert.equal(result, 2);

    })
});