import { Photo } from "../models/Photo.js";
import { User } from "../models/User.js";
import { Types } from "mongoose";


export async function createPhoto(req, res) {
    const { title } = req.body;
    const src = req.file.filename;
    const currentUser = req.user;

    const user = await User.findById(currentUser._id);

    if (!user) {
        res.status(422).json({ errors: ["User not found"] });
        return;
    }

    const photoObj = {
        title,
        src,
        comments: [],
        likes: [],
        userId: user._id,
        userName: user.name,
    }

    const newPhoto = await Photo.create(photoObj);
    if (!newPhoto) {
        res.status(422).json({ errors: ["There was an error. Try again later."] })
        return;
    }

    res.status(201).json(newPhoto);
}

export async function readPhotos(req, res) {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec();

    if (!photos) {
        res.status(422).json({ errors: "There are no photos..." });
        return;
    }

    res.status(200).json(photos);
}

export async function readUserPhotos(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(422).json({ errors: "User ID is required" });
        return;
    }

    try {
        const photos = await Photo.find({ userId: id }).sort([["createdAt", -1]]).exec();

        // if (!photos || photos.length == 0) {
        //     res.status(422).json({ errors: ["Not found photos for this user"] });
        //     return;
        // }

        // if (id != req.user._id) {
        //     res.status(422).json({ errors: ["User cannot access someone else's profile"] })
        //     return;
        // }

        res.status(200).json(photos);
    } catch (e) {
        console.log(e.message);
        res.status(422).json({ errors: ["Error. Try again later."] });
    }

}

export async function readPhotoById(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(422).json({ errors: ["Photo ID is required"] });
        return;
    }

    try {
        const photo = await Photo.findById(id);
        if (!photo) {
            res.status(404).json({ errors: ["Photo not found"] });
            return;
        }
        res.status(200).json(photo);
    } catch (e) {
        console.log(e.message);
        res.status(404).json({ errors: ["Photo ID is invalid"] });
    }
}

export async function updatePhoto(req, res) {
    const { id } = req.params;

    if (!id) {
        res.status(422).json({ errors: ["Photo ID is required"] });
        return;
    }

    try {
        const photo = await Photo.findById(id);
        const currentUser = req.user;
        const { title } = req.body;

        if (!photo) {
            res.status(404).json({ errors: ["Photo not found"] });
            return;
        }

        if (String(photo.userId) != String(currentUser._id)) {
            res.status(422).json({ errors: ["User cannot update someone else's photos"] });
            return;
        }

        if (title) {
            photo.title = title;
        }

        await photo.save();

        res.status(200).json({ photo, message: "Photo successfully updated" });
    } catch (e) {
        console.log(e.message);
        res.status(422).json({ errors: ["Error. Try again later"] });
    }
}

export async function deletePhoto(req, res) {
    const { id } = req.params;
    const currentUser = req.user;

    if (!id) {
        res.status(422).json({ errors: ["Photo ID is required"] });
        return;
    }

    try {
        const photo = await Photo.findById(id);

        if (!photo) {
            res.status(404).json({ errors: ["Photo not found"] });
            return;
        }

        if (String(photo.userId) != String(currentUser._id)) {
            res.status(404).json({ errors: ["User cannot delete someone else's photos"] });
            return;
        }

        const deletedPhoto = await Photo.findByIdAndDelete(photo._id);

        if (!deletedPhoto) {
            res.status(422).json({ errors: "Failed to delete photo" });
            return;
        }

        res.status(200).json({
            _id: photo._id,
            message: "Photo successfully deleted",
        });
    } catch (e) {
        res.status(404).json({ errors: ["Error. Try again later"] });
    }
}

export async function likePhoto(req, res) {
    const { id } = req.params;
    const currentUser = req.user;


    if (!id) {
        res.status(422).json({ errors: ["Photo ID is required."] });
        return;
    }

    try {
        const photo = await Photo.findById(id);
        if (!photo) {
            res.status(422).json({ errors: ["Photo not found"] });
            return;
        }

        // if(String(currentUser._id) == String(photo.userId)) {
        //     res.status(422).json({errors: ["User cannot like their own photo"]}); 
        //     return; 
        // }

        if (photo.likes.includes(currentUser._id)) {
            res.status(422).json({ errors: ["User already liked the photo"] });
            return;
        }

        photo.likes.push(currentUser._id);

        await photo.save();
        res.status(200).json({
            _id: photo._id,
            userId: currentUser._id,
            likes: photo.likes,
            message: "Photo successfully liked"
        });

    } catch (e) {
        console.log(e.message);
        res.status(422).json({ errors: ["Error. Try again later"] });
    }
}

