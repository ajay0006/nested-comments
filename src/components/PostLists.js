import {useEffect, useState} from "react";
import {
    getPosts as getPostsApi,
    createPost as createPostApi,
    updatePost as updatePostApi,
    deletePost as deletePostApi,
} from "../api";
import {Link} from "react-router-dom";
import {useAsync} from "../hooks/useAsync";

export function PostLists() {
    const {loading, error, value: posts} = useAsync(getPostsApi)

    if (loading) {
        return <h1> Loading...</h1>
    }
    if (loading) {
        return <h1 className='error-msg'> {error}</h1>
    }

    return posts.map(post => {
        return (
            <h1 key={post.id}>
                <Link to={`/posts/${post.id}`}> {post.content}</Link>
            </h1>
        )
    })
}