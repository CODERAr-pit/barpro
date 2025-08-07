import mongoose from "mongoose"

const shopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    location: {
        type: String,
        required: [true, "location is required"],
        unique: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    desc: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    //adding images

})

const Shop = mongoose.models.shops || mongoose.model("shops", shopSchema)
export default Shop