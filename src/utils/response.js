const response = {}

response.success =  ({ message = "", data = [] }) => {
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

response.withPaginate = ({message = "", result = {}}) => {
    const paginate = {
        code: 200,
        is_success: true,
        message,
        pagination: {
            total_records: result.totalDocs,
            total_page: result.totalPages,
            page: result.page > 0 ? 1 : result.page,
            offset: result.offset,
            limit: result.limit
        },
        data: result.docs,
    }

    return paginate
}

response.failed =  ({ message = "" }) => {
    const initial = {
        code: 400,
        is_success: false,
        message,
        data: []
    }

    return initial
}

module.exports = response
