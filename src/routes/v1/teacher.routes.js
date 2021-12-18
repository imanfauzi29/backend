const { Router } = require("express")
const router = Router()
const {
    updateTeacher,
    getTeacher,
    getTeacherById,
    deleteTeacher
} = require("../../controllers/v1/teacher.controller")
const auth = require("../../middlewares/auth")

router.get("/teacher", auth, getTeacher)
router.get("/teacher/:teacherId", auth, getTeacherById)
router.put("/teacher/:teacherId/update", auth, updateTeacher)
router.delete("/teacher/:teacherId", auth, deleteTeacher)

module.exports = router
