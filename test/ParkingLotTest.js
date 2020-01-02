let assert=require('assert');
let Parkinglot=require('../main/ParkingLots');
let vehicle=require('../main/Vehicle')

describe('test for parking lot',()=>{
    it('given vehicle when parked should return true',()=>{
        let vehicleObj=new vehicle.Vehicle();
        assert.equal(new Parkinglot.ParkingLots().park(vehicleObj),true);
    });

    it('given vehicle parked and when unparked should return true',()=>{
        let vehicleObj=new vehicle.Vehicle();
        let parkingLotObject=new Parkinglot.ParkingLots();
        parkingLotObject.park(vehicleObj);
        assert.equal(parkingLotObject.unPark(vehicleObj),true);
    });
});