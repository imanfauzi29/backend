const Subjects = require("../models/Subjects")
const Teachers = require("../models/Teachers")
const response = require("../utils/response")

const teacherCtrl = {}

// Add Teachers
teacherCtrl.addTeacher = async (req, res) => {
    const body = req.body

    try {
        //code here
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

/** 
/* Update Teachers by id
/* params :teacherId
/* body {}
*/
teacherCtrl.updateTeacher = async (req, res) => {
    const { teacherId } = req.params
    const body = req.body

    try {
        const teacher = new Teachers()
        const subjects = await teacher.toObjectId(body.subject)
        body.subject = subjects
        const t = await Teachers.findByIdAndUpdate({_id: teacherId}, body, {returnOriginal: false})

        res.status(200).send(
            await response.success({
                message: "Success delete data!",
                data: t
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

// Get Teachers
teacherCtrl.getTeacher = async (req, res) => {
    try {
        const teacher = await Teachers.find()
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
                    model: "Role",
                    match: { active: 1 },
                    select: { role_name: 1, _id: 0 }
                }
            })
            .populate({
                path: "subject",
                select: "_id subject_name subject_code",
                match: { active: 1 }
            })
            .sort({ field: "asc" })
            .exec()

        res.status(200).send(
            await response.success({
                message: "Success delete data!",
                data: teacher
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

/** 
/* Get Teachers by id
/* params :teacherId
*/
teacherCtrl.getTeacherById = async (req, res) => {
    const { teacherId } = req.params

    try {
        const teacher = await Teachers.findById(teacherId)
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
                    model: "Role",
                    match: { active: 1 },
                    select: { role_name: 1, _id: 0 }
                }
            })
            .populate({
                path: "subject",
                select: "_id subject_name subject_code",
                match: { active: 1 }
            })
            .sort({ field: "asc" })
            .exec()

        res.status(200).send(
            await response.success({
                message: "Success delete data!",
                data: teacher
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

/** 
/* Delete Teachers
/* params :teacherId
*/
teacherCtrl.deleteTeacher = async (req, res) => {
    const { teacherId } = req.params

    try {
        const teacher = await Teachers.findByIdAndDelete(teacherId)
        if (teacher === null) throw new Error("Cant find user")
        if (Object.keys(teacher).length < 1)
            throw new Error("Failed to delete data")

        const user = await User.deleteOne({ _id: student.user })

        if (user.deletedCount > 0) {
            res.status(200).send(
                await response.success({
                    message: "Success delete data",
                    data: user
                })
            )
        }
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

module.exports = teacherCtrl
