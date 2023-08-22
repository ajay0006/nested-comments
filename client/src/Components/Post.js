import {usePost} from "../Context/PostContext";
import {useAsync, useAsyncFn} from "../Hooks/useAsync";
import {getPosts} from "../services/postsApi";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import {createComment} from "../services/commentsApi";

// why use a context, well code that does the same things pretty much has to be in the same place
//in order to keep this page tidy and make it easy to debug i have created a context file
function Post() {
    const {loadingNum, errorNum, valueNum: posts} = useAsync(getPosts)
    const {post, rootComments} = usePost()

    // only using this function on submit thats why i am using the useAsyncFn instead of the normal one
    const {loading, error, execute: createCommentFn} = useAsyncFn(createComment)

    function onCommentCreate (content) {
        return createCommentFn({ postId: post.id, content }).then(comment => {
            console.log(content)
            console.log(comment)
        })
    }

    let number = ''

    if (posts) {
        let postsResult = Object.values(posts)
        number = postsResult.findIndex((postInd) => (postInd.id === post.id))
    }


    if (loadingNum) return <h1> Loading...</h1>
    if (errorNum) return <h1 className='error-msg'> {errorNum}</h1>
    return (
        <>
            <h1> Post {number + 1}</h1>
            <article> {post.content}</article>
            <h3 className='comments-title'>Comments</h3>
                {/*we have the ability to load posts aka comments but we also have to include the component to handle how to create one*/}
            <section>
                <CommentForm
                loading={loading}
                error = {error}
                onSubmit={onCommentCreate}
                />
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