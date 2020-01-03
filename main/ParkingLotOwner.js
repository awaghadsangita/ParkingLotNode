class ParkingLotOwner {
    isFull(obj){
        const e={message:"free space available"}
        obj.emit('isFull',e);
        return e.message;
    }
}
module.exports=new ParkingLotOwner();