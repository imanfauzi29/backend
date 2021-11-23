const Role = require("../models/Role")
const response = require("../utils/response")

const roleCtrl = {}

roleCtrl.addRole = async (req, res) => {
    const newRole = new Role(req.body)
    try {
        await newRole.save()
        res.status(200).send(
            await response.success({ message: "Role has been created!" })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

roleCtrl.getAllRole = async (req, res) => {
    try {
        const role = await Role.find()

        res.status(200).send(
            await response.success({
                message: "Success retrive data",
                data: role
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

roleCtrl.getRoleById = async (req, res) => {
    try {
        const { roleId } = req.params
        const role = await Role.findById(roleId)

        res.status(200).send(
            await response.success({
                message: "Success retrive data",
                data: role
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

roleCtrl.updateRole = async (req, res) => {
    const { roleId } = req.params
    const body = req.body

    try {
        const role = await Role.findByIdAndUpdate({ _id: roleId }, body, {
            returnOriginal: false
        })

        res.status(200).send(
            await response.success({
                message: "Success update data",
                data: role
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

roleCtrl.deleteRole = async (req, res) => {
    try {
        const { roleId } = req.params
        const role = await Role.deleteOne({_id: roleId})

        res.status(200).send(
            await response.success({
                message: "Success delete data",
                data: role
            })
        )
    } catch (error) {
        res.status(400).send(await response.failed({ message: error.message }))
    }
}

module.exports = roleCtrl
