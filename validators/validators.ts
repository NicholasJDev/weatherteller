import {query} from "express-validator";


class Validator {
    static validateId() {
        !query('id').isEmpty().isAlphanumeric().withMessage( "Id can't be empty").trim();
    }
    static validateBody () {
        query('body').isJSON({allow_primitives: true}).isEmpty()
    }
    static validateUserName () {
        let validation = !query('username', "Id can't be empty").isEmpty().isAlphanumeric();
        if (validation) {}
    }
}

export default Validator;