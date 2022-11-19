import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import moment from "moment";
import { useSelector } from "react-redux";

const ChatBox = ({ setOpenChat, openChat, setText, sendMessage, messages }) => {
  const User = useSelector((state) => state.user.user);

  return (
    <section
      className="h-full bg-white right-0 p-5 mr-5 absolute"
      style={{ width: "300px", borderRadius: "7px" }}
    >
      <div className="h-full relative">
        <div className="flex justify-between items-center text-lg font-medium">
          <span>Room Messages</span>
          <button
            type="button"
            className="absolute right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
            onClick={() => setOpenChat(!openChat)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <section className="my-5 main-chat" id="chat">
          {messages?.map((item, index) => {
            return (
              <div key={index} className="mb-3">
                <span
                  className="font-semibold"
                  style={{ color: "rgb(147 143 143)" }}
                >
                  {User?.token === item?.token ? "You" : item?.sender}
                </span>
                <span
                  className="text-sm ml-5"
                  style={{ color: "rgb(147 143 143)" }}
                >
                  {moment(item?.date).format("LT")}
                </span>
                <br />
                <span className="text-sm">{item.message}</span>
              </div>
            );
          })}
        </section>

        <div className="flex absolute bottom-0 w-full">
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white message-input "
              placeholder="Message..."
              required
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              onClick={sendMessage}
              className="absolute h-full top-0 right-0 p-2.5 text-sm font-medium text-white bg-purple-700 rounded-r-lg border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatBox;
