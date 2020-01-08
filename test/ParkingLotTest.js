let assert = require('assert');
let Parkinglot = require('../main/ParkingLots');
let vehicle = require('../main/Vehicle');

describe('test for parking vehicle in parking lot', () => {
    it('given vehicle when parked should return false', () => {
        let vehicleObj = new vehicle.Vehicle("Large vehicle", "red", "MH21-3456", "Creta");
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(3, [5, 4, 4], [1, 1, 1])
        assert.equal(parkingLotObject.park({'vehicle': vehicleObj, "inTime": new Date().getTime()}, false), false);
    });

    it('given null when parked should return throw error', () => {
        try {
            new Parkinglot.ParkingLots(1, [1]).park(null, false)
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined or null");
        }
    });

    it('given undefined when parked should return throw error', () => {
        try {
            new Parkinglot.ParkingLots(1).park(undefined, false)
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined or null");
        }
    });

    it('when parking lot is full informed to airport security should return lot is Full', () => {
        let vehicle1 = new vehicle.Vehicle("Large vehicle", "red", "MH21-3456", "Creta");
        ;
        Parkinglot.parkinglotObject.createParkingLotArray(1, [1], [1])
        Parkinglot.parkinglotObject.park({'vehicle': vehicle1, 'inTime': new Date().getTime()}, false);
        assert.equal(Parkinglot.parkinglotObject.park({
            'vehicle': vehicle1,
            'inTime': "2012-05-18 05:37:21"
        }), "lot is Full");
    });

    it('when parking lot is full informed to parking lot owner should return lot is Full', () => {
        Parkinglot.parkinglotObject.createParkingLotArray(1, [1], [1])
        let vehicle1 = new vehicle.Vehicle("Large vehicle", "red", "MH21-3456", "Creta");
        ;
        Parkinglot.parkinglotObject.park({'vehicle': vehicle1, 'inTime': new Date().getTime()}, false);
        assert.equal(Parkinglot.parkinglotObject.park({
            'vehicle': new vehicle.Vehicle(),
            'inTime': "2012-05-18 05:37:21"
        }), "lot is Full");
    });

    it('given vehicle already parked When again parked should throw error', () => {
        try {
            let vehicle1 = new vehicle.Vehicle("Large vehicle", "red", "MH21-3456", "Creta");
            ;
            let parkingLotObject = new Parkinglot.ParkingLots();
            parkingLotObject.createParkingLotArray(1, [2], [1]);
            parkingLotObject.park({'vehicle': vehicle1, 'inTime': new Date().getTime()}, false);
            parkingLotObject.park({'vehicle': vehicle1, 'inTime': new Date().getTime()}, false);
        } catch (e) {
            assert.equal(e.message, "Vehicle is already parked");
        }
    });

    it('given vehicle when parked ,note in time should return false', () => {
        let vehicle1 = new vehicle.Vehicle("Large vehicle", "red", "MH21-3456", "Creta");
        ;
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(1, [2], [1]);
        let day1 = new Date();
        assert.equal(parkingLotObject.park({'vehicle': vehicle1, 'inTime': day1.getTime()}), false);
    });

    it('given large vehicles when parked should park in most empty spaces', () => {
        let vehicle1 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3456", "Creta");
        let vehicle2 = new vehicle.Vehicle("Small Vehicle", "red", "MH21-3456", "Creta");
        let vehicle3 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3456", "Creta");
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(3, [3, 3, 3], [1, 1, 1]);
        let day1 = new Date().getTime();
        parkingLotObject.park({'vehicle': vehicle1, 'inTime': day1}, false);
        parkingLotObject.park({'vehicle': vehicle2, 'inTime': day1}, false);
        parkingLotObject.park({"vehicle": vehicle3, 'inTime': day1}, false);
        assert.deepEqual(parkingLotObject.getParkingLot(false), {'lot': 0, 'row': 0})
    });
});

