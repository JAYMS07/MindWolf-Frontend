import Post from "../post.jsx";
import { useEffect, useState} from "react";

//we can create a post to display form database
export default function IndexPages() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the database
  useEffect(() => {
    fetch("http://localhost:5000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {/* <Post />
      <Post />
      <Post /> */}

      {posts.length > 0 && posts.map((post) =>
        <Post {...post} />
      )}
    </>
  );
}
