const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")

const userSchema = new Schema(
    {
        ip_address: {
            type: String,
            required: true,
            trim: true
        },
        first_name: String,
        last_name: String,
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 4,
            maxlength: 12,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Format email is invalid")
                }
            }
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "role",
            required: true
        },
        email_activation: String,
        active: {
            type: Boolean,
            default: true
        },
        company: String,
        phone: Number,
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username })
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            return await User.findOne({ username })
                .select("-password -tokens")
                .populate({
                    path: "role",
                    model: "Role",
                    select: { role_name: 1, _id: 0 },
                    match: {active: 1}
                })
        }
        throw new Error("unable to login!")
    } else {
        throw new Error("User not found!")
    }
}

userSchema.methods.encryptPassword = async (password) => {
    return await bcrypt.hash(password, 8)
}

userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.AUTHTOKENSTRING
    )
    user.tokens = { token }

    try {
        await user.save()
    } catch (error) {
        throw new Error(error)
    }

    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    return userObject
}

const User = model("User", userSchema)

module.exports = User
