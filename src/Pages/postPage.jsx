import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../usercontext";
import Post from "../post";


export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (!id) return;
    fetch(`https://mindwolf.up.railway.app/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          console.error("Fetch failed with status:", response.status);
          setNotFound(true);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("Fetched post:", data);
          setPostInfo(data);
          setNotFound(false);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setNotFound(true);
      });
  }, [id]);

  if (notFound) {
    return <div>Post not found.</div>;
  }

  if (!postInfo) {
    return <div>Loading...</div>;
  }

 const coverSrc = postInfo.cover?.startsWith("http")
    ? postInfo.cover
    : `import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../usercontext";
import Post from "../post";


export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (!id) return;
    fetch(`http://mindwolf.up.railway.app/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          console.error("Fetch failed with status:", response.status);
          setNotFound(true);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("Fetched post:", data);
          setPostInfo(data);
          setNotFound(false);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setNotFound(true);
      });
  }, [id]);

  if (notFound) {
    return <div>Post not found.</div>;
  }

  if (!postInfo) {
    return <div>Loading...</div>;
  }

 const coverSrc = postInfo.cover?.startsWith("http")
    ? postInfo.cover
    : `import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../usercontext";
import Post from "../post";


export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (!id) return;
    fetch(`http://mindwolf.up.railway.app/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          console.error("Fetch failed with status:", response.status);
          setNotFound(true);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("Fetched post:", data);
          setPostInfo(data);
          setNotFound(false);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setNotFound(true);
      });
  }, [id]);

  if (notFound) {
    return <div>Post not found.</div>;
  }

  if (!postInfo) {
    return <div>Loading...</div>;
  }

 const coverSrc = postInfo.cover?.startsWith("http")
    ? postInfo.cover
    : `https://mindwolf.up.railway.app/${postInfo.cover} `;



  // Debugging logs
  // console.log(" userInfo:", userInfo);
  // console.log(" postInfo.author:", postInfo.author);

  // const isAuthor =
  //   userInfo &&
  //   postInfo?.author &&
  //   (userInfo.id?.toString() === postInfo.author._id?.toString() ||
  //     userInfo._id?.toString() === postInfo.author._id?.toString());

  // Render your post details here
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <div className="author">by @{postInfo.author.username}</div>


      {/* for delete post */}
      {/* {userInfo &&
          postInfo?.author &&
          String(userInfo.id) === String(postInfo.author._id) && (
            <div className="delete-post">
              <a className="delete-btn">Delete this post</a>
            </div>
          )} */}
      <p className="time">
        {format(new Date(postInfo.createdAt), "MMM dd, yyyy HH:mm")}
      </p>

      <p>{postInfo.summary}</p>
      <div className="img">
        <img src={coverSrc} alt="" />
      </div>

      {/* for content to convert into markdown */}
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />

        {/* for edit post */}
        {userInfo &&
          postInfo?.author &&
          String(userInfo.id) === String(postInfo.author._id) && (
            <div className="edit-post">
              <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Edit This Post
              </Link>
            </div>
          )}


      
    </div>
  );
}`;



  // Debugging logs
  // console.log(" userInfo:", userInfo);
  // console.log(" postInfo.author:", postInfo.author);

  // const isAuthor =
  //   userInfo &&
  //   postInfo?.author &&
  //   (userInfo.id?.toString() === postInfo.author._id?.toString() ||
  //     userInfo._id?.toString() === postInfo.author._id?.toString());

  // Render your post details here
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <div className="author">by @{postInfo.author.username}</div>


      {/* for delete post */}
      {/* {userInfo &&
          postInfo?.author &&
          String(userInfo.id) === String(postInfo.author._id) && (
            <div className="delete-post">
              <a className="delete-btn">Delete this post</a>
            </div>
          )} */}
      <p className="time">
        {format(new Date(postInfo.createdAt), "MMM dd, yyyy HH:mm")}
      </p>

      <p>{postInfo.summary}</p>
      <div className="img">
        <img src={coverSrc} alt="" />
      </div>

      {/* for content to convert into markdown */}
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />

        {/* for edit post */}
        {userInfo &&
          postInfo?.author &&
          String(userInfo.id) === String(postInfo.author._id) && (
            <div className="edit-post">
              <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Edit This Post
              </Link>
            </div>
          )}


      
    </div>
  );
}`;



  // Debugging logs
  // console.log(" userInfo:", userInfo);
  // console.log(" postInfo.author:", postInfo.author);

  // const isAuthor =
  //   userInfo &&
  //   postInfo?.author &&
  //   (userInfo.id?.toString() === postInfo.author._id?.toString() ||
  //     userInfo._id?.toString() === postInfo.author._id?.toString());

  // Render your post details here
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <div className="author">by @{postInfo.author.username}</div>


      {/* for delete post */}
      {/* {userInfo &&
          postInfo?.author &&
          String(userInfo.id) === String(postInfo.author._id) && (
            <div className="delete-post">
              <a className="delete-btn">Delete this post</a>
            </div>
          )} */}
      <p className="time">
        {format(new Date(postInfo.createdAt), "MMM dd, yyyy HH:mm")}
      </p>

      <p>{postInfo.summary}</p>
      <div className="img">
        <img src={coverSrc} alt="" />
      </div>

      {/* for content to convert into markdown */}
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />

        {/* for edit post */}
        {userInfo &&
          postInfo?.author &&
          String(userInfo.id) === String(postInfo.author._id) && (
            <div className="edit-post">
              <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Edit This Post
              </Link>
            </div>
          )}


      
    </div>
  );
}
