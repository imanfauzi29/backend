const { Router } = require("express")
const router = Router()
const auth = require("../middlewares/auth")
const {
    updateStudent,
    getStudent,
    getStudentById,
    deleteStudent
} = require("../controllers/student.controller")

router.put("/student/:studentId/update", auth, updateStudent)
router.get("/student", auth, getStudent)
router.get("/student/:studentId", auth, getStudentById)
router.delete("/student/:studentId", auth, deleteStudent)

module.exports = router