export async function dislikePhoto(req, res) {
    const { id } = req.params;
    const currentUser = req.user;

    if (!id) {
        res.status(422).json({ errors: ["Photo ID is required."] });
        return;
    }

    try {
        const photo = await Photo.findById(id);
        if (!photo) {
            res.status(422).json({ errors: ["Photo not found"] });
            return;
        }

        if (!photo.likes.includes(currentUser._id)) {
            res.status(422).json({ errors: ["User haven't liked the photo"] });
            return;
        }

        const updatedLikes = photo.likes.filter(userId => String(userId) != String(currentUser._id)); 
        photo.likes = [...updatedLikes]; 
        await photo.save();

        res.status(200).json({
            _id: photo._id,
            userId: currentUser._id,
            updatedLikes, 
            message: "Photo successfully disliked"
        });

    } catch (e) {
        console.log(e.message);
        res.status(422).json({ errors: ["Error. Try again later"] });
    }
}

export async function createPhotoComment(req, res) {
    const { id } = req.params;
    const currentUser = req.user;

    if (!id) {
        res.status(422).json({ errors: ["Photo ID is required."] });
        return;
    }

    try {
        const photo = await Photo.findById(id);
        const { text } = req.body;
        const user = await User.findById(currentUser._id);

        if (!photo) {
            res.status(422).json({ errors: ["Photo not found"] });
            return;
        }

        if (!user) {
            res.status(422).json({ errors: ["Error. Try again later"] });
            return;
        }

        photo.comments.push({
            commentId: new Types.ObjectId(),
            text,
            userId: user._id,
            userName: user.name,
            userImage: user.profileImage,
        });

        await photo.save();
        res.status(200).json({
            _id: photo._id,
            comments: photo.comments,
            message: "A comment was added to the photo"
        })

    } catch (e) {
        console.log(e.message);
        res.status(422).json({ errors: ["Error. Try again later"] });
    }
}

export async function deletePhotoComment(req, res) {
    const { id, comment_id } = req.params;
    const currentUser = req.user;

    if (!id) {
        res.status(422).json({ errors: ["Photo ID is required."] });
        return;
    }

    if (!comment_id) {
        res.status(422).json({ errors: ["Comment ID is required."] });
        return;
    }

    try {
        const photo = await Photo.findById(id);
        if (!photo) {
            res.status(404).json({ errors: ["Photo not found"] });
            return;
        }

        // if((photo.userId) != (currentUser._id)) {
        //     res.status(422).json({errors: ["User cannot delete someone else's comments"]});
        //     return ;
        // }

        // const userComments = photo.comments.filter(comment => {
        //     return String(comment.userId) == String(currentUser._id); 
        // }); 

        // if(!userComments || userComments.length == 0) {
        //     res.status(422).json({errors: ["Error. Try again later."]});
        //     return ; 
        // }
        let user = null;
        const updatedComments = photo.comments.filter(comment => {
            if (String(comment.commentId) == String(comment_id)) {
                user = {
                    _id: comment.userId,
                    name: comment.userName
                }
            }
            return String(comment.commentId) != String(comment_id)
        });

        if (String(user._id) != String(currentUser._id)) {
            res.status(422).json({ errors: ["User cannot delete someone else's comments"] })
            return;
        }

        photo.comments = [...updatedComments];
        await photo.save()

        res.status(200).json({
            _id: id,
            commentId: comment_id,
            updatedComments,
            message: "Comment succesfully deleted"
        });
    } catch (e) {
        res.status(422).json({ errors: ["Error. Try again later."] });
    }

}

export async function searchPhotos(req, res) {
    const { q } = req.query;

    if (!q) {
        res.status(422).json({ errors: ["Search text is required"] })
        return;
    }

    const photos = await Photo.find({ title: new RegExp(q, "i") }).sort([["createdAt", -1]]).exec();

    // if (!photos) {
    //     res.status(404).json({ errors: ["No results found"] });
    //     return;
    // }

    res.status(200).json(photos);
}