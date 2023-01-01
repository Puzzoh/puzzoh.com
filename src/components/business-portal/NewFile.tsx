import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { AuthContext } from "context/authContext";
import { useMutation, useQueryClient } from "react-query";
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FileTypes } from 'utils/types';
import DocViewer, { PDFRenderer, DocViewerRenderers } from "react-doc-viewer";

const NewFile = () => {
  const { currentVendor } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation((newFile: FileTypes) => {
    return Axios.create({ baseURL: "/api", withCredentials: true }).post("/file", newFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["files"])
    }
  });

  const [fileInputs, setFileInputs] = useState({
    title: "",
    description: "",
    file: null
  });

  const [preview, setPreview] = useState<any>()

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFileInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleFileChange = (e: React.ChangeEvent<any>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFileInputs((prev) => ({ ...prev, [e.target.name]: undefined }));
      return
    }

    setFileInputs((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const createNewFile = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    await setFileInputs(fileInputs);
    mutation.mutate(fileInputs)
  };

  useEffect(() => {
    if (!fileInputs.file) {
      setPreview(undefined)
      return
    }

   const objectUrl = URL.createObjectURL(fileInputs.file)
   setPreview(objectUrl)

   console.log(objectUrl)

   return () => URL.revokeObjectURL(objectUrl)
}, [fileInputs.file])

  return (
      <form className="flex flex-col space-y-6 border-black border-solid border-1"
      onSubmit={createNewFile}>
            <div>
              <h2>
                File Title*
              </h2>
              <input
                id="title"
                name="title"
                required
                maxLength={128}
                type="text"
                placeholder="New Voucher #1"
                className="bg-white outline-none border border-black rounded-3xl px-6 py-2 w-full"
                onChange={handleChange}
            />
            </div>

            <div>
              <h2>
                Description
              </h2>
              <textarea
                id="description"
                name="description"
                placeholder="Voucher Description (optional)"
                className="bg-white outline-none border border-black rounded-3xl px-6 py-4 min-h-[5em] w-full"
                onChange={handleChange}
              />
            </div>


            <div>
              <h2>
                Upload file*
              </h2>
              <input type="file" accept="application/pdf, application/msword, text/plain" required
              className="file-input file-input-bordered w-full max-w-xl"
              name="file" onChange={handleFileChange} />
              <p className='text-sm'> (Please upload the file in PDF, doc or txt format) </p>
            </div>

            { fileInputs.file && <img src={preview} /> }

            <div className="inline-block self-end font-bold mt-10">
              <button
              type="submit"
              className="btn btn-md bg-black text-white hover:bg-white hover:text-black rounded-3xl px-8 uppecase text-sm"
              >
              Create a new file
              </button>
            </div>

          </form>
      )
};

export default NewFile;
