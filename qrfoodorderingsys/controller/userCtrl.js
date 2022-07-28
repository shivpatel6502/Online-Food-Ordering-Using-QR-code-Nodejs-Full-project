const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User=require('../model/user')

const userctrl = {
    register: async (req, res) => {
        try {

            const { name, email,pass } = req.body;

            if (!name || !email || !pass)
                return res.status(400).json({ msg: "Please fill all details" });

            // const check = await User.findOne({ email });
            //     if (check) return res.status(400).json({ msg: "This email already exists! Try again." });

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid email" });

            // password hashing
            const password = await bcrypt.hash(pass, 12);

            const newUser = new User({
                name, email, password
            });
            console.log(newUser)

            await newUser.save();

            res.json({ msg: "user registered successfully!" });
        } catch (err) {
            return res.status(500).json({
                msg: err.message,
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(req.body)

            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: "Invalid credentials!! Try again." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials!! Try again." });

            const refresh_token = createRefreshToken({ id: user._id });
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
            });
            
            res.json({ msg: "Successfully logged you in :)",refresh_token });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // get access token
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please login again!" });

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login again!" });

                const access_token = createAccessToken({ id: user.id });
                res.json({ access_token });
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // logout
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
            return res.json({ msg: "Logged out." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}

module.exports = userctrl;