const administrator = async (req, res, next) => {
    try {
        const { require_token } = req.headers
        const [adm, date] = Buffer.from(
            require_token, "base64"
          ).toString("utf8").split("|")

        if (adm !== "administrator")
            throw new Error("Cant access to this endpoint!")

        // expire
        const expire = new Date(new Date(date).getTime() + 5 * 60000).getTime()
        const now = new Date().getTime()

        if (expire - now < 0) throw new Error("Cant access to this endpoint!")

        next()
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = administrator
