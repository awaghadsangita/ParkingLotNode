let assert=require('assert');
let Parkinglot=require('../main/ParkingLots');
let vehicle=require('../main/Vehicle')

describe('test for parking lot',()=>{
    it('given vehicle when parked should return true',()=>{
        let vehicleObj=new vehicle.Vehicle();
        assert.equal(new Parkinglot.ParkingLots().park(vehicleObj),true);
    });

    it('given null when parked should return throw error',()=>{
        try{
            new Parkinglot.ParkingLots().park(null)
        }catch(e){
            assert.equal(e.message,"vehicle can not be null");
        }
    });

    it('given vehicle parked and when un parked should return true',()=>{
        let vehicleObj=new vehicle.Vehicle();
        let parkingLotObject=new Parkinglot.ParkingLots();
        parkingLotObject.park(vehicleObj);
        assert.equal(parkingLotObject.unPark(vehicleObj),true);
    });

    it('vehicle parked when parking lot is full should return true',()=>{
        let vehicleObj=new vehicle.Vehicle();
        let parkingLotObject=new Parkinglot.ParkingLots(1);
        parkingLotObject.park(vehicleObj);
        assert.equal(parkingLotObject.unPark(vehicleObj),true);
    });
});