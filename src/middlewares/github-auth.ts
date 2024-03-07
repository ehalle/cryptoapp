import config from "config";
import passport from "passport";
import { Profile, Strategy } from "passport-github2";

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


passport.use(new Strategy({ ...config.get('github') }, function (accessToken, refreshToken, profile: Profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
}
));

export default passport;

