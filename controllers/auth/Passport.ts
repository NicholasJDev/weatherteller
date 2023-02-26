import {Strategy} from "passport-google-oauth20";
import pkg from "passport";


class PassportTool {

    private strategy: Strategy;

    constructor() {
        this.strategy = new Strategy({
            clientID: `${process.env.CLIENT_ID}`,
            clientSecret: `${process.env.CLIENT_SECRET}`,
            callbackURL: process.env.HOST ? `http://localhost:8080/auth/google/callback` : `https://weatherapp-79s8.onrender.com + ${process.env.REDIRECT_API}`,
            passReqToCallback: true
        }, (req, accessToken, refreshToken, profile, done) => {
            return done(null, profile)
        })
    }

    public serialize() {
        pkg.serializeUser((user
                                , done) => {
            return done(null, user);
        })
    }public deSerialize() {
        pkg.deserializeUser((user , done) => {
            //@ts-ignore
            return done(null, user);
        })
    }

    passportInitialize() {
       pkg.initialize();
    }
    passportSession() {
        pkg.session();
    }

    passportAuthenticateScope(){
        try{
        pkg.authenticate('google', {
            scope: ['email', 'profile']
        }) } catch (e){
            console.log(e)
        }
    }
    passportAuthenticateCallback(){
        pkg.authenticate('google', {
            failureRedirect: 'failed'
        })
    }
}

export default PassportTool