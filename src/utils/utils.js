const os = require("os")
const utils = {}

utils.getIp = () => {
    const networkInterfaces = Object.values(os.networkInterfaces())
        .reduce((r, a) => {
            r = r.concat(a)
            return r
        }, [])
        .filter(({ family, address }) => {
            return (
                family.toLowerCase().indexOf("v4") >= 0 &&
                address !== "127.0.0.1"
            )
        })
        .map(({ address }) => address)
    const ipAddresses = networkInterfaces.join(", ")
    return ipAddresses
}

utils.GetPaginate = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page > 1 ? page * limit : 0;

    return [limit, offset];
}

module.exports = utils
