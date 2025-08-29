import { compareAsc, format, formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
   

<div>

    <div className="post">
      <div className="img">
        {/* <img src="icons/codeeditor.jpg" /> */}
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:5000/" + cover} alt="" />
        </Link>
      </div>

      {/*  */}
      <div className="hover">
        <div className="text">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <a className="author">{author?.username || "Unknown"}</a>

            <time>{format(new Date(createdAt), "MMM dd, yyyy HH:mm")}</time>
            {/* <time>{formatISO9075(new Date(createdAt))}</time> */}
          </p>
          <p className="summary">{summary}</p>
        </div>
        </div>
        
        
      </div>
      

       </div>
      
  );
}
