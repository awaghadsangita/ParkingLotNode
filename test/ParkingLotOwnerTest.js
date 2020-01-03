let assert=require('assert');
let Parkinglot=require('../main/ParkingLots');
let vehicle=require('../main/Vehicle');
let parkinglotOwner=require('../main/ParkingLotOwner');

describe('test for parking lot is full',()=> {
    it('when parking lot is full informed to parking lot owner should return lot is Full', () => {
        let vehicle1 = new vehicle.Vehicle();
        Parkinglot.parkinglotObject.park(vehicle1);
        assert.equal( Parkinglot.parkinglotObject.park(new vehicle.Vehicle()), "lot is Full");
    });
});

