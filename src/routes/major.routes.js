const { Router } = require("express")
const router = Router()
const {
    addMajor,
    updateMajor,
    getMajor,
    getMajorById,
    deleteMajor
} = require("../controllers/major.controller")
const auth = require("../middlewares/auth")

router.post("/major", auth, addMajor)
router.get("/major", auth, getMajor)
router.get("/major/:majorId", auth, getMajorById)
router.put("/major/:majorId/update", auth, updateMajor)
router.delete("/major/:majorId", auth, deleteMajor)

module.exports = router
