import React from "react";

const InfoSideBar = ({ router, setOpenInfo, toast, openInfo }) => {
  console.log(window.href);

  return (
    <section
      className="h-full bg-white right-0 p-5 mr-5 absolute"
      style={{ width: "300px", borderRadius: "7px" }}
    >
      <div className="flex justify-between items-center text-lg font-medium">
        <span>Meeting Details</span>
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="authentication-modal"
          onClick={() => setOpenInfo(!openInfo)}
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

      <div className="mt-10 text-base font-semibold">
        <span>Joining Info</span>
      </div>
      <div
        className="mt-2 text-sm font-medium"
        style={{ fontFamily: "monospace" }}
      >
        <span>{`${window?.location?.origin}/room/${router.query.id}`}</span>
      </div>
      <button
        onClick={() =>
          navigator.clipboard
            .writeText(`${window?.location?.origin}/room/${router.query.id}`)
            .then((data) => {
              toast.success("Copied joining info");
            })
        }
        className="bg-transparent mt-5 hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
      >
        Copy Joining info
      </button>
    </section>
  );
};

export default InfoSideBar;
