require('dotenv').config()
const app = require("./src/app")
require("./src/db/database")

async function main() {
    await app.listen(app.get("port"))
    console.log(`Server running on http://localhost:${app.get("port")}`)
}


// server listen 
main()