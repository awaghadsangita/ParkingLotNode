let assert=require('assert');
let Parkinglot=require('../main/ParkingLots');
let vehicle=require('../main/Vehicle')

describe('test for parking lot',()=> {
    it('given vehicle when parked should return true', () => {
        let vehicleObj = new vehicle.Vehicle();
        assert.equal(new Parkinglot.ParkingLots().park(vehicleObj), true);
    });

    it('given null when parked should return throw error', () => {
        try {
            new Parkinglot.ParkingLots().park(null)
        } catch (e) {
            assert.equal(e.message, "vehicle can not be null");
        }
    });

    it('given undefined when parked should return throw error', () => {
        try {
            new Parkinglot.ParkingLots().park(undefined)
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined");
        }
    });
});

describe('test for un parking vehicle from parking lot',()=> {
    it('given vehicle parked and when un parked should return true',()=>{
        let vehicleObj=new vehicle.Vehicle();
        let parkingLotObject=new Parkinglot.ParkingLots();
        parkingLotObject.park(vehicleObj);
        assert.equal(parkingLotObject.unPark(vehicleObj),true);
    });

    it('given undefined when un parked should return throw error', () => {
        try {
            let vehicleObj=new vehicle.Vehicle();
            let parkingLotObject=new Parkinglot.ParkingLots();
            parkingLotObject.park(vehicleObj);
            parkingLotObject.unPark(undefined);
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined");
        }
    });

});
