// new file
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor.jsx";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [cover, setCover] = useState(""); // for preview (old or new)
  const [redirect, setRedirect] = useState(false);

  
  useEffect(() => {
  fetch("mindwolf.up.railway.app" + id)
    .then((response) => response.json())
    .then((postInfo) => {
      setTitle(postInfo.title);
      setSummary(postInfo.summary);
      setContent(postInfo.content);
      setCover("http://localhost:5000/" + postInfo.cover); 
    });
}, [id]);   // ✅ correct place


  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    // data.set("cover", cover); // send existing cover
    // data.set("id", id); // include post ID for update
    if (files?.[0]) {
      data.set("file", files[0]); // only send if new file chosen
    }

    const response = await fetch("http://localhost:5000/post/" + id, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <div className="edit-form">
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFiles(e.target.files);
          if (e.target.files && e.target.files[0]) {
            setCover(URL.createObjectURL(e.target.files[0])); // preview new file
          }
        }}
      />

      {/* Show existing or new cover */}
      {cover && (
        <div style={{ marginTop: "10px" }}>
          <p>Current cover:</p>
          <img
            src={cover}
            alt="cover"
            style={{
              maxWidth: "300px",
              borderRadius: "0 8px 8px 8px",
              margin: "10px 10px 10px",
            }}
          />
        </div>
      )}

      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Update post</button>
</div>

    </form>
  );
}
