const response = {}

response.success = async ({message = "", data = []}) => {
    const initial = {
        code: 200,
        is_success: true,
        message,
        data
    }

    return initial
}

response.failed = async({message = ""}) => {
    const initial = {
        code: 400,
        is_success: false, 
        message,
        data: []
    }

    return initial
}

module.exports = response