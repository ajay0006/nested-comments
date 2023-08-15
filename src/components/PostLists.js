import {useEffect, useState} from "react";
import {
    getPosts as getPostsApi,
    createPost as createPostApi,
    updatePost as updatePostApi,
    deletePost as deletePostApi,
} from "../api";
import {Link} from "react-router-dom";

export function PostLists() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        getPostsApi().then(setPosts)
    }, []);
    return posts.map(post => {
        return (
            <h1 key={post.id}>
                <Link to={`/posts/${post.id}`}> {post.content}</Link>
            </h1>
        )
    })
}