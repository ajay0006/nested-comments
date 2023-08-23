import makeRequest from "./makeRequest";

export function createComment ({ postId, content, parentId }) {
    return makeRequest(`posts/${postId}/comments`, {
        method: 'POST',
        data: { content, parentId},
    })

}

export function updateComment ({ postId, content, id }) {
    return makeRequest(`posts/${postId}/comments/${id}`, {
        method: 'PUT',
        data: { content},
    })

}

export function deleteComment ({ postId, id }) {
    return makeRequest(`posts/${postId}/comments/${id}`, {
        method: 'DELETE'
    })

}