class CustomError {
    constructor(status, message, extraDetails) {
        this.status = status;           // HTTP status or custom status code
        this.message = message;         // Error message
        this.extraDetails =  extraDetails ; // Optional: additional error info
    }
}

module.exports = CustomError;