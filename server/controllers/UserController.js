import { User } from "../models/User.js";
import { generateToken } from "../helpers/userHelpers.js";
import bcrypt from "bcryptjs";


export async function login(req, res) {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
        res.status(404).json({
            errors: ["User not found"]
        });
        return;
    }

    const passwordsMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordsMatch) {
        res.status(422).json({
            errors: ["Wrong password"]
        });
        return ;
    }

    res.status(200).json({
        _id: userExists._id,
        profileImage: userExists.profileImage,
        token: generateToken(userExists._id)
    });
}

export async function logout(req, res) {

}

export async function createUser(req, res) {
    const { name, email, password, password_confirmation } = req.body;

    const userAlreadyExists = await User.findOne({ email: email });
    if (userAlreadyExists) {
        res.status(422).json({ errors: ["This email is already registered."] });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        profileImage: "",
        bio: ""
    });


    if (!newUser) {
        res.status(422).json({ errors: ["There was an error in the system. Try again later."] })
        return;
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
}

export async function readUsers(req, res) {
    const users = await User.find({}).sort([["createdAt", -1]]).exec(); 
    if(!users) {
        res.status(422).json({errors: ["There are no users registered."]})
        return ;
    }

    res.status(200).json({ users }); 
}

export async function readCurrentUser(req, res) {
    const { user } = req;
    const { _id, name, email, profileImage, bio } = user;
    res.status(200).json({
        message: `Welcome ${user.name}`,
        _id,
        name,
        email,
        profileImage,
        bio
    })
}

export async function readUserById(req, res) {
    const { id } = req.params;

    if(!id) {
        res.status(422).json({ errors: ["Id is required"] });
        return;
    }

    try {
        const user = await User.findById(id); 
        const { _id, name, email, bio, profileImage } = user;
        res.status(200).json({
            _id, name, email, profileImage, bio
        }); 
    } catch(e) {
        console.log(e.message); 
        res.status(404).json({ errors: ["User not found"] });
    }
}

export async function updateUser(req, res) {
    const { name, password, bio } = req.body;
    let profileImage = undefined;

    if (req.file) {
        profileImage = req.file.filename;
    }

    const reqUser = req.user;
    const user = await User.findById(String(reqUser._id)).select("-password");
    if (!user) {
        res.status(404).json({ errors: ["User not found"] });
        return;
    }

    if (name) {
        user.name = name;
    }

    if (password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        user.password = hashedPassword;
    }

    if (profileImage) {
        user.profileImage = profileImage;
    }

    if (bio) {
        user.bio = bio;
    }

    await user.save();

    res.status(200).json({
        _id: user._id,
        name,
        email: user.email,
        profileImage,
        bio
    });
}

export async function deleteUser(req, res) {
    const { id } = req.params; 

    if(!id) {
        res.status(422).json({errors: ["User ID is required."]});
        return ; 
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id); 

        if(!deletedUser) {
            res.status(404).json({errors: ["User not found"]});
            return ;
        }

        res.status(200).json({ deletedUser, message: "User successfully deleted"}); 
    } catch(e) {
        console.log(e.message);
        res.status(422).json({errors: ["Error. Try again later."]});
    }
}



