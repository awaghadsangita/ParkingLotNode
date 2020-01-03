class AirportSecurity {
    isFull(obj) {
        const e = {message: "free space avialable"}
        obj.emit('isFull', e);
        return e.message;
    }
}

module.exports = new AirportSecurity();