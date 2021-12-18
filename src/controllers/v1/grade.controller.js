const Grades = require("../../models/Grades")
const response = require("../../utils/response")

const gradeCtrl = {}

// Add grade
gradeCtrl.addGrade = async (req, res) => {
    const body = req.body

    try {
        const grade = new Grades(body)
        const data = grade.save()

        res.status(200).send(
            await response.success({
                message: "New grade has been created!",
                data
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

/** 
/* Update grade by id
/* params :gradeId
/* body {}
*/
gradeCtrl.updateGrade = async (req, res) => {
    const { gradeId } = req.params
    const body = req.body

    try {
        const grade = await Grades.findOneAndUpdate({ _id: grade_id }, body)
        res.status(200).send(
            await response.success({
                message: "Success update data",
                data: grade
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

// Get grade
gradeCtrl.getGrade = async (req, res) => {
    try {
        const grade = await Grades.find()
            .populate({
                path: "major",
                match: { active: true },
                select: "_id major_name major_type"
            })
            .where("active")
            .equals(true)
            .exec()

        console.log(grade)

        res.status(200).send(
            await response.success({
                message: "Success retrive data",
                data: grade
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

/** 
/* Get grade by id
/* params :gradeId
*/
gradeCtrl.getGradeById = async (req, res) => {
    const { gradeId } = req.params

    try {
        const grade = await Grades.findById(gradeId)
            .populate({
                path: "major",
                match: { active: true },
                select: "_id major_name major_type"
            })
            .where("active")
            .equals(true)
            .exec()
        res.status(200).send(
            await response.success({
                message: "Success retrive data",
                data: grade
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

/** 
/* Delete grade
/* params :gradeId
*/
gradeCtrl.deleteGrade = async (req, res) => {
    const { gradeId } = req.params

    try {
        const grade = await Grades.deleteOne({ _id: gradeId })
        if (grade.deletedCount < 1) throw new Error("Failed delete data")

        res.status(200).send(
            await response.success({
                message: "Success retrive data",
                data: grade
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

module.exports = gradeCtrl
