import React from "react";
import { FileTypes } from "utils/types";
import { useMutation, useQueryClient } from "react-query";
import moment from "moment";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import api from "libs/api";

const FileRow = ({ id, title, description, file, createDate }: FileTypes) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (someId: number | undefined) => {
      return api.delete(`/file/${someId}`, {
        data: {
          filename: file,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["files"]);
      },
    }
  );

  const deleteFile = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    mutation.mutate(id);
  };

  const reformatCreateDate = moment(createDate).format("YYYY-MM-DD");

  return (
    <tr>
      <th>{id}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png"
                alt="file type"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-sm opacity-50">{file}</div>
          </div>
        </div>
      </td>
      <td>
        {description}
        <br />
        <span className="badge badge-ghost badge-sm">Some tags</span>
      </td>
      <td>{reformatCreateDate}</td>
      <th>
        <Popup
          trigger={<button className="btn btn-ghost btn-xs">DELETE</button>}
        >
          <p> Are you sure you want to delete {title}? </p>
          <button className="btn btn-ghost btn-xs">Cancel</button>
          <button className="btn btn-warning btn-xs" onClick={deleteFile}>
            Confirm
          </button>
        </Popup>
      </th>
    </tr>
  );
};

export default FileRow;
