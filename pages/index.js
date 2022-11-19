import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Navbar from "../components/Navbar";
import { addUserData } from '../redux/reducers/userSlice';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [error, setError] = useState(false);

  const createMeeting = () => {
    if (!name) return setError(true);
    else if (name) {
      dispatch(addUserData({ name, token: uuidv4() }))
      setError(false);
      return router.push(`/room/${uuidv4()}`)
    }
  }

  return (
    <React.Fragment>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 pt-24">
          <div className="lg:w-2/5 mx-auto md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5 uppercase">start your meeting now</h2>
            <div className="relative mb-4">
              <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Your Name</label>
              <input onChange={(e) => setName(e.target.value)} placeholder="Enter Name" type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              <span className="text-sm text-red-500">{error && 'Name is required'}</span>
            </div>
            <button onClick={createMeeting} className="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg" >Create Meeting</button>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}