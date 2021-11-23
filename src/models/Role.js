const { Schema, model } = require("mongoose")

const roleSchema = new Schema(
    {
        role_name: {
            type: String,
            required: true
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

const Role = model("Role", roleSchema)

module.exports = Role