describe('test for un parking vehicle from parking lot', () => {
    it('given vehicle parked and when un parked should return true', () => {
        let vehicleObj = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3456", "Creta");
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(1, [2], [1]);
        parkingLotObject.park({'vehicle': vehicleObj, 'inTime': new Date().getTime()}, false);
        assert.equal(parkingLotObject.unPark(vehicleObj), true);
    });

    it('given undefined when un parked should return throw error', () => {
        try {
            let vehicleObj = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3456", "Creta");
            let parkingLotObject = new Parkinglot.ParkingLots();
            parkingLotObject.createParkingLotArray(1, [1], [1]);
            parkingLotObject.park({'vehicle': vehicleObj, 'inTime': new Date().getTime()}, false);
            parkingLotObject.unPark(undefined);
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined or null");
        }
    });

    it('given null when un parked should return throw error', () => {
        try {
            let vehicleObj = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3456", "Creta");
            let parkingLotObject = new Parkinglot.ParkingLots();
            parkingLotObject.createParkingLotArray(1, [1], [1]);
            parkingLotObject.park({'vehicle': vehicleObj, 'inTime': new Date().getTime()}, false);
            parkingLotObject.unPark(undefined);
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined or null");
        }
    });

    it('when parking lot space is available informed to parking lot owner should return lot free space available', () => {
        let vehicle1 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3456", "Creta");
        Parkinglot.parkinglotObject.createParkingLotArray(1, [1], [1]);
        Parkinglot.parkinglotObject.park({'vehicle': vehicle1, 'inTime': new Date().getTime()}, false);
        assert.equal(Parkinglot.parkinglotObject.unPark(vehicle1), "free space available");
    });

    it('given vehicle is not parked when try to un park should throw error', () => {
        try {
            let vehicle1 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3456", "Creta");
            let vehicle2 = new vehicle.Vehicle("Large Vehicle", "red", "MH22-3456", "Creta");
            let parkingLotObject = new Parkinglot.ParkingLots();
            parkingLotObject.createParkingLotArray(1, [1], [1]);
            parkingLotObject.park({'vehicle': vehicle1, 'inTime': new Date().getTime()}, false);
            parkingLotObject.unPark({'vehicle': vehicle2, 'inTime': new Date().getTime()});
        } catch (e) {
            assert.equal(e.message, "Vehicle is already parked");
        }
    });
});

describe('test for parking lot is full', () => {
    it('when parking lot is full informed to parking lot owner should return lot is Full', () => {
        let vehicle1 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3456", "Creta");
        Parkinglot.parkinglotObject.createParkingLotArray(1, [1], [1])
        Parkinglot.parkinglotObject.park({'vehicle': vehicle1, 'inTime': new Date().getTime()});
        let vehicle2 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3458", "Creta");
        assert.equal(Parkinglot.parkinglotObject.park({
            'vehicle': vehicle2,
            'inTime': "2012-05-18 05:37:21"
        }), "lot is Full");
    });

    it('when parking lot is full informed to airport security should return lot is Full', () => {
        let vehicle1 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3456", "Creta");
        Parkinglot.parkinglotObject.createParkingLotArray(1, [1], [1])
        Parkinglot.parkinglotObject.park({'vehicle': vehicle1, 'inTime': new Date().getTime()}, false);
        let vehicle2 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3456", "Creta");
        assert.equal(Parkinglot.parkinglotObject.park({
            'vehicle': vehicle2,
            'inTime': new Date().getTime()
        }), "lot is Full");
    });
});

