import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = []

// Write your code here

class Comments extends Component {
  state = {
    commentsList: initialCommentsList,
    yourName: '',
    userComment: '',
  }

  updateStateFields = event => {
    event.preventDefault()
    const {yourName, userComment} = this.state
    if (yourName !== '' && userComment !== '') {
      const newComment = {
        yourName,
        userComment,
        cssBackgroundColor:
          initialContainerBackgroundClassNames[Math.floor(Math.random() * 7)],
        uuid: uuidv4(),
        createdDate: new Date(),
        isCommentLiked: false,
      }

      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        yourName: '',
        userComment: '',
      }))
    }
  }

  updateLikeStatus = id => {
    const {commentsList} = this.state

    const updatedCommentsList = commentsList.map(eachComment => {
      if (eachComment.uuid === id) {
        const updatedObj = {
          ...eachComment,
          isCommentLiked: !eachComment.isCommentLiked,
        }
        return updatedObj
      }
      return eachComment
    })

    this.setState({commentsList: updatedCommentsList})
  }

  updateCommentsList = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(
      eachComment => eachComment.uuid !== id,
    )
    this.setState({commentsList: filteredCommentsList})
  }

  onChangeInputElement = event => {
    const inputValue = event.target.value
    this.setState({yourName: inputValue})
  }

  onChangeTextareaElement = event => {
    const inputValue = event.target.value
    this.setState({userComment: inputValue})
  }

  render() {
    const {commentsList, yourName, userComment} = this.state

    return (
      <div className="main-container">
        <div className="responsive-container">
          <div className="form-image-container">
            <h1 className="comments-heading one">Comments</h1>
            <div className="comments-inputs-container">
              <h1 className="comments-heading two">Comments</h1>
              <p className="description">
                Say something about 4.0 Technologies
              </p>
              <form onSubmit={this.updateStateFields} className="form-element">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={yourName}
                  className="text-input"
                  onChange={this.onChangeInputElement}
                />
                <textarea
                  rows="6"
                  cols="50"
                  value={userComment}
                  placeholder="Your Comments"
                  className="textarea-element"
                  onChange={this.onChangeTextareaElement}
                />
                <button type="submit" className="submit-button">
                  Add Comment
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
                className="image"
              />
            </div>
          </div>
          <hr />
          <div className="comment-count-container">
            <p id="commentsCount">{commentsList.length}</p>
            <label htmlFor="commentCount">Comments</label>
          </div>
          <ul className="comments-container">
            {commentsList.map(eachComment => (
              <CommentItem
                comment={eachComment}
                key={uuidv4()}
                updateLikeStatus={this.updateLikeStatus}
                updateCommentsList={this.updateCommentsList}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
