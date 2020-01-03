let assert=require('assert');
let Parkinglot=require('../main/ParkingLots');
let vehicle=require('../main/Vehicle');

describe('test for parking vehicle in parking lot',()=> {
    it('given vehicle when parked should return true', () => {
        let vehicleObj = new vehicle.Vehicle();
        assert.equal(new Parkinglot.ParkingLots(1).park(vehicleObj), true);
    });

    it('given null when parked should return throw error', () => {
        try {
            new Parkinglot.ParkingLots(1).park(null)
        } catch (e) {
            assert.equal(e.message, "vehicle can not be null");
        }
    });

    it('given undefined when parked should return throw error', () => {
        try {
            new Parkinglot.ParkingLots(1).park(undefined)
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined");
        }
    });

    it('given vehicle when parked and lot is full should return true', () => {
        let vehicle1 = new vehicle.Vehicle();
        let parkingLot=new Parkinglot.ParkingLots(1)
        parkingLot.park(vehicle1);
        assert.equal(parkingLot.isFull(), true);
    });

});

describe('test for un parking vehicle from parking lot',()=> {
    it('given vehicle parked and when un parked should return true',()=>{
        let vehicleObj=new vehicle.Vehicle(1);
        let parkingLotObject=new Parkinglot.ParkingLots();
        parkingLotObject.park(vehicleObj);
        assert.equal(parkingLotObject.unPark(vehicleObj),true);
    });

    it('given undefined when un parked should return throw error', () => {
        try {
            let vehicleObj=new vehicle.Vehicle(1);
            let parkingLotObject=new Parkinglot.ParkingLots();
            parkingLotObject.park(vehicleObj);
            parkingLotObject.unPark(undefined);
        } catch (e) {
            assert.equal(e.message, "vehicle can not be undefined");
        }
    });

    it('given null when un parked should return throw error', () => {
        try {
            let vehicleObj=new vehicle.Vehicle(1);
            let parkingLotObject=new Parkinglot.ParkingLots();
            parkingLotObject.park(vehicleObj);
            parkingLotObject.unPark(undefined);
        } catch (e) {
            assert.equal(e.message, "vehicle can not be null");
        }
    });
});

describe('test for parking lot is full',()=> {
    it('when parking lot is full informed to parking lot owner should return true', () => {
        let vehicle1 = new vehicle.Vehicle();
        let parkingLotObject=new Parkinglot.ParkingLots();
        parkingLotObject.park(vehicle1);
        let vehicle2 = new vehicle.Vehicle();
        assert.equal(parkingLotObject.park(vehicle2), true);
    });
});