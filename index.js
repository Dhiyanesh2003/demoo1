const routes = require("./routes/routes");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors")

const app = express();
require("dotenv").config();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

const PORT = process.env.PORT || 5001;

mongoose
	.connect(process.env.CONNECTION_URL, {})
	.then(() =>
		app.listen(PORT, () => {
			console.log(`server running on port ${PORT}`);
		})
	)
    .catch((err) => console.log(err.message));

app.use("/api/v1/", routes);

// Secret key for JWT token
const JWT_SECRET = process.env.JWT_SECRET;



// Register a new user
// app.post('/register', async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Check if the username is already taken
//         const existingUser = await User.findOne({ username });
//         if (existingUser) return res.status(400).json({ message: 'Username already exists' });

//         // Hash the password before saving it to the database
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newUser = new User({ username, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Login route
// app.post('/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Find the user by username
//         const user = await User.findOne({ username });
//         if (!user) return res.status(400).json({ message: 'Invalid username or password' });

//         // Compare the provided password with the hashed password stored in the database
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) return res.status(400).json({ message: 'Invalid username or password' });

//         // Generate JWT token
//         const token = jwt.sign({ user: { id: user._id, username: user.username } }, JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ token });
//     } catch (error) {
//         console.error('Error logging in:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Protected route
// app.get('/protected', verifyToken, (req, res) => {
//     res.status(200).json({ message: 'Protected route accessed successfully' });
// });

// Start the server
