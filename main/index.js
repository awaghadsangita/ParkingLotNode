let parkingLot=require('./ParkingLots');
parkingLot.on('isFull',()=>{
    return "lot is full "
})

module.exports=parkingLot;