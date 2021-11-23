const { Router } = require("express")
const router = Router()
const auth = require("../middlewares/auth")
const { addRole, updateRole, getAllRole, getRoleById, deleteRole } = require("../controllers/role.controller")

router.post("/role", auth, addRole)
router.get("/role", auth, getAllRole)
router.get("/role/:roleId", auth, getRoleById)
router.put("/role/:roleId/update", auth, updateRole)
router.delete("/role/:roleId", auth, deleteRole)

module.exports = router
