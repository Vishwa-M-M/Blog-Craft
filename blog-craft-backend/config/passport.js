const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// User model (if applicable)
const User = require("../models/User"); // Optional: Define a User model

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser((id, done) => {
    // Find user by ID (if using database)
    User.findByPk(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});

// Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const [user] = await User.findOrCreate({
                    where: { googleId: profile.id },
                    defaults: {
                        email: profile.emails[0].value,
                        name: profile.displayName,
                        avatar: profile.photos[0].value,
                    },
                });
                done(null, user);
            } catch (err) {
                done(err);
            }
        }
    )
);