describe('test for checking empty parking slot', () => {
    it('given vehicles when parked and two unparked then one parked should informed available empty slot', () => {
        let vehicle1 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3456", "Creta");
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(2, [3, 3], [1, 1])
        parkingLotObject.park({'vehicle': vehicle1, 'inTime': new Date().getTime()}, false);
        let vehicle2 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3460", "Creta");
        parkingLotObject.park({'vehicle': vehicle2, 'inTime': new Date().getTime()}, false);
        let vehicle3 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3461", "Creta");
        parkingLotObject.park({'vehicle': vehicle3, 'inTime': new Date().getTime()}, false);
        let vehicle4 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3462", "Creta");
        parkingLotObject.park({'vehicle': vehicle4, 'inTime': new Date().getTime()}, false);
        let vehicle5 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3463", "Creta");
        parkingLotObject.park({'vehicle': vehicle5, 'inTime': new Date().getTime()}, false);
        parkingLotObject.unPark(vehicle2);
        parkingLotObject.unPark(vehicle4);
        parkingLotObject.park({
            'vehicle': new vehicle.Vehicle("Large Vehicle", "red", "MH21-3457", "Creta"),
            'inTime': new Date().getTime()
        }, false);
        let arr = parkingLotObject.giveEmptySlots();
        let expectedArray = [{i: 0, j: 2}, {i: 0, j: 3}, {i: 1, j: 2}];
        assert.deepEqual(arr, expectedArray);
    });

    it('given vehicles when parked and handicap driver come for parke should return nearest lot', () => {
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(3, [3, 3, 3], [1, 1, 1])
        let vehicle1 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3466", "Creta");
        parkingLotObject.park({'vehicle': vehicle1, 'inTime': new Date().getTime()}, true);
        let vehicle2 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3477", "Creta");
        ;
        parkingLotObject.park({'vehicle': vehicle2, 'inTime': new Date().getTime()}, false);
        let vehicle3 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3488", "Creta");
        parkingLotObject.park({'vehicle': vehicle3, 'inTime': new Date().getTime()}, false);
        let vehicle4 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3499", "Creta");
        ;
        parkingLotObject.park({'vehicle': vehicle4, 'inTime': new Date().getTime()}, true);
        let vehicle5 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3400", "Creta");
        parkingLotObject.park({'vehicle': vehicle5, 'inTime': new Date().getTime()}, true);
        let vehicle6 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3406", "Creta");
        parkingLotObject.park({'vehicle': vehicle6, 'inTime': new Date().getTime()}, true);
        assert.deepEqual(parkingLotObject.getParkingLot(true), {'lot': 0, 'row': 0})
    });
});

describe('test for finding vehicle in parking lot', () => {
    it('given vehicle when parked should return slot number of parkinglot', () => {
        let vehicle1 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3466", "Creta");
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(3, [4, 4, 4], [1, 1, 1]);
        parkingLotObject.park({'vehicle': vehicle1, 'inTime': new Date().getTime()}, false);
        let vehicle2 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3465", "Creta");
        ;
        parkingLotObject.park({'vehicle': vehicle2, 'inTime': new Date().getTime()}, false);
        let vehicle3 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3456", "Creta");
        parkingLotObject.park({'vehicle': vehicle3, 'inTime': new Date().getTime()}, false);
        let result = parkingLotObject.findMyVehicle({'vehicle': vehicle3});
        assert.equal(result, 2);

    })
});

describe('test for evenly distribution of vehicle among lots', () => {
    it('given vehicles when parked in lots and another come for parked should return parking lot number', () => {
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(3, [5, 4, 4], [1, 1, 1])
        let vehicle1 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3466", "Creta");
        parkingLotObject.park({'vehicle': vehicle1, 'inTime': new Date().getTime()}, false);
        let vehicle2 = new vehicle.Vehicle("Large Vehicle", "red", "MH21-3466", "Creta");
        parkingLotObject.park({'vehicle': vehicle2, 'inTime': new Date().getTime()}, false);
        assert.deepEqual(parkingLotObject.getParkingLot(), {'lot': 0, 'row': 0});
    });
});

