const Role = require("../models/Roles")
const Student = require("../models/Students")
const User = require("../models/Users")
const response = require("../utils/response")

const ctrlStudent = {}

ctrlStudent.updateStudent = async (req, res) => {
    const { studentId } = req.params
    try {
        const {
            first_name,
            last_name,
            role,
            company,
            phone,
            nim,
            gender,
            grade
        } = req.body

        const student = await Student.findByIdAndUpdate(
            { _id: studentId },
            {
                nim,
                gender,
                grade
            },
            {
                returnOriginal: false
            }
        )

        try {
            await User.findByIdAndUpdate(
                { _id: student.user },
                { first_name, last_name, company, phone, role }
            )
            res.status(200).send(
                await response.success({
                    message: "Success update data",
                    data: student
                })
            )
        } catch (error) {
            throw new Error(error)
        }
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

ctrlStudent.getStudent = async (req, res) => {
    try {
        const student = await Student.find()
            .populate({
                path: "user",
                select: {
                    first_name: 1,
                    last_name: 1,
                    email: 1,
                    username: 1,
                    active: 1
                },
                populate: {
                    path: "role",
                    model: Role,
                    select: { role_name: 1, _id: 0, active: 1 }
                }
            })
            .populate("grade", { _id: 0, grade_name: 1 })
            .sort({ field: "asc" })
            .exec()

        res.status(200).send(
            await response.success({
                message: "Success retrive data",
                data: student
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

ctrlStudent.getStudentById = async (req, res) => {
    const { studentId } = req.params
    try {
        const student = await Student.findById(studentId)

        res.status(200).send(
            await response.success({
                message: "Success retrive data",
                data: student
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

ctrlStudent.deleteStudent = async (req, res) => {
    const { studentId} = req.params
    try {
        const student = await Student.findByIdAndDelete(studentId)
        if (student === null) throw new Error("Cant find user")
        if (Object.keys(student).length < 1) throw new Error("Failed to delete data")
        
        const user = await User.deleteOne({_id: student.user})

        if (user.deletedCount > 0) {
            res.status(200).send(
                await response.success({
                    message: "Success retrive data",
                    data: user
                })
            )
        }
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

module.exports = ctrlStudent
