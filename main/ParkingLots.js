class ParkingLots {
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
        if(this.isFull())
        this.vehicle.push(vehicle);
        return true;
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
        return this.vehicle.length<=this.capacity;
    }
    isEmpty(){
        return this.vehicle.length==0;
    }
}
module.exports = { ParkingLots }