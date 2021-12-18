import axios from 'axios';

function LikeButton(props) {
  async function handleLike() {
    await axios.put(`/api/blogs/like/${props.blogId}`, '', '');
    props.setNotificationText('Liked Successfully');
    props.setShouldBlogsUpdate(true);
  }

  return (
    <button
      onClick={props.mockHandler ? props.mockHandler : handleLike}
      className="like-btn"
    >
      😍
    </button>
  );
}

export default LikeButton;
