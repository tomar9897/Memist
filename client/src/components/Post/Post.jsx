import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { addCommentToPost, likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import { Modal } from "@mantine/core";
import { Button } from "@mui/material";
// import Modal from "react-bootstrap/Modal";
import { ShareSocial } from "react-share-social";
import { useDisclosure } from "@mantine/hooks";
const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [showcomment, setcomment] = useState(false);
  const [comment, setComment] = useState("");
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  const handlecomment = () => {
    setcomment(!showcomment);
  };

  const redirect = (id) => {
    window.location.href(`/userProfile/${id}`);
  };
  const [opened, { open, close }] = useDisclosure(false);

  console.log(data);
  const sendComment = async () => {
    try {
      const values = {
        userId: user._id,
        comment: comment,
        postId: data._id,
      };
      const res = await addCommentToPost(values);
      setComment("");
      console.log(res.data);
      // alert(res.data);
      // setuserFollwing(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="Post">
        <a
          href={`/userProfile/${user._id}`}
          style={{
            // height: "50%",
            width: "10%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            style={{ borderRadius: "50%" }}
            // onClick={() => redirect(user._id)}
            // src={
            //   data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""
            // }

            src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
            alt=""
          />
          <span>&nbsp;Samra</span>
        </a>

        {console.log(data.image)}
        {data.image !== undefined && (
          <div className="detail" style={{ height: "300px" }}>
            <span>
              <img
                class="image image-contain"
                src={process.env.REACT_APP_PUBLIC_FOLDER + data.image}
              />
            </span>
          </div>
        )}

        <div>
          <div className="postReact">
            <img
              src={liked ? Heart : NotLike}
              alt=""
              style={{ cursor: "pointer" }}
              onClick={handleLike}
            />

            <img src={Comment} alt="" onClick={handlecomment} />
            <img src={Share} alt="" onClick={open} />
          </div>

          <span style={{ color: "var(--gray)", fontSize: "12px" }}>
            {" "}
            <a href="/like">{likes} likes</a>
          </span>

          {/* <span>
            <img
              style={{ height: "100%", width: "100%" }}
              src={
                "https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg"
              }
            />
         
          </span> */}
          <span>{data.desc}</span>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Share " centered>
        <ShareSocial
          url="https://www.npmjs.com/package/react-share-social"
          socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
        />
        {/* <Button onClick={close}>Close</Button> */}
      </Modal>
      <Modal
        opened={showcomment}
        onClose={handlecomment}
        title="Comments "
        centered
      >
        <>
          {data?.comments?.map((item) => (
            <div
              style={{
                border: "1px solid",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <p>{item.text}</p>
              <p>{item.createdAt.split("T")[0]}</p>
            </div>
          ))}
          <div className="flex-1">
            <input
              className="w-full mb-3 p-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:border-orange-500"
              type="text"
              placeholder="Comments"
              onChange={(event) => setComment(event.target.value)}
            />
            <button
              className="button ps-button"
              onClick={sendComment}
              // disabled={loading}
            >
              {"Comment"}
            </button>
          </div>
        </>
      </Modal>
    </>
  );
};

export default Post;
