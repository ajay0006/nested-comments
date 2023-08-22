import makeRequest from "./makeRequest";

export function createComment ({ postId, content, parentId }) {
    return makeRequest(`posts/${postId}/comments`, {
        method: 'POST',
        data: { content, parentId},
    })

}