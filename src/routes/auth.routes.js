const { Router } = require("express")
const router = Router()
const {
    loginUser,
    registerUser,
    updateUser,
    getAllUser,
    getUserById,
    deleteUser
} = require("../controllers/auth.controller")
const auth = require("../middlewares/auth")

router.post("/auth/login", loginUser)
router.post("/auth/register", registerUser)
router.get("/users", auth, getAllUser)
router.get("/user/:userId", auth, getUserById)
router.put("/user/:userId/update", auth, updateUser)
router.delete("/user/:userId", auth, deleteUser)

module.exports = router
