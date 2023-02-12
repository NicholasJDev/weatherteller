import {check, query} from "express-validator";
import {Types} from "mongoose";


class Validator {
    static validateId() {
        !query('id').isEmpty().isAlphanumeric().withMessage( "Id can't be empty").trim()
        query('id', "Id is a stringify object type.");
    }
    static validateBody () {
        query('body').isJSON({allow_primitives: true}).isEmpty()
    }
    static validateUserName () {
        !check('userName', "Id can't be empty").isEmpty()
        check('userName', "Id is a stringify object type.").isAlphanumeric();
    }
}

export default Validator;