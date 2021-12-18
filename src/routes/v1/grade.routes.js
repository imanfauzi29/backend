const { Router } = require("express")
const router = Router()
const { addGrade, updateGrade, getGrade, getGradeById, deleteGrade } = require("../../controllers/v1/grade.controller")

router.post("/grade", addGrade)
router.get("/grade", getGrade)
router.get("/grade/:gradeId", getGradeById)
router.put("/grade/:gradeId/update", updateGrade)
router.delete("/grade/:gradeId", deleteGrade)

module.exports = router
