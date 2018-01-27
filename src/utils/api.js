import qs from 'qs'

const DEFAULT_BASE_URL = ''
const DEFAULT_HEADERS = {
    Accept: 'application/json, application/xml, text/plain, text/html, *.*',
}
const DEFAULT_CREDENTIALS = 'omit'
const DEFAULT_MODE = 'cors'

const GET_ONCE_CACHE = {}

export const contentTypes = {
    PLAIN: 0,
    JSON: 1,
    FORM_DATA: 2,
    // TODO multipart/form-data
}

function prepareUrl(path, query, baseUrl = DEFAULT_BASE_URL) {
    let url = `${baseUrl}${path}`
    const queryString = qs.stringify(query)
    if (queryString) {
        url = `${url}?${queryString}`
    }
    return url
}

function prepareHeaders(contentType) {
    const headers = {
        [contentTypes.PLAIN]: {
            'Content-Type': 'text/plain',
        },
        [contentTypes.JSON]: {
            'Content-Type': 'application/json',
        },
        [contentTypes.FORM_DATA]: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        // TODO multipart/form-data
    }[contentType]

    return { ...DEFAULT_HEADERS, ...headers }
}

function prepareBody(data, contentType) {
    if (!data) {
        return ''
    }

    switch (contentType) {
        case contentTypes.JSON:
            return JSON.stringify(data)
        case contentTypes.FORM_DATA:
            // const searchParams = new URLSearchParams()
            // Object.keys(data).forEach((key) => {
            //   searchParams.append(key, data[key])
            // })
            // return searchParams.toString()
            return data // TODO
        // TODO multipart/form-data
        default:
            return data
    }
}

function prepareAuthorization(options) {
    // TODO override headers, credentials here
    return options
}

const request = method => async ({
                                     path,
                                     query = '',
                                     data = '',
                                     contentType = contentTypes.JSON,
                                     credentials = DEFAULT_CREDENTIALS,
                                     mode = DEFAULT_MODE,
                                 }) => {
    const url = prepareUrl(path, query)
    const headers = prepareHeaders(contentType)
    const body = prepareBody(data, contentType)
    const options = prepareAuthorization({
        method,
        headers,
        body,
        mode,
        credentials,
    })

    const response = await fetch(url, { ...options, body: options.body || undefined })
    const responseData = await response.json()

    if (!response.ok) {
        return Promise.reject({ status: response.status, data: responseData })
    }
    return responseData
}

export const get = request('GET')
export const post = request('POST')
export const put = request('PUT')
export const patch = request('PATCH')
export const getOnce = ({ path, query = null }) => {
    const url = prepareUrl(path, query)

    if (!GET_ONCE_CACHE[url]) {
        GET_ONCE_CACHE[url] = get({ path, query })
    }

    return GET_ONCE_CACHE[url]
}