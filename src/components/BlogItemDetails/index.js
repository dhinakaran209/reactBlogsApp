import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.getContent()
  }

  getContent = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const content = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const data = await content.json()
    const updatedContent = {
      author: data.author,
      id: data.id,
      title: data.title,
      content: data.content,
      topic: data.topic,
      avatarUrl: data.avatar_url,
      imageUrl: data.image_url,
    }
    this.setState({blogData: updatedContent, isLoading: false})
  }

  renderBlogItemDetails = () => {
    const {blogData, isLoading} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-info">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          <>
            <h2 className="blog-details-title">{title}</h2>

            <div className="author-details">
              <img className="author-pic" src={avatarUrl} alt={author} />
              <p className="details-author-name">{author}</p>
            </div>

            <img className="blog-image" src={imageUrl} alt={title} />
            <p className="blog-content">{content}</p>
          </>
        )}
      </div>
    )
  }

  render() {
    return <div className="blog-container">{this.renderBlogItemDetails()}</div>
  }
}

export default BlogItemDetails
