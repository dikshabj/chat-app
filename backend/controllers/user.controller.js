import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // ✅ Added this import
import { createTokenAndSaveCookie } from "../jwt/generateToken.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        if (newUser) {
            // Token create karein
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_TOKEN, { expiresIn: '15d' });
            
            // Cookie set karein (Backup ke liye)
            createTokenAndSaveCookie(newUser._id, res);

            res.status(201).json({
                message: "User registered successfully!",
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
                token: token // ✅ Token frontend ko bhej rahe hain
            });
        }

    } catch (error) {
        console.log("Error in signup:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user?.password || "");

        if (!user || !isMatch) {
            return res.status(404).json({ message: "Invalid username or password" });
        }

        // ✅ Token Generate karein (Jo missing tha)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: '15d' });

        // Cookie set karein
        createTokenAndSaveCookie(user._id, res);

        res.status(201).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token: token // ✅ Ab ye error nahi dega
        });
    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({
            message: "User logged out successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUserProfile: " + error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const updateProfile = async(req, res) => {
    try {
        //check krna h ki file aai h ke nhi
        const localFilePath = req.file?.path;

        if(!localFilePath){
            return res.status(400).json({error : "Profile picture is required!"});

        }

        //cloudinary function call
        const uploadResponse = await uploadOnCloudinary(localFilePath);

        if(!uploadResponse){
            return res.status(500).json({error : "Failed to upload on cloudinary!"});

        }

        //database update
        const userId = req.user._id;
        const user = await User.findById(userId);

        user.profilePic = uploadResponse.secure_url;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in updateProfile:", error.message);
        res.status(500).json({error : "Internal server error"});
        
    }
}