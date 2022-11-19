export const getMyVideoStream = (myStreamRef, myVideoRef) => {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
            myStreamRef.current = stream;
            myVideoRef.current.srcObject = stream;
            myVideoRef.current.play();
        });
};

export const callToNewUser = (peer, peerID, myStreamRef, setUsers, name) => {
    var call = peer.call(peerID, myStreamRef.current);
    call.on("stream", function (remoteStream) {
        setUsers(users => [...users, { peerID, remoteStream, name }]);
    });
};

export const anwerToUserCall = (peer, myStreamRef, setUsers, remoteName) => {
    peer.on("call", (call) => {
        call.answer(myStreamRef.current);
        call.on("stream", function (remoteStream) {
            setUsers(users => [...users, { peerID: call.peer, remoteStream, name }]);
        });
    });
};

export const handleVideoTrack = (myStreamRef) => {
    let track = myStreamRef.current.getVideoTracks()[0];
    if (track.enabled) {
        myStreamRef.current.getVideoTracks()[0].enabled = false;
    } else {
        myStreamRef.current.getVideoTracks()[0].enabled = true;
    }
}

export const handleAudioTrack = (myStreamRef) => {
    let track = myStreamRef.current.getAudioTracks()[0];
    if (track.enabled) {
        myStreamRef.current.getAudioTracks()[0].enabled = false;
    } else {
        myStreamRef.current.getAudioTracks()[0].enabled = true;
    }
}

export const handleScreenSharing = (me, myStreamRef, myVideoRef, screenShare, setScreenShare) => {
    if (screenShare) {
        setScreenShare(false);
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(stream => {
                switchScreen(me, myStreamRef, myVideoRef, stream)
            });
    } else {
        setScreenShare(true);
        navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then((stream) => {
            switchScreen(me, myStreamRef, myVideoRef, stream)
        });
    }
}

const switchScreen = (me, myStreamRef, myVideoRef, stream) => {
    myStreamRef.current = stream;
    myVideoRef.current.srcObject = stream;
    myVideoRef.current.play();
    const videoTrack = stream?.getTracks().find((track) => track.kind === "video");
    Object.values(me?.connections).forEach((connection) => {
        connection[0].peerConnection
            .getSenders()
            .find((sender) => sender.track.kind === "video")
            .replaceTrack(videoTrack)
            .catch((err) => console.error(err));
    });
}