import Controllers from "../../interfaces/controllers.js";
import {Router} from "express";
import session from 'cookie-session';
import PassportTool from "./Passport.js";


class AuthController implements Controllers {
    private path: string = '/auth';
    private readonly router: Router;
    private tools: PassportTool

    public constructor() {
        this.router = Router();
        this.tools = new PassportTool();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.use(this.tools.passportInitialize);
        this.router.use(this.tools.passportSession);
        this.router.get(`${this.path}/google`, this.tools.passportAuthenticateScope);
        this.router.get(`${this.path}/failed`, (req, res) => res.status(401).send("Failed"));
        this.router.get(`${this.path}/success`, (req, res) => res.status(200).send("Success"));
        this.router.get(`${this.path}/logout`, (req, res) => {
            req.session = null;
            //@ts-ignore
            req.logout();
            res.status(200).send("Logged out");
            res.redirect(`${this.path}`);
        })
        this.router.use(session({
            name: 'google-auth-session',
            keys: ["key1", "key2"]
        }))
    }

    getRouter(): Router {
        return this.router;
    }

    //@ts-ignore
    isLoggedIn(req, res, next) {
        if (req.user) {
            next();
            return;
        }
        res.sendStatus(401);
    }

    private getCallback() {
        this.router.use('/google/callback', this.tools.passportAuthenticateCallback, (req, res) => {
                res.redirect('/success');
            }
        )
    }
}

export default AuthController