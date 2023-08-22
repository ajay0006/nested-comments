import makeRequest from "./makeRequest";

// like i said services contains re-usable api request code, a function was already created called makeRequest
// now we are just passing that parameter to the function
// if we want all the posts, we pass the posts url
// if we want a single post we pass the post id
export function getPosts() {
    return makeRequest("/posts")
}
export function getPost(id) {
    return makeRequest(`/posts/${id}`)
}