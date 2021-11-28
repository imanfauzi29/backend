const { Router } = require("express")
const router = Router()
const {
    addSubject,
    updateSubject,
    getSubject,
    getSubjectById,
    deleteSubject
} = require("../controllers/subject.controller")
const auth = require("../middlewares/auth")

router.post("/subject", auth, addSubject)
router.get("/subject", auth, getSubject)
router.get("/subject/:subjectId", auth, getSubjectById)
router.put("/subject/:subjectId/update", auth, updateSubject)
router.delete("/subject/:subjectId", auth, deleteSubject)

module.exports = router
