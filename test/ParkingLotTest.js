let assert=require('assert');
let parkingLot=require('../main/ParkingLot');
let vehicle=require('../main/Vehicle')
describe('test for parking lot',()=>{
    it('given vehicle when parked should return true',()=>{
        let vehicleObj=new vehicle.Vehicle();
        assert.equal(new parkingLot.ParkingLot().park(vehicleObj),true);
    });
});
