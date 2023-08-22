import {useEffect, useState} from "react";
import { getPosts } from "../services/postsApi";
import {Link} from "react-router-dom";
import {useAsync} from "../Hooks/useAsync";

function PostLists() {
    // downside to this is that when the function is still trying to get data, the variables are already set
    // this causes an undefined error type
const { loading, error, value: posts } = useAsync(getPosts)
    // to fix that i am simply creating a conditional statement, if the loading is true, that means the useAsync function hasnt stopped running, which means the useAsyncInternal hasnt initiated yet
    // just let me know you are loading
    // if there is an error display that error

    if (loading) return <h1> Loading...</h1>
    if (error) return <h1 className='error-msg'> {error}</h1>
    // else do your magic and display the results
    return (
        posts.map(post => {
            return (
                    <h1 key={post.id}>
                        <Link to={`/posts/${post.id}`}> Post {posts.indexOf(post) + 1}</Link>
                    </h1>
            )
        })
    )
}

export default PostLists