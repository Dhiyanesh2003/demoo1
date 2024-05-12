const User = require("../models/User");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

const googleAuth = async (req, res) => {
	try {
		const { access_token } = req.body;

		const userInfo = await axios
			.get("https://www.googleapis.com/oauth2/v3/userinfo", {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
			.then((res) => res.data);

		let user = await User.findOne({ email: userInfo.email });
		if (!user) {
			user = await User.create({
				email: userInfo.email,
				name: userInfo.name,
				profilePicUrl: userInfo.picture,
				authUsed: "google oauth",
			});
			await user.save();
		}
		const jwtToken = jwt.sign(
			{ email: user.email, id: user._id },
			process.env.JWT_SECRET
		);

		res.status(200).json({ token: jwtToken });
	} catch (error) {
		console.error("Google authentication error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const verifyAuth = async (req, res) => {
	try {
		const user = req.user;

		res.status(200).json({
			user: user,
			isAuthorized: true,
		});
	} catch (error) {
		console.error("authentication error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { googleAuth, verifyAuth };
