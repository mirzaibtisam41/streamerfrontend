import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FaCommentAlt,
  FaInfoCircle,
  FaMicrophone,
  FaMicrophoneSlash,
  FaPhone,
  FaShareSquare,
  FaUsers,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import {
  handleAudioTrack,
  handleScreenSharing,
  handleVideoTrack,
} from "../functions";

const BottomActionNav = ({
  router,
  leaveMeeting,
  myStreamRef,
  me,
  myVideoRef,
  setOpenInfo,
  openInfo,
  users,
  openChat,
  setOpenChat,
}) => {
  const [date, setDate] = useState();
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [screenShare, setScreenShare] = useState(false);

  const getTime = () => {
    const date = new Date();
    setDate(moment(date).format("LT"));
  };

  useEffect(() => {
    getTime();
    setTimeout(() => {
      getTime();
    }, 30000);
  }, []);

  return (
    <div className="flex">
      <div className="bottom-actions absolute w-full bottom-0 flex justify-between items-center px-10">
        <section className="flex justify-between items-center">
          <span className="text-white font-semibold border-r-2 pr-3">
            {date}
          </span>
          <span className="text-white font-semibold pl-3">
            {router?.query?.id?.substring(0, 12)}...
          </span>
        </section>

        <section className="flex justify-between items-center">
          <div
            title={audio ? "Turn off audio" : "Turn on audio"}
            onClick={() => {
              setAudio(!audio);
              handleAudioTrack(myStreamRef);
            }}
            className="icon-parent flex justify-center items-center cursor-pointer"
          >
            {audio ? (
              <>
                <FaMicrophone color="white" style={{ fontSize: "20px" }} />
              </>
            ) : (
              <>
                <FaMicrophoneSlash color="white" style={{ fontSize: "20px" }} />
              </>
            )}
          </div>
          <div
            title={video ? "Turn off video" : "Turn on video"}
            onClick={() => {
              setVideo(!video);
              handleVideoTrack(myStreamRef);
            }}
            className="icon-parent flex justify-center items-center cursor-pointer"
          >
            {video ? (
              <>
                <FaVideo color="white" style={{ fontSize: "20px" }} />
              </>
            ) : (
              <>
                <FaVideoSlash color="white" style={{ fontSize: "20px" }} />
              </>
            )}
          </div>
          <div
            title={screenShare ? "Stop sharing" : "Start sharing"}
            onClick={() =>
              handleScreenSharing(
                me,
                myStreamRef,
                myVideoRef,
                screenShare,
                setScreenShare
              )
            }
            className="icon-parent flex justify-center items-center cursor-pointer"
          >
            <FaShareSquare color="white" style={{ fontSize: "20px" }} />
          </div>
          <div
            onClick={leaveMeeting}
            title="Leave meeting"
            className="icon-parent flex justify-center items-center cursor-pointer"
            style={{ backgroundColor: "#ea4335" }}
          >
            <FaPhone color="white" style={{ fontSize: "20px" }} />
          </div>
        </section>

        <section className="flex justify-between items-center">
          <div
            title="Room info"
            onClick={() => {
              setOpenInfo(!openInfo);
              setOpenChat(false);
            }}
            className="icon-parent flex justify-center items-center cursor-pointer"
          >
            <FaInfoCircle color="white" style={{ fontSize: "20px" }} />
          </div>
          <div
            title="Room users"
            className="icon-parent flex justify-center items-center cursor-pointer"
          >
            <FaUsers color="white" style={{ fontSize: "20px" }} />
            <span className="users-length">{users?.length + 1}</span>
          </div>
          <div
            title="Room chat"
            onClick={() => {
              setOpenChat(!openChat);
              setOpenInfo(false);
            }}
            className="icon-parent flex justify-center items-center cursor-pointer"
          >
            <FaCommentAlt color="white" style={{ fontSize: "20px" }} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BottomActionNav;
