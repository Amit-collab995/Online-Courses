import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegPlayCircle } from "react-icons/fa";

const ViewLeactures = () => {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const selectedCourse = courseData?.find((course) => course._id === courseId);
  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const handleCreator = async () => {
      if (selectedCourse?.creator) {
        try {
          const result = await axios.post(
            serverUrl + "/api/course/creator",
            { userId: selectedCourse?.creator },
            { withCredentials: true }
          );
          console.log(result.data);
          setCreatorData(result.data);
        } catch (error) {
          console.error("Creator fetch error:", error);
        }
      }
    };

    handleCreator(); //  function call hoga
  }, [selectedCourse]); //  jab selectedCourse

  return (
    <div className="min-h-screen  bg-gray-50 p-6  flex flex-col md:flex-row gap-6">
      {/* left or top */}
      <div className="w-full md:w-2/3 p-6 bg-white rounded-2xl shadow-md border border-gray-200 ">
        <div className="mb-6">
          <h2 className="text-2xl  font-bold flex items-center justify-start gap-[20px] text-gray-800 ">
            <FaArrowLeftLong
              className="text-black w-[22px] h-[22px] cursor-pointer "
              onClick={() => navigate("/")}
            />
            {selectedCourse?.title}
          </h2>

          <div className="mt-2 flex gap-4 text-sm text-gray-500 font-medium">
            <span>Category : {selectedCourse?.category}</span>
            <span>Level : {selectedCourse.level}</span>
          </div>
        </div>

        {/* video player    */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-gray-300 ">
          {selectedLecture?.videoUrl ? (
            <video
              className="w-full h-full object-cover"
              controls
              src={selectedLecture?.videoUrl}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Select a lecture to start watching
            </div>
          )}
        </div>

        <div className="mt-2 ">
          <h2 className="">{selectedLecture?.lectureTitle}</h2>
        </div>
      </div>

      {/* right or botton */}

      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800 ">All Lectures</h2>
        <div className="flex flex-col gap-3 mb-6 ">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse?.lectures?.map((lecture, index) => (
              <button
                className={`flex items-center justify-between  px-4 py-3 rounded-lg border transition-all duration-200 text-left ${
                  lecture.isPreviewFree
                    ? "hover:bg-gray-100 cursor-pointer border-gray-300"
                    : "cursor-not-allowed opacity-60 border-gray-200 "
                } ${
                  selectedLecture?.lectureTitle === lecture?.lectureTitle
                    ? "bg-gray-200 border-gray-500"
                    : "bg-gray-50 border-gray-300"
                }  `}
                onClick={() => setSelectedLecture(lecture)}
                key={index}
              >
                <h2 className="text-lg">{lecture.lectureTitle}</h2>
                <FaRegPlayCircle  className="text-xl" />
              </button>
            ))
          ) : (
            <p className="text-gray-500 ">No lectures available.</p>
          )}
        </div>
        {/* educator info */}
        {creatorData && (
          <div className="mt-4 border-t pt-4">
            <h1 className="text-md font-semibold text-shadow-gray-700 mb-3">
              Eductor
            </h1>

            
              <div className="flex items-center gap-4 ">
                <img
                  src={creatorData?.photoUrl}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />

                 <div>
                <h2 className="text-base font-medium text-gray-800 ">
                  {creatorData?.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {creatorData?.description}
                </p>
                <p className="text-sm text-gray-600">{creatorData?.email}</p>
              </div>

              </div>

              
           
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewLeactures;
