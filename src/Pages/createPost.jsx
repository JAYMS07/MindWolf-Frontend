// this is not React-quill editor
// i can use its alternative SimpleMDE because its a simple to install
//simple MDE
//SimpleMDE = Simple Markdown Editor
// It’s a WYSIWYG Markdown editor built on EasyMDE.
// You write in Markdown → it can render into HTML later.
// It’s compatible with React 19 (unlike Quill).
import { useState, useRef } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

//this is ckeditor
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CreatePost() {
  //this is ckeditor
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const fileRef = useRef(null);

  const [cover, setCover] = useState(""); // for preview (old or new)

  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    // data.set("cover", cover); // send current cover path
    if (files?.[0]) {
      data.set("file", files[0]); // 👈 must match `uploadMiddleware.single("file")`
    }

    try {
      const response = await fetch("http://localhost:5000/post", {
        method: "POST",
        body: data,
        credentials: "include", // 👈 send cookies if logged in
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Post created:", result);
      navigate("/"); // redirect to home after success
    } catch (err) {
      console.error("❌ Error creating post:", err);
      alert("Failed to create post");
    }
  }

  //
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  return (
    <form onSubmit={createNewPost} className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      {/* Summary */}
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      {/* File Upload */}
      <input
        type="file"
        ref={fileRef}
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          setFiles(e.target.files); // keep original files for upload
          if (file) {
            setCover(URL.createObjectURL(file)); // 👈 set preview
          }
        }}
        className="w-full"
      />

      {/* //show cover image preview */}
      {cover && (
        <div style={{ marginTop: "10px" }}>
          <p>Current cover:</p>
          <img
            src={cover}
            alt="Preview"
            style={{
              maxWidth: "300px",
              borderRadius: "0 8px 8px 8px",
              margin: "10px 10px 10px",
            }}
          />
        </div>
      )}

      {/* Rich Text Editor */}
      {/* <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Write your blog content here..."
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "code-block", "link", "image"],
            ["clean"],
          ],
        }}
        formats={formats}
      /> */}

      {/* CKEditor */}
      <div>
        <CKEditor
          editor={ClassicEditor}
          data={content} // ✅ Pass current state
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data); // ✅ Update state whenever user types
          }}
        />
      </div>
      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Post
      </button>
    </form>
  );
}
