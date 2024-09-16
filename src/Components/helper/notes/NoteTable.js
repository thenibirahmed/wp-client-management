import React, { useState, useEffect } from "react";

import truncateText from "../../../utils/truncateText";
import useCheckedHandler from "../../../utils/useCheckedItem";
import Pagination from "../../Clients/Pagination";
import { Delete03Icon, ViewIcon } from "../../../utils/icons";
import useHashRouting from "../../../utils/useHashRouting";
import { useStoreContext } from "../../../store/ContextApiStore";
import { DeleteModal } from "../../DeleteModal";

const NoteTable = ({
  noteData,
  projectId,
  pagination,
  selectedNote,
  setSelectedNote,
  isAllselected,
  setIsAllSelected,
  slug,
  refetch,
}) => {
  const { updateNote, setUpdateNote, deleteNote, setDeleteNote } =
    useStoreContext();

  const [noteId, setNoteId] = useState();

  const { checkedSingleClient, checkedAllClient } = useCheckedHandler(
    selectedNote,
    setIsAllSelected,
    setSelectedNote
  );

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1  ring-black ring-opacity-5 sm:rounded-lg">
            <table className="xl:min-w-full min-w-[900px] divide-y divide-borderColor ">
              <thead className="bg-gray-50  ">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5  w-10  pl-4 pr-0 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    <input
                      checked={
                        selectedNote?.length > 0 && isAllselected ? true : false
                      }
                      onChange={(e) =>
                        checkedAllClient(e.target.checked, noteData)
                      }
                      type="checkbox"
                    />
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 uppercase   pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    Creator
                  </th>
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    Note
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {noteData?.map((item) => {
                  const isChecked = selectedNote.some(
                    (client) => client.id === item.id
                  );

                  return (
                    <tr>
                      <td className="whitespace-nowrap pl-4 sm:pl-6  py-4 text-sm text-textColor font-metropolis font-normal">
                        <input
                          checked={isChecked}
                          onChange={(e) =>
                            checkedSingleClient(e.target.checked, item)
                          }
                          type="checkbox"
                          className="border border-borderColor"
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-6 ">
                        <div className="flex items-center  gap-3">
                          <img
                            className="h-7 w-7 rounded-full bg-gray-50"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt={item.creator}
                          />
                          <div>
                            <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                              {item.creator}
                            </h3>
                          </div>
                        </div>
                      </td>{" "}
                      <td className="whitespace-nowrap px-3 py-4  text-textColor2 font-metropolis font-normal text-sm">
                        {truncateText(item.note)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor2 font-metropolis font-normal">
                        {item.time}
                      </td>
                      <td className="whitespace-nowrap   px-3 py-4 ">
                        <div className="flex gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setUpdateNote(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <ViewIcon
                              className="text-textColor2"
                              width="20px"
                              height="20px"
                            />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setNoteId(item?.id);
                              setDeleteNote(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Delete03Icon
                              className="text-customRed"
                              width="20px"
                              height="20px"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              pagination={pagination}
              slug={slug}
              query="/?note"
              projectId={projectId}
            />
          </div>
        </div>
      </div>
      <DeleteModal
        open={deleteNote}
        setOpen={setDeleteNote}
        id={noteId}
        refetch={refetch}
        path="note"
        title="Delete Note"
      />
    </div>
  );
};

export default NoteTable;
