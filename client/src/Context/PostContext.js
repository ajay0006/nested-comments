import React, {useContext, useMemo} from "react";
import {useAsync} from "../Hooks/useAsync";
import {getPost} from "../services/postsApi";
import {useParams} from "react-router-dom";
// keep in mind i want the posts state to be available to every other component in my application, i dont want to run the useEffect everytime i want the data
// its like saying i am going to ping the server everytime for every data, including the individual post

// in order to achieve this i am using React's context
// this allows me to share state with multiple components
const Context = React.createContext()

export function usePost() {
    return useContext(Context)
}

function PostProvider({children}) {
    // you know what this does
    const {id} = useParams()
    // i am using the getPost api i created in the postApi.js file and i am calling it in the async function i created in the hooks folder, aka a custom hook
    // since the only thing that changes in a post is the id, i have set the id as a dependency
    // because the async function returns an object not an array i am spreading the data received into loading, error and post
    const {loading, error, value: post} = useAsync(() => getPost(id), [id])

    // i want to group the comments into separate arrays based of their parentId's
    // i am using useMemo for performance reasons
    const commentsByParentId = useMemo(() => {
        if (post?.comments == null) return []
        const group = {}
        post.comments.forEach(comment => {
            group[comment.parentId] ||= []
            group[comment.parentId].push(comment)
        })
        return group
    }, [post?.comments])

    function getReplies(parentId) {
        return commentsByParentId[parentId]
    }

    return (
        <Context.Provider value={{
            post: {id, ...post},
            getReplies,
            rootComments: commentsByParentId[null],
        }}>
            {loading ? <h1>Loading ... </h1>
                : error ? <h1 className='error-msg'> {error}</h1>
                    : children}
        </Context.Provider>
    )
}

export default PostProvider