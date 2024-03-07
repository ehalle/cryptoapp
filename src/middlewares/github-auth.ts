import config, { get } from "config";
import passport from "passport";
import { Profile, Strategy } from "passport-github2";
import getModel from "../models/user/factory";

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


passport.use(new Strategy({ ...config.get('github') }, async function (accessToken, refreshToken, profile: Profile, done) {
    console.log('hello');
    try {
        const githubId = profile.id;
        let user = await getModel().get(githubId);
        if (!user) user = await getModel().signup({ githubId });
        if(!user) return done(null, false);
        return done(null, user);
    } catch(err) {
        done(err);
    }
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
}
));

export default passport;

