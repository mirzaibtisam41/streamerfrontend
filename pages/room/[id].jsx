import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import BottomActionNav from "../../components/BottomActionNav";
import ChatBox from "../../components/ChatBox";
import InfoSideBar from "../../components/InfoSideBar";
import Modal from "../../components/Modal";
import VideoPlayer from "../../components/videoPlayer";
import {
  anwerToUserCall,
  callToNewUser,
  getMyVideoStream,
} from "../../functions";

const id = () => {
  const socket = io("https://streamervideochat.herokuapp.com/");
  const User = useSelector((state) => state.user);
  const router = useRouter();
  const myVideoRef = useRef();
  const myStreamRef = useRef();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState();
  const [openInfo, setOpenInfo] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [remoteName, setRemotename] = useState("");

  useEffect(() => {
    if (User.user === null) {
      return setOpenModal(true);
    }
    if (router.query.id) {
      import("peerjs").then(({ default: Peer }) => {
        const peer = new Peer();
        setMe(peer);
        getMyVideoStream(myStreamRef, myVideoRef);
        peer.on("open", (id) => {
          socket.emit("user-join", {
            roomID: router.query.id,
            peerID: id,
            name: User.user.name,
          });
        });
        socket.on("new-user", ({ peerID, name }) => {
          toast.success(`${name} just joined the room`);
          setRemotename(name);
          callToNewUser(peer, peerID, myStreamRef, setUsers, name);
        });
        socket.on("new-message", ({ message, sender, token }) => {
          setMessages((messages) => [
            ...messages,
            { message, sender, date: new Date(), token },
          ]);
          setTimeout(() => {
            var objDiv = document.getElementById("chat");
            objDiv.scrollTop = objDiv.scrollHeight;
          }, 200);
        });
        socket.on("user-left", (peerID) => {
          toast.success(`${User.user.name} has left the room`);
          const filter = users?.filter((item) => item.peerID !== peerID);
          setUsers(filter);
        });
        anwerToUserCall(peer, myStreamRef, setUsers, remoteName);
      });
    }
  }, [router]);

  const sendMessage = () => {
    if (text.length > 0) {
      socket.emit("create-message", {
        roomID: router.query.id,
        message: text,
        sender: User.user.name,
        token: User.user.token,
      });
    }
  };

  const leaveMeeting = () => {
    socket.emit("left-uesr", { roomID: router.query.id, peerID: me._id });
    window.open(window?.location?.origin, "_parent");
  };

  return (
    <div className="main w-full bg-black h-100 cursor-pointer">
      <Toaster position="bottom-center" reverseOrder={false} />
      {openModal ? (
        <Modal toast={toast} router={router} />
      ) : (
        <div>
          <section
            className="flex flex-wrap p-5 relative"
            style={{ height: "calc(100vh - 95px)" }}
          >
            <section className="h-full flex flex-wrap flex-grow">
              <div className="relative" style={{ height: "fit-content" }}>
                <video ref={myVideoRef} />
                <span className="absolute text-white bottom-2 left-3">
                  {/* {User?.user} */}You
                </span>
              </div>

              {users?.map((item, index) => {
                return (
                  <VideoPlayer
                    key={index}
                    stream={item.remoteStream}
                    name={item.name}
                  />
                );
              })}
            </section>

            {openInfo && (
              <InfoSideBar
                router={router}
                setOpenInfo={setOpenInfo}
                toast={toast}
                openInfo={openInfo}
              />
            )}

            {openChat && (
              <ChatBox
                router={router}
                toast={toast}
                setOpenChat={setOpenChat}
                openChat={openChat}
                setText={setText}
                sendMessage={sendMessage}
                messages={messages}
              />
            )}
          </section>

          <BottomActionNav
            router={router}
            leaveMeeting={leaveMeeting}
            myStreamRef={myStreamRef}
            me={me}
            myVideoRef={myVideoRef}
            setOpenInfo={setOpenInfo}
            openInfo={openInfo}
            users={users}
            setOpenChat={setOpenChat}
            openChat={openChat}
            sendMessage={sendMessage}
          />
        </div>
      )}
    </div>
  );
};

export default id;
