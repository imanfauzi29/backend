const { Router } = require("express")
const router = Router()
const { addSubject, updateSubject, getSubject, getSubjectById, deleteSubject } = require("../controllers/subject.controller")

router.post("/subject", addSubject)
router.get("/subject", getSubject)
router.get("/subject/:subjectId", getSubjectById)
router.put("/subject/:subjectId/update", updateSubject)
router.delete("/subject/:subjectId", deleteSubject)

module.exports = router
