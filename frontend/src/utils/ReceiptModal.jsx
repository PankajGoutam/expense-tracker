// src/components/ReceiptModal.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../redux/Slices/uiSlice";
import { BASE_URL } from "../api/axios";

const ReceiptModal = ({ selectedImage }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.ui.isModalOpen);

  const rawPath = selectedImage;

  let imageURL = null;

  if (rawPath) {
    // 🔁 Fix the path for browser
    const fixedPath = rawPath
      .replace("src\\uploads\\", "uploads/")
      .replace("src/uploads/", "uploads/") // handle forward slashes too
      .replace(/\\/g, "/"); // convert all \ to /

    imageURL = BASE_URL + encodeURI(fixedPath);
  }

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-4 rounded-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Receipt Image</h3>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-gray-500 hover:text-black cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="border rounded overflow-hidden">
          {imageURL ? (
            <img
              src={imageURL}
              alt="Receipt"
              className="w-full max-h-[400px] object-contain"
            />
          ) : (
            <p className="text-center text-sm text-gray-500 p-4">No image available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
