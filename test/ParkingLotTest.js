let assert = require('assert');
let Parkinglot = require('../main/ParkingLots');
let vehicle = require('../main/Vehicle');

describe('test for parking vehicle in parking lot', () => {
    it('given vehicle when parked should return false', () => {
        let vehicleObj = new vehicle.Vehicle();
        let parkingLotObject=new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(3,[5,4,4])
        assert.equal(parkingLotObject.park(vehicleObj), false);
    });

    it('given null when parked should return throw error', () => {
        try {
            new Parkinglot.ParkingLots(1,[1]).park(null)
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

       Parkinglot.parkinglotObject.createParkingLotArray(1,[1])
        Parkinglot.parkinglotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"});
        assert.equal(Parkinglot.parkinglotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"}), "lot is Full");
    });

    it('when parking lot is full informed to parking lot owner should return lot is Full', () => {
        let vehicle1 = new vehicle.Vehicle();
        Parkinglot.parkinglotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"});
        assert.equal(Parkinglot.parkinglotObject.park({'vehicle':new vehicle.Vehicle(),'inTime':"2012-05-18 05:37:21"}), "lot is Full");
    });

    it('given vehicle already parked When again parked should throw error', () => {
        try {
            let vehicle1 = new vehicle.Vehicle();
            let parkingLotObject =new Parkinglot.ParkingLots();
            parkingLotObject.createParkingLotArray(1,[2]);
            parkingLotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"});
            parkingLotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"});
        } catch (e) {
            assert.equal(e.message, "Vehicle is already parked");
        }
    });

    it('given vehicle when parked ,note in time should return false', () => {
        let vehicle1 = new vehicle.Vehicle();
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(1,[2]);
        let day1=new Date();
        assert.equal(parkingLotObject.park({'vehicle':vehicle1,'inTime':day1}),false);
    });

});

describe('test for un parking vehicle from parking lot', () => {
    it('given vehicle parked and when un parked should return true', () => {
        let vehicleObj = new vehicle.Vehicle();
        let parkingLotObject =new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(1,[2]);
        parkingLotObject.park({'vehicle':vehicleObj,'inTime':"2012-05-18 05:37:21"});
        assert.equal(parkingLotObject.unPark({'vehicle':vehicleObj,'inTime':"2012-05-18 05:37:21"}), true);
    });

    it('given undefined when un parked should return throw error', () => {
        try {
            let vehicleObj = new vehicle.Vehicle(1);
            let parkingLotObject =new Parkinglot.ParkingLots();
            parkingLotObject.createParkingLotArray(1,1);
            parkingLotObject.park(vehicleObj);
            parkingLotObject.unPark(undefined);
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined or null");
        }
    });

    it('given null when un parked should return throw error', () => {
        try {
            let vehicleObj = new vehicle.Vehicle(1);
            let parkingLotObject =new Parkinglot.ParkingLots();
            parkingLotObject.createParkingLotArray(1,1);
            parkingLotObject.park({'vehicle':vehicleObj,'inTime':"2012-05-18 05:37:21"},1);
            parkingLotObject.unPark(undefined);
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined or null");
        }
    });

    it('when parking lot space is available informed to parking lot owner should return lot free space available', () => {
        let vehicle1 = new vehicle.Vehicle();
        let parkingLotObject =new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(1,[1]);
        parkingLotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"});
        assert.equal(parkingLotObject.unPark({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"}), "");
    });

    it('given vehicle is not parked when try to un park should throw error', () => {
        try {
            let vehicle1 = new vehicle.Vehicle();
            let vehicle2 = new vehicle.Vehicle();
            let parkingLotObject = new Parkinglot.ParkingLots();
            parkingLotObject.createParkingLotArray(1,[1]);
            parkingLotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"});
            parkingLotObject.unPark({'vehicle':vehicle2,'inTime':"2012-05-18 05:37:21"});
        } catch (e) {
            assert.equal(e.message, "Vehicle is already parked");
        }
    });
});

describe('test for parking lot is full', () => {
    it('when parking lot is full informed to parking lot owner should return lot is Full', () => {
        let vehicle1 = new vehicle.Vehicle();
        Parkinglot.parkinglotObject.createParkingLotArray(1,[1])
        Parkinglot.parkinglotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"});
        let vehicle2 = new vehicle.Vehicle();
        assert.equal(Parkinglot.parkinglotObject.park({'vehicle':vehicle2,'inTime':"2012-05-18 05:37:21"}), "lot is Full");
    });

    it('when parking lot is full informed to airport security should return lot is Full', () => {
        let vehicle1 = new vehicle.Vehicle();
        Parkinglot.parkinglotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"});
        let vehicle2 = new vehicle.Vehicle();
        assert.equal(Parkinglot.parkinglotObject.park({'vehicle':vehicle2,'inTime':"2012-05-18 05:37:21"}), "lot is Full");
    });
});

describe('test for checking empty parking slot', () => {
    it('given vehicles when parked and two unparked then one parked should informed available empty slot', () => {
        let vehicle1 = new vehicle.Vehicle();
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(2,[4,3])
        parkingLotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"});
        let vehicle2 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle2,'inTime':"2012-05-18 05:37:21"});
        let vehicle3 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle3,'inTime':"2012-05-18 05:37:21"});
        let vehicle4 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle4,'inTime':"2012-05-18 05:37:21"});
        let vehicle5 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle5,'inTime':"2012-05-18 05:37:21"});
         parkingLotObject.unPark({'vehicle':vehicle2,'inTime':"2012-05-18 05:37:21"});
         parkingLotObject.unPark({'vehicle':vehicle4,'inTime':"2012-05-18 05:37:21"});
        parkingLotObject.park({'vehicle':new vehicle.Vehicle(),'inTime':"2012-05-18 05:37:21"});
        let arr = parkingLotObject.giveEmptySlots();
        console.log(arr);
        let expectedArray=[ { i: 0, j: 2 }, { i: 0, j: 3 }, { i: 1, j: 2 } ];
        assert.equal(arr, expectedArray);
    });

    it('given vehicles when parked and handicap driver come for parke should return nearest lot', () => {
        let parkingLotObject = new Parkinglot.ParkingLots(5);
        parkingLotObject.createParkingLotArray(3,[3,3,3])
        let vehicle1 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"},true);
        let vehicle2 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle2,'inTime':"2012-05-18 06:37:21"},false);
        let vehicle3 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle3,'inTime':"2012-05-18 07:37:21"},false);
        let vehicle4 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle4,'inTime':"2012-05-18 08:37:21"},true);
        let vehicle5 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle5,'inTime':"2012-05-18 09:37:21"},true);
        let vehicle6 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle6,'inTime':"2012-05-18 10:37:21"},true);
        assert.equal(parkingLotObject.getParkingLot(true),1)

    });
});

describe('test for finding vehicle in parking lot', () => {
    it('given vehicle when parked should return slot number of parkinglot', () => {
        let vehicle1 = new vehicle.Vehicle();
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(3,[5,4,4]);
        parkingLotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"});
        let vehicle2 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle2,'inTime':"2012-05-18 05:37:21"});
        let vehicle3 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle3,'inTime':"2012-05-18 05:37:21"});
        let result = parkingLotObject.findMyVehicle({'vehicle':vehicle3,'inTime':"2012-05-18 05:37:21"});
        assert.equal(result, 1);

    })
});

describe('test for evenly distribution of vehicle among lots', () => {
    it('given vehicles when parked in lots and another come for parked should return parking lot number', () => {
        let parkingLotObject = new Parkinglot.ParkingLots(5);
        parkingLotObject.createParkingLotArray(3,[5,4,4])
        let vehicle1 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle1,'inTime':"2012-05-18 05:37:21"});
        let vehicle2 = new vehicle.Vehicle();
        parkingLotObject.park({'vehicle':vehicle2,'inTime':"2012-05-18 05:37:21"});
        assert.equal(parkingLotObject.getParkingLot(), 1);
    });
});