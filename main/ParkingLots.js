parkingLotOwner=require('./ParkingLotOwner');
class ParkingLots{
    vehicle=[];
    capacity;

    constructor(capacity) {
        this.capacity=capacity;
    }

    park(vehicle) {
        if(vehicle===undefined)
            throw new Error('vehicle can not be undefined');

        if(vehicle==null)
            throw new Error('vehicle can not be null');

        if(!this.isFull()){
            this.vehicle.push(vehicle);
            return true;
        }
        return false;
    }

    unPark(vehicle) {
        if(vehicle===undefined)
            throw new Error('vehicle can not be undefined');

        if(vehicle==null)
            throw new Error('vehicle can not be null');

        if (!this.isEmpty()) {
            this.vehicle.pop();
            return true;
        }
        return false;
    }

    isFull(){
        let isFull=this.vehicle.length==this.capacity;
        if(isFull){
            return parkingLotOwner.isFull();
        }
        return isFull;
    }

    isEmpty(){
        return this.vehicle.length==0;
    }
}

module.exports = {ParkingLots}