const CustomError = require("../utils/Error-Class")

// const validate = (schema) => async (req,res,next) => {
//     try {
//         const parseBody = await schema.parseAsync(req.body);
//         console.log("parsebody",parseBody);
//         req.body = parseBody;
//         next();
//     } catch (err) {
//         console.log(err.issues[0].message);
//         return res.status(400).json({error:err.issues[0].message});
//     }
// };

function validate(schema){
     async function inner(req,res,next){
        try {

            const parseBody = await schema.parseAsync(req.body);
            req.body = parseBody;
            next();
        } catch (err) {
            const status = 400;
            const message = "fill the input properly"
            const extraDetails = err.issues[0].message;
            next(new CustomError(status,message,extraDetails));
        }
    }
    return inner;
}


module.exports = validate