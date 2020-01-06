class Vehicle{
    vehicleType;
    model;
    numberPlate;
    color;
    constructor(vehicleType,color,numberPlate,model){
        this.vehicleType=vehicleType;
        this.color=color;
        this.numberPlate=numberPlate;
        this.model=model;
    }
}
module.exports={Vehicle}
