import IconBtn from "./IconBtn";
import {FaHeart, FaEdit, FaReply, FaTrash} from "react-icons/fa";
import {usePost} from "../Context/PostContext";
import CommentList from "./CommentList";
import {useState} from "react";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
})

function Comment({id, content, user, createdAt}) {
    // keep in mind by default we will only be able to render the root comments
    // to be able to render the child comments we have to get them, keep in mind that even though root comments and child comments are
    // the same object, what differentiates them is that child comments are replies
    // cos of that we are going to use the context and get comments by parentId aka replies, since every comment that has a parentId is a reply

    const {getReplies} = usePost()

    // do not forget that we passed the id, post, rootComments & the getReplies function to every child component that renders beneath the
    // context provider, and since the origin of the comment component starts from the post component, the function is available here
    const childComments = getReplies(id)
    const [areChildrenHidden, setAreChildrenHidden] = useState(false)
    return (
        <>
            <div className="comment">
                <div className='header'>
                    <span className='name'>{user.userName}</span>
                    <span className='date'>{dateFormatter.format(Date.parse(createdAt))}</span>
                </div>
                <div className='message'> {content} </div>
                <div className='footer'>
                    <IconBtn Icon={FaHeart} aria-label="Like">
                        2
                    </IconBtn>
                    <IconBtn Icon={FaReply} aria-label="Reply"/>
                    <IconBtn Icon={FaEdit} aria-label="Edit"/>
                    <IconBtn Icon={FaTrash} aria-label="Delete" color='danger'/>
                </div>
            </div>
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