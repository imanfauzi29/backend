const { Schema, model } = require("mongoose")

const gradeSchema = new Schema(
    {
    	grade_name: {
            type: String,
            required: true,
            uppercase: true
        },
        major: {
            type: Schema.Types.ObjectId,
            ref: "Major"
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

gradeSchema.plugin(require("mongoose-paginate-v2"))

const Grades = model("Grade", gradeSchema)

module.exports = Grades

