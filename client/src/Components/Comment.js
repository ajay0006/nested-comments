import IconBtn from "./IconBtn";
import {FaHeart, FaEdit, FaReply, FaTrash} from "react-icons/fa";
import {usePost} from "../Context/PostContext";
import CommentList from "./CommentList";
import {useState} from "react";
import CommentForm from "./CommentForm";
import {useAsyncFn} from "../Hooks/useAsync";
import {createComment, deleteComment, updateComment} from "../services/commentsApi";
import useUserName from "../Hooks/useUserName";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
})

function Comment({id, content, user, createdAt}) {
    // keep in mind by default we will only be able to render the root comments
    // to be able to render the child comments we have to get them, keep in mind that even though root comments and child comments are
    // the same object, what differentiates them is that child comments are replies
    // cos of that we are going to use the context and get comments by parentId aka replies, since every comment that has a parentId is a reply

    const [areChildrenHidden, setAreChildrenHidden] = useState(false)
    // state to handle the reply functionality
    const [isReplying, setIsReplying] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const createCommentFn = useAsyncFn(createComment)
    const updateCommentFn = useAsyncFn(updateComment)
    const deleteCommentFn = useAsyncFn(deleteComment)

    const {post, getReplies, createLocalComments, updateLocalComments, deleteLocalComments} = usePost()

    // do not forget that we passed the id, post, rootComments & the getReplies function to every child component that renders beneath the
    // context provider, and since the origin of the comment component starts from the post component, the function is available here
    const childComments = getReplies(id)

    // i want to disable delete and edit buttons for post where i am not the owner
    const currentUser = useUserName()

    function onCommentReply(content) {
        return createCommentFn
            .execute({postId: post.id, content, parentId: id})
            .then(comment => {
                setIsReplying(false)
                createLocalComments(comment)
            })
    }

    function onCommentUpdate(content) {
        return updateCommentFn
            .execute({postId: post.id, content, id})
            .then(comment => {
                setIsEditing(false)
                updateLocalComments(id, comment.content)
            })
    }

    function onCommentDelete() {
        return deleteCommentFn
            .execute({postId: post.id, id})
            .then(comment => deleteLocalComments(comment.id))
    }

    return (
        <>
            <div className="comment">
                <div className='header'>
                    <span className='name'>{user.userName}</span>
                    <span className='date'>{dateFormatter.format(Date.parse(createdAt))}</span>
                </div>
                {
                    isEditing ?
                        <CommentForm
                            autoFocus
                            initialValue={content}
                            onSubmit={onCommentUpdate}
                            loading={updateCommentFn.loading}
                            error={updateCommentFn.error}
                        />
                        : <div className='message'> {content} </div>
                }
                <div className='footer'>
                    <IconBtn Icon={FaHeart} aria-label="Like">
                        2
                    </IconBtn>
                    <IconBtn
                        onClick={() => setIsReplying(prev => !prev)}
                        isActive={isReplying}
                        Icon={FaReply}
                        aria-label={isReplying ? "Cancel Reply" : "Reply"}
                    />
                    {user.id === currentUser.id &&
                        <>
                            <IconBtn
                                onClick={() => setIsEditing(prev => !prev)}
                                isActive={isEditing}
                                Icon={FaEdit}
                                aria-label={isEditing ? "Cancel Edit" : "Edit"}

                            />
                            <IconBtn
                                disabled={deleteCommentFn.loading}
                                onClick={onCommentDelete}
                                Icon={FaTrash}
                                aria-label="Delete"
                                color='danger'
                            />
                        </>
                    }
                </div>
                {
                    deleteCommentFn.error &&
                    <div className='error-msg mt-1'> {deleteCommentFn.error} </div>
                }
            </div>
            {isReplying && (
                <div className='mt-1 ml-3'>
                    <CommentForm
                        autoFocus
                        onSubmit={onCommentReply}
                        loading={createCommentFn.loading}
                        error={createCommentFn.error}/>
                </div>
            )}
            {childComments?.length > 0 && (
                <>
                    <div className={`nested-comments-stack ${areChildrenHidden ? 'hide' : ''}`}>
                        <button
                            className='collapse-line'
                            aria-label='Hide Replies'
                            onClick={() => setAreChildrenHidden(true)}
                        />
                        <div className='nested-comments'>
                            <CommentList comments={childComments}/>
                        </div>
                    </div>
                    <button
                        className={`btn mt-1 ${!areChildrenHidden ? 'hide' : ''}`}
                        onClick={() => setAreChildrenHidden(false)}>

                    </button>

                </>
            )}
        </>
    )
}

export default Comment