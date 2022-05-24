// Write your code here
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import './index.css'

const CommentItem = props => {
  const {comment, updateLikeStatus, updateCommentsList} = props

  const {
    yourName,
    userComment,
    cssBackgroundColor,
    uuid,
    createdDate,
    isCommentLiked,
  } = comment

  const displayPostedTime = () => {
    const postedDate = createdDate

    const result = formatDistanceToNow(
      new Date(
        postedDate.getFullYear(),
        postedDate.getMonth(),
        postedDate.getDate(),
        postedDate.getHours(),
        postedDate.getMinutes(),
        postedDate.getSeconds(),
      ),
      {
        includeSeconds: false,
      },
    )
    return `${result} ago`
  }

  const onClickingLike = () => {
    updateLikeStatus(uuid)
  }

  const deleteComment = () => {
    updateCommentsList(uuid)
  }

  return (
    <li className="comment-item">
      <div className="user-details-comment-container">
        <div className={`profile ${cssBackgroundColor}`}>
          <p className="first-letter">{yourName[0]}</p>
        </div>
        <div className="description-container">
          <div className="userName-posted-details-container">
            <h1 className="commenter-name">{yourName}</h1>
            <p className="posted-time">{displayPostedTime()}</p>
          </div>
          <p className="comment">{userComment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div>
          <img
            src={
              isCommentLiked
                ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
            }
            alt="like"
          />
          <button
            type="button"
            className={
              isCommentLiked
                ? 'like-button like-label'
                : 'like-button unlike-label'
            }
            id="likeButton"
            onClick={onClickingLike}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={deleteComment}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
