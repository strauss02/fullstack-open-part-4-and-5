import axios from 'axios';

function DeleteButton(props) {
  function handleDelete() {
    alert(`Are you sure you want to delete ${props.title}`);
    axios.delete(`/api/blogs/delete/${props.blogId}`);
    props.setNotificationText('Deleted Successfully!');
    props.setShouldBlogsUpdate(true);
  }

  return <button onClick={handleDelete}>Delete Post</button>;
}

export default DeleteButton;