describe('test for finding lot and slot number from vehicle attributes ', () => {
    it('given a vehicle with color when parked should return  white color vehicle slot and lot number', () => {
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(3, [3, 3, 3], [1, 1, 1])
        let vehicle1 = new vehicle.Vehicle("Large vehicle", "red", "MH32-1234");
        parkingLotObject.park({'vehicle': vehicle1, 'inTime': "2012-05-18 05:37:21"});
        let vehicle2 = new vehicle.Vehicle("Small vehicle", "white", "MH32-1240");
        parkingLotObject.park({'vehicle': vehicle2, 'inTime': "2012-05-18 06:37:21"});
        let vehicle3 = new vehicle.Vehicle("Small vehicle", "white", "MH32-1444");
        parkingLotObject.park({'vehicle': vehicle3, 'inTime': "2012-05-18 07:37:21"});
        let result = parkingLotObject.findVehicleFromAttributes("white");
        assert.deepEqual(result, [{'vehicle number': 'MH32-1240', lotNumber: 1, rowNumber: 0, slotNumber: 0},
            {'vehicle number': 'MH32-1444', lotNumber: 2, rowNumber: 0, slotNumber: 0}])
    });
    it('given a vehicle with color,numberPlate,model when parked should return  blue color toyoto vehicle', () => {
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(3, [3, 3, 3],[1,1,1])
        let vehicle1 = new vehicle.Vehicle("Large vehicle", "red", "MH21-3456", "Creta");
        parkingLotObject.park({'vehicle': vehicle1, 'inTime': "2012-05-18 05:37:21"});
        let vehicle2 = new vehicle.Vehicle("Small vehicle", "white", "MH23-5678", "Nano");
        parkingLotObject.park({'vehicle': vehicle2, 'inTime': "2012-05-18 06:37:21"});
        let vehicle3 = new vehicle.Vehicle("Small vehicle", "blue", "MH32-1234", "Toyoto");
        parkingLotObject.park({'vehicle': vehicle3, 'inTime': "2012-05-18 07:37:21"});
        let result = parkingLotObject.findVehicleFromAttributes("blue", "Toyoto");
        assert.deepEqual(result, [{'vehicle number': 'MH32-1234', lotNumber: 2,rowNumber:0, slotNumber: 0}])
    });

    it('given a vehicle with color,numberPlate,model when parked should return BMW  vehicle', () => {
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(3, [3, 3, 3], [1, 1, 1])
        let vehicle1 = new vehicle.Vehicle("Large vehicle", "red", "MH21-3456", "Creta");
        parkingLotObject.park({'vehicle': vehicle1, 'inTime': new Date()}, false);
        let vehicle2 = new vehicle.Vehicle("Small vehicle", "white", "MH23-5678", "BMW");
        parkingLotObject.park({'vehicle': vehicle2, 'inTime': new Date()}, false);

        let vehicle3 = new vehicle.Vehicle("Small vehicle", "blue", "MH32-1234", "BMW");
        parkingLotObject.park({'vehicle': vehicle3, 'inTime': new Date()}, false);
        let result = parkingLotObject.findVehicleFromAttributes(undefined, "BMW");
        assert.deepEqual(result, [{'vehicle number': 'MH23-5678', lotNumber: 1, rowNumber: 0, slotNumber: 0},
            {'vehicle number': 'MH32-1234', lotNumber: 2, rowNumber: 0, slotNumber: 0}])
    });
});

describe('test for finding location of all vehicle which parked before half hour  ', () => {
    it('given a vehicle with color,numberPlate,model when parked should return vehicle parked before half hour', () => {
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(3, [3, 3, 3], [1, 1, 1]);
        let vehicle1 = new vehicle.Vehicle("Large vehicle", "red", "MH21-3456", "Creta");
        parkingLotObject.park({'vehicle': vehicle1, "inTime": new Date(Date.now() - (5 * 60 * 1000)).getTime()});
        //sleep.sleep(60);
        let vehicle2 = new vehicle.Vehicle("Small vehicle", "white", "MH23-5678", "BMW");
        parkingLotObject.park({'vehicle': vehicle2, "inTime": new Date().getTime()});
        let vehicle3 = new vehicle.Vehicle("Small vehicle", "blue", "MH32-1234", "BMW");
        parkingLotObject.park({'vehicle': vehicle3, "inTime": new Date(Date.now() - (5 * 60 * 1000)).getTime()});
        let result = parkingLotObject.findVehicle(30);
        assert.deepEqual(result, [{'vehicle number': 'MH21-3456', lotNumber: 0, rowNumber: 0, slotNumber: 0},
        ])
    });
});

