const response = {}

response.success = async ({ message = "", data = [] }) => {
    const count = typeof data !== "object" ? data.length : data !== null ? 1 : 0
    const initial = {
        code: 200,
        is_success: true,
        message,
        data,
        total: count
    }

    return initial
}

response.failed = async ({ message = "" }) => {
    const initial = {
        code: 400,
        is_success: false,
        message,
        data: []
    }

    return initial
}

module.exports = response
