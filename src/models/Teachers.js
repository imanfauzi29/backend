const { Schema, model, Types } = require("mongoose")

const teacherSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        nip: {
            type: Number,
            minlength: 6,
            default: ""
        },
        gender: {
            type: String,
            maxlength: 1,
            default: ""
        },
        active: {
            type: Boolean,
            default: true
        },
        subject: [{ type: Schema.Types.ObjectId, ref: "Subject" }]
    },
    {
        timestamps: true
    }
)

teacherSchema.methods.toObjectId = async (array) => {
    return Object.values(array).map((subject) => {
        const arr = []
        arr.push(Types.ObjectId(subject))
        return arr
    })
}

const Teachers = model("Teacher", teacherSchema)
module.exports = Teachers
