/*
      const express = require("express");
      const passport = require("passport");
      const session = require("express-session");
      const dotenv = require("dotenv");
      const sequelize = require("./config/db");
      const Post = require("./models/Post");
      const bodyParser = require('body-parser');
      const postRoutes = require("./routes/posts");
      //const postsRoutes = require('./routes/posts');
      const path = require('path');
      const app = express();

      // Serve the blog folder
      app.use('/blog', express.static(path.join(__dirname, 'file:///C:/Users/shamr/Documents/Vishwa_Documents/Web_Dev/Personal_Blog/index.html')));

      app.use(bodyParser.json());

      app.use('/api', postsRoutes);
      
      // Load environment variables
      dotenv.config();
      
      // Google OAuth Strategy
      const GoogleStrategy = require("passport-google-oauth20").Strategy;
      
      // Serialize and Deserialize user
      passport.serializeUser((user, done) => {
        done(null, user);
      });
      
      passport.deserializeUser((user, done) => {
        done(null, user);
      });
      
      // Configure Google OAuth strategy
      passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
          },
          (accessToken, refreshToken, profile, done) => {
            // Process the authenticated user's profile
            console.log("Google profile:", profile);
            return done(null, profile);
          }
        )
      );
      
      // Middleware
      app.use(express.json());
      app.use(
        session({
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: true,
        })
      );
      app.use(passport.initialize());
      app.use(passport.session());
      
      // Routes
      app.use(postRoutes);
      
      app.get("/", (req, res) => {
        res.send("Welcome to Blog-Craft Backend");
      });
      
      // Test Route for Creating a Post
      app.post("/test-post", async (req, res) => {
        try {
          const post = await Post.create({
            title: "Test Blog Post",
            content: "This is a test blog post to check if the database works.",
          });
          res.status(201).json({
            message: "Post created successfully!",
            post,
          });
        } catch (err) {
          res.status(500).json({ message: "Error creating post", error: err });
        }
      });
      
      // Google OAuth Routes
      app.get(
        "/auth/google",
        passport.authenticate("google", {
          scope: ["profile", "email"],
        })
      );
      
      app.get(
        "/auth/google/callback",
        passport.authenticate("google", { failureRedirect: "/login" }),
        (req, res) => {
          res.redirect("/dashboard");
        }
      );
      
      // Logout Route
      app.get("/logout", (req, res) => {
        req.logout((err) => {
          if (err) {
            return res.send(err);
          }
          res.redirect("/");
        });
      });
      
      // Protected Route
      app.get("/dashboard", (req, res) => {
        if (!req.isAuthenticated()) {
          return res.status(401).send("You are not authorized");
        }
        res.send(`Hello, ${req.user.displayName}`);
      });
      
      // Sync Database
      sequelize.sync({ force: false })
        .then(() => {
          console.log("Database synced successfully.");
        })
        .catch((err) => {
          console.error("Error syncing database:", err);
        });
      
      // Start the server
      const PORT = process.env.PORT || 5001;
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
      */

      const express = require("express");
      const dotenv = require("dotenv");
      const bodyParser = require("body-parser");
      const session = require("express-session");
      const passport = require("passport");
      const postsRoutes = require("./routes/posts");
      const sequelize = require("./config/db");
      const User = require("./models/User");
      require("./config/passport"); // Assuming you set up Passport for Google Auth
      
      dotenv.config();
      const app = express();
      
      // Middleware
      app.use(bodyParser.json());
      
      // Express session
      app.use(
          session({
              secret: process.env.SESSION_SECRET || "secret",
              resave: false,
              saveUninitialized: true,
          })
      );
      
      // Passport middleware
      app.use(passport.initialize());
      app.use(passport.session());
      
      // Routes
      app.use("/api", postsRoutes);
      
      // Home route
      app.get("/", (req, res) => {
          res.send("Welcome to the Blog Platform API!");
      });
      
      // Google Auth route
      app.get(
          "/auth/google",
          passport.authenticate("google", { scope: ["profile", "email"] })
      );
      
      // Google Auth callback route
      app.get(
          "/auth/google/callback",
          passport.authenticate("google", { failureRedirect: "/" }),
          (req, res) => {
              res.redirect("/dashboard"); // Redirect to dashboard or desired route
          }
      );

      //Dashboard
      app.get("/dashboard", (req, res) => {
        if (req.isAuthenticated()) {
            res.send("Welcome to the Dashboard!"); // Replace this with your actual dashboard page
        } else {
            res.redirect("/"); // If the user is not authenticated, redirect to home page
        }
    });
      
    app.get(
      "/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/" }),
      (req, res) => {
          res.redirect("/dashboard"); // Redirect to the dashboard after successful login
      }
    );

    app.get("/dashboard", (req, res) => {
      if (req.isAuthenticated()) {
          res.json({ message: "Welcome to the Dashboard!", user: req.user });
      } else {
          res.status(401).json({ message: "Unauthorized. Please log in first." });
      }
  });

      // Logout route
      app.get("/logout", (req, res) => {
          req.logout((err) => {
              if (err) {
                  return res.status(500).json({ message: "Error logging out", error: err });
              }
              res.status(200).json({ message: "Logged out successfully" });
          });
      });
      
      // Test route for creating a post
      app.post("/test/create-post", async (req, res) => {
          try {
              const { title, content } = req.body;
              const Post = require("./models/Post");
              const post = await Post.create({ title, content });
              res.status(201).json({ message: "Post created successfully!", post });
          } catch (err) {
              res.status(500).json({ message: "Error creating post", error: err });
          }
      });
      
      // Sync database and start server
      const PORT = process.env.PORT || 3000;
      sequelize.sync({ alter: true })
          .then(() => {
              console.log("Database synchronized");
              app.listen(PORT, () => {
                  console.log(`Server is running on http://localhost:${PORT}`);
              });
          })
          .catch((err) => {
              console.error("Error synchronizing the database:", err);
          });
      
      
      