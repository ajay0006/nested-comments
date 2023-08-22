import {usePost} from "../Context/PostContext";
import {Link} from "react-router-dom";
import {useAsync} from "../Hooks/useAsync";
import {getPosts} from "../services/postsApi";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

// why use a context, well code that does the same things pretty much has to be in the same place
//in order to keep this page tidy and make it easy to debug i have created a context file
function Post() {
    const {loading, error, value: posts} = useAsync(getPosts)
    const {post, rootComments} = usePost()
    let number = ''

    if (posts) {
        let postsResult = Object.values(posts)
        number = postsResult.findIndex((postInd) => (postInd.id === post.id))
    }


    if (loading) return <h1> Loading...</h1>
    if (error) return <h1 className='error-msg'> {error}</h1>
    return (
        <>
            <h1> Post {number + 1}</h1>
            <article> {post.content}</article>
            <h3 className='comments-title'>Comments</h3>
                {/*we have the ability to load posts aka comments but we also have to include the component to handle how to create one*/}
            <section>
                <CommentForm />
                {rootComments != null && rootComments.length > 0 && (
                    <div className='mt-4'>
                        <CommentList comments={rootComments} />
                    </div>
                )}
            </section>
        </>
    )
}

export default Post