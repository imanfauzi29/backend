const { Schema, model } = require("mongoose")

const questSchema = new Schema(
    {
    	teacher: {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
            required: true
        },
        subject: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            required: true
        },
        grade: {
            type: Schema.Types.ObjectId,
            ref: "Grade",
            required: true
        },
        quest: {
            type: Schema.Types.Mixed,
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

const Quest = model("Quest", questSchema)

module.exports = Quest

