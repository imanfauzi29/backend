const { Router } = require("express")
const router = Router()
const { addQuest, updateQuest, getQuest, getQuestById, deleteQuest } = require("../../controllers/v1/quest.controller")
const quest = require("../../middlewares/quest")

router.post("/quest", quest, addQuest)
router.get("/quest", getQuest)
router.get("/quest/:questId", getQuestById)
router.put("/quest/:questId/update", quest, updateQuest)
router.delete("/quest/:questId", deleteQuest)

module.exports = router
