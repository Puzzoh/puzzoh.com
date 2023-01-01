import React from 'react';
import { AuthContext } from "context/authContext";
import { useQuery } from "react-query";
import Axios from 'axios';
import FileRow from 'components/business-portal/FileRow';
import NewFile from 'components/business-portal/NewFile';
import { FileTypes } from 'utils/types';

const AddFileModal = () => {
  return (
    <div>
      <label htmlFor="my-modal-4">
        <div>
          Add a new file
        </div>
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
      <label className="modal-box relative">
        <NewFile />
      </label>
      </label>
    </div>
    )
};

const Files = () => {
  const { data, status } = useQuery(['files'], async () => {
    const res = await Axios.create({ baseURL: "/api", withCredentials: true }).get("/files")
    return res.data;
  })

  return (
    <div className="ml-4 mt-4 lg:ml-60">
      <div className='text-3xl leading-8 font-extrabold tracking-wide sm:text-4xl mb-4'>
        Files
      </div>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>File</th>
              <th>Description</th>
              <th>Created on</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {data?.map((f : FileTypes) => (
                <FileRow key={f.id} id={f.id} title={f.title} description={f.description}
                  file={f.file} createDate={f.createDate} />
              ))}

              <tr>
                <th></th>
                <th>
                <AddFileModal />
                </th>
              </tr>

          </tbody>
          <tfoot>
            <tr>
              <th>ID</th>
              <th>File</th>
              <th>Description</th>
              <th>Created on</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      )}
    </div>
  )
}

export default Files;
