import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import NavBar from "../../Components/NavBar/NavBar";

import VideoUploader from "./VideoUploader";

import "./WriteBoard.css";
import { writeMemoryApi } from "../../api/WriteBoardApi";

function WriteBoard() {
  const [content, setContent] = useState("");
  const { groupSeq } = useParams();
  const navigate = useNavigate();

  const [videoFile, setVideoFile] = useState({
    fileObject: "",
    preview_URL: `${process.env.PUBLIC_URL}/assets/default-img/default-image.jpg`,
    type: "image",
  });

  let inputRef;

  const [returnImg, setReturnImg] = useState("");
  const [imgBase64, setImgBase64] = useState([]); // 미리보기를 구현할 state
  const [imgFile, setImgFile] = useState("");
  const [defaultImg, setDefaultImg] = useState(
    `${process.env.PUBLIC_URL}/assets/default-img/default-image.jpg`
  );

  // const addArticle = () => {
  //   let form = new FormData();
  //   const imgs = document.getElementById("img").files;
  //   // const imgs = imgFile;
  //   const videoFile = document.getElementById("video").files[0];
  //   form.append("content", content);
  //   form.append("image", imgs);
  //   form.append("video", videoFile);  
  //   form.append("groupSeq", groupSeq);
  //   axios
  //     .post("/boards", form, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then(navigate("/main"));
  // };

  const onHandleChangeFile = (event) => {
    console.log(event.target.files);
    setImgFile(event.target.files);

    // 미리보기 state
    setImgBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 파일을 읽어서 버퍼에 저장중

        // 파일 상태업데이트
        reader.onloadend = () => {
          const base64 = reader.result;
          console.log(base64);
          if (base64) {
            // 변환해서 미리보기 이미지에 넣어주는 부분
            var base64Sub = base64.toString();
            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  const onSaveWriting = () => {
    const formData = new FormData();
    const testData = "zzzzz";

    const imgs = document.getElementById("img").files;
    const videoFile = document.getElementById("video").files[0];

    console.log("imgs@@@@:", imgs);
    console.log("videoFile@@@:", videoFile);
    // form.append("content", content);
    // form.append("image", imgs);
    // form.append("video", videoFile);

    formData.append("groupSeq", 3);
    formData.append("content", testData);
    formData.append("image", imgs);
    formData.append("video", videoFile);

    writeMemoryApi(formData)
      .then((res) => {
        console.log(res.data);
        // navigate("/main")
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const saveVideoImage = (e) => {
    e.preventDefault();
    // 미리보기 url 만들기
    // 파일이 존재하면 file 읽기
    if (e.target.files[0]) {
      // 새로운 파일 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(videoFile.preview_URL);
      // 새로운 미리보기 URL 생성
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      const fileType = e.target.files[0].type.split("/")[0];
      // video일 때 시간 제한 15초
      if (fileType === "video") {
        let videoElement = document.createElement("video");
        videoElement.src = preview_URL;
        /*
          video 길이 제한!
          videoElement의 readyState가 4면 비디오가 로딩이 된 것이므로 길이를 판별할 수 있다
          video가 재생할 수 있는 상태로 만드는 과정이 비동기적으로 실행되기 때문에
          setInterval로 비디오가 로딩된 상태가 될 때까지 계속 확인하면서 기다려준다
        */
        const timer = setInterval(() => {
          if (videoElement.readyState == 4) {
            if (videoElement.duration > 16) {
              alert("동영상의 길이가 16초보다 길면 안됩니다");
              // src에 넣지 않을 것이므로 미리보기 URL 제거
              URL.revokeObjectURL(preview_URL);
            } else {
              setVideoFile({
                fileObject: e.target.files[0],
                preview_URL: preview_URL,
                type: fileType,
              });
            }
            clearInterval(timer);
          }
        }, 500);
      } else {
        // image일 땐 시간제한이 없으므로 그냥 상태에 넣어줌
        setVideoFile({
          fileObject: e.target.files[0],
          preview_URL: preview_URL,
          type: fileType,
        });
      }
    }
  };

  //  상태 초기화하기
  const deleteVideoImage = () => {
    // createObjectURL()을 통해 생성한 기존 URL을 폐기
    URL.revokeObjectURL(videoFile.preview_URL);
    setVideoFile({
      fileObject: "",
      preview_URL: `${process.env.PUBLIC_URL}/assets/default-img/default-image.jpg`,
      type: "image",
    });
  };

  return (
    <>
      <div className="write-board-page">
        <NavBar />
        {/* group-name 부분 */}
        <div className="group-name-wrapper">
          <div className="group-name">자율 프로젝트</div>
        </div>
        {/* 글, 사진, 영상 영역 */}
        <div className="group-content-wrapper">
          {/* 글 */}
          <BoardWrapper>
            <ContentHeader>
              <img
                className="content-header-icon"
                alt=""
                src={
                  process.env.PUBLIC_URL + "/assets/icon-img/write-pencil.png"
                }
              />
            </ContentHeader>

            <ContentWrapper>
              <textarea className="writing-content"></textarea>
            </ContentWrapper>
            <button onClick={onSaveWriting}>글쓰기 완료</button>
          </BoardWrapper>

          {/* 사진 */}
          <BoardWrapper>
            <ContentHeader>
              <img
                className="content-header-icon"
                alt=""
                src={
                  process.env.PUBLIC_URL + "/assets/icon-img/photo-camera.png"
                }
              />
            </ContentHeader>

            <ContentWrapper>
              {/* default 이미지 & 미리보기 이미지 */}
              <div className="photo-content">
                {/* <img className="photo-default-img" alt="" src={process.env.PUBLIC_URL + '/assets/default-img/default-image.jpg'} /> */}
                {imgFile === "" ? (
                  <PhotoWrapper>
                    <img
                      className="photo-preview-img"
                      alt="#"
                      src={defaultImg}
                    />
                  </PhotoWrapper>
                ) : (
                  <>
                    {imgBase64.map((item) => {
                      return (
                        <PhotoWrapper>
                          <img
                            className="photo-preview-img"
                            src={item}
                            alt="First Slide"
                          />
                        </PhotoWrapper>
                      );
                    })}
                  </>
                )}
              </div>
              <div>
                <input
                  multiple="multiple"
                  type="file"
                  id="img"
                  name="file"
                  accept="image/*"
                  onChange={onHandleChangeFile}
                  style={{ display: "none" }}
                />
                <label for="img">
                  <div className="find-file-btn">사진 올리기</div>
                </label>
              </div>
            </ContentWrapper>
          </BoardWrapper>

          {/* 영상 */}
          <BoardWrapper>
            <ContentHeader>
              <img
                className="content-header-icon"
                alt=""
                src={process.env.PUBLIC_URL + "/assets/icon-img/video-btn.png"}
              />
            </ContentHeader>

            <ContentWrapper>
              {/* <VideoUploader /> */}
              <div className="uploader-wrapper">
                <input
                  type="file"
                  accept="video/*, image/*"
                  id="video"
                  onChange={saveVideoImage}
                  // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
                  // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
                  onClick={(e) => (e.target.value = null)}
                  ref={(refParam) => (inputRef = refParam)}
                  style={{ display: "none" }}
                />
                <div className="file-wrapper">
                  {videoFile.type === "image" ? (
                    <img
                      alt=""
                      src={videoFile.preview_URL}
                      style={{
                        width: "300px",
                        height: "300px",
                        ObjectFit: "contain",
                      }}
                    />
                  ) : (
                    <video
                      controls={true}
                      autoPlay={true}
                      src={videoFile.preview_URL}
                    />
                  )}
                </div>
                <div className="upload-button">
                  <button variant="contained" onClick={() => inputRef.click()}>
                    영상업로드
                  </button>
                  <button
                    variant="contained"
                    color="error"
                    onClick={deleteVideoImage}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </ContentWrapper>
          </BoardWrapper>
        </div>
      </div>
      {/* <div>
        <textarea 
          value={content}
          onChange={(e) => { setContent(e.target.value) }} 
        />
        <br />
        <h1>사진</h1>
        <input type='file' id='img' multiple />
        <br />
        <h1>동영상</h1>
        <input type='file' id='video'/>
        <br />
        <button onClick={addArticle}>글 쓰기</button>
    </div> */}
    </>
  );
}

export default WriteBoard;

const BoardWrapper = styled.div`
  // background-color: green;

  width: 28vw;
  height: 70vh;

  margin-right: 2vw;
  margin-left: 2vw;
`;

const ContentHeader = styled.div`
  // background-color: aqua;

  width: 26vw;
  height: 8vh;

  margin-left: 0.6vw;
  margin-top: 1vh;
`;
const ContentWrapper = styled.div`
  // background-color: aqua;

  width: 26vw;
  height: 58vh;

  margin-left: 0.6vw;
  margin-top: 1vh;
`;

const PhotoWrapper = styled.div`
  // background-color: antiquewhite;

  width: 24vw;
  height: 45vh;

  margin-left: 1vw;
  margin-bottom: 3vh;
  /* margin-top: 4vh; */
`;
