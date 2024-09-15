const CustomError = require("../utils/Error-Class");

const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "BACKEND ERROR";
    const extraDetails = err.extraDetails || "Error from Backend";

    return res
    .status(status)
    .json(new CustomError(status, message, extraDetails));
}

module.exports = errorMiddleware;