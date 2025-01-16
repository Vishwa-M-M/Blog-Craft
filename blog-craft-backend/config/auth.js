const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Configure passport to use Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (token, tokenSecret, profile, done) => {
    // Here you can save the user profile to your database, create a new user if they don’t exist
    // For now, we will just send the user data back
    return done(null, profile);
  }
));

// Serialize user data
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user data
passport.deserializeUser((user, done) => {
  done(null, user);
});
