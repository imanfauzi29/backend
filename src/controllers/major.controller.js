const Majors = require("../models/Majors")
const response = require("../utils/response")

const majorCtrl = {}

// Add major
majorCtrl.addMajor = async (req, res) => {
    const body = req.body

    try {
        const major = await new Majors(body)
        const data = await major.save()

        res.status(200).send(
            await response.success({
                message: "New major has been created!",
                data
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

/** 
/* Update major by id
/* params :majorId
/* body {}
*/
majorCtrl.updateMajor = async (req, res) => {
    const { majorId } = req.params
    const body = req.body

    try {
        const major = await Majors.findByIdAndUpdate(majorId, body)
        res.status(200).send(
            await response.success({
                message: "Success update data!",
                data: major
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

// Get major
majorCtrl.getMajor = async (req, res) => {
    try {
        const major = await Majors.find()

        res.status(200).send(
            await response.success({
                message: "Success retrive data!",
                data: major
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

/** 
/* Get major by id
/* params :majorId
*/
majorCtrl.getMajorById = async (req, res) => {
    const { majorId } = req.params

    try {
        const major = await Majors.findById({_id: majorId})

        res.status(200).send(
            await response.success({
                message: "Success retrive data!",
                data: major
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

/** 
/* Delete major
/* params :majorId
*/
majorCtrl.deleteMajor = async (req, res) => {
    const { majorId } = req.params

    try {
        const major = await Majors.deleteOne({_id: majorId})
        if (major.deletedCount < 1) throw new Error("Failed to delete data")

        res.status(200).send(
            await response.success({
                message: "Success retrive data!",
                data: major
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

module.exports = majorCtrl
