const Subject = require("../models/Subject")
const response = require("../utils/response")

const subjectCtrl = {}

// Add Subject
subjectCtrl.addSubject = async (req, res) => {
    const body = req.body

    try {
        const subject = await new Subject(body)
        const data = await subject.save()

        res.status(200).send(
            await response.success({
                message: "New subject has been created!",
                data
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

/** 
/* Update Subject by id
/* params :subjectId
/* body {}
*/
subjectCtrl.updateSubject = async (req, res) => {
    const { subjectId } = req.params
    const body = req.body

    try {
        const subject = await Subject.findOneAndUpdate({ _id: subjectId }, body, {returnOriginal: false})
        res.status(200).send(
            await response.success({
                message: "Success update data!",
                data: subject
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

// Get Subject
subjectCtrl.getSubject = async (req, res) => {
    try {
        const subject = await Subject.find()

        res.status(200).send(
            await response.success({
                message: "Success retrive data!",
                data: subject
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

/** 
/* Get Subject by id
/* params :subjectId
*/
subjectCtrl.getSubjectById = async (req, res) => {
    const { subjectId } = req.params

    try {
        const subject = await Subject.findById(subjectId)
        res.status(200).send(
            await response.success({
                message: "Success retrive data!",
                data: subject
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

/** 
/* Delete Subject
/* params :subjectId
*/
subjectCtrl.deleteSubject = async (req, res) => {
    const { subjectId } = req.params

    try {
        const subject = await Subject.findOneAndDelete({ _id: subjectId })

        res.status(200).send(
            await response.success({
                message: "Success delete data!",
                data: subject
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

module.exports = subjectCtrl