describe('test for finding location of all vehicle given driver Property(isHandicap) and vehicle Type ', () => {
    it('given a vehicles when parked should return vehicle which are small and driver is handicap', () => {
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(2, [4, 4], [4, 4], [1, 1]);
        let vehicle1 = new vehicle.Vehicle("Large vehicle", "red", "MH21-3456", "Creta");
        parkingLotObject.park({'vehicle': vehicle1, "inTime": new Date(Date.now() - (5 * 60 * 1000)).getTime()}, false);
        let vehicle2 = new vehicle.Vehicle("Small vehicle", "white", "MH23-5678", "BMW");
        parkingLotObject.park({'vehicle': vehicle2, "inTime": new Date().getTime()}, true);
        let vehicle3 = new vehicle.Vehicle("Large vehicle", "white", "MH21-5678", "BMW");
        parkingLotObject.park({'vehicle': vehicle3, "inTime": new Date().getTime()}, true);
        let vehicle4 = new vehicle.Vehicle("Small vehicle", "white", "MH22-5678", "BMW");
        parkingLotObject.park({'vehicle': vehicle4, "inTime": new Date().getTime()}, true);
        let vehicle5 = new vehicle.Vehicle("Small vehicle", "white", "MH22-5678", "BMW");
        parkingLotObject.park({'vehicle': vehicle5, "inTime": new Date().getTime()}, true);
        let vehicle6 = new vehicle.Vehicle("Small vehicle", "white", "MH22-5678", "BMW");
        parkingLotObject.park({'vehicle': vehicle6, "inTime": new Date().getTime()}, false);
        let vehicle7 = new vehicle.Vehicle("Small vehicle", "white", "MH22-5678", "BMW");
        parkingLotObject.park({'vehicle': vehicle7, "inTime": new Date().getTime()}, false);
        let result = parkingLotObject.findLocationGivenLotRowsAndVehicleType([1, 3], 'Small vehicle');
        assert.deepEqual(result, [{'vehicle number': 'MH22-5678', lotNumber: 0, rowNumber: 1, slotNumber: 0}]);
    });
});

describe('test for finding location of all vehicle', () => {
    it('given a vehicles when parked should return all vehicle information ', () => {
        let parkingLotObject = new Parkinglot.ParkingLots();
        parkingLotObject.createParkingLotArray(2, [4, 4], [4, 4]);
        let vehicle1 = new vehicle.Vehicle("Large vehicle", "red", "MH21-3456", "Creta");
        parkingLotObject.park({'vehicle': vehicle1, "inTime": new Date(Date.now() - (5 * 60 * 1000)).getTime()}, false);
        let vehicle2 = new vehicle.Vehicle("Small vehicle", "white", "MH23-5678", "BMW");
        parkingLotObject.park({'vehicle': vehicle2, "inTime": new Date().getTime()}, true);
        let vehicle3 = new vehicle.Vehicle("Large vehicle", "white", "MH21-5678", "BMW");
        parkingLotObject.park({'vehicle': vehicle3, "inTime": new Date().getTime()}, true);
        let result = parkingLotObject.findAllVehicles()
        assert.deepEqual(result, [{'vehicle number': 'MH21-3456', lotNumber: 0, slotNumber: 0},
            {'vehicle number': 'MH23-5678', lotNumber: 0, slotNumber: 0},
            {'vehicle number': 'MH21-5678', lotNumber: 0, slotNumber: 0}]);

    });
});