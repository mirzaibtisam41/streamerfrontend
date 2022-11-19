import { useEffect, useRef } from "react";

const VideoPlayer = ({ stream, name }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <div className="relative" style={{ height: "fit-content" }}>
      <video ref={videoRef} autoPlay />
      {/* <span className="absolute text-white bottom-2 left-3">{name}</span> */}
    </div>
  );
};

export default VideoPlayer;
