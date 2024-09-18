import React, { useState } from "react";
import { Delete03Icon, PencilEdit02Icon } from "../../../utils/icons";
import useCheckedHandler from "../../../utils/useCheckedItem";
import Pagination from "../../Clients/Pagination";
import { useStoreContext } from "../../../store/ContextApiStore";
import Modal from "../Modal";
import AddNewFileForm from "../forms/AddNewFileForm";
import { DeleteModal } from "../../DeleteModal";

const FileTable = ({
  fileData,
  pagination,
  projectId,
  selectedFile,
  setSelectedFile,
  isAllselected,
  setIsAllSelected,
  slug,
  refetch,
  type,
}) => {
  const {
    updateFileModal,
    setUpdateFileModal,
    deleteFileModal,
    setDeleteFileModal,
  } = useStoreContext();

  const [fileId, setFileId] = useState();

  const { checkedSingleClient, checkedAllClient } = useCheckedHandler(
    selectedFile,
    setIsAllSelected,
    setSelectedFile
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
                        selectedFile?.length > 0 && isAllselected ? true : false
                      }
                      onChange={(e) =>
                        checkedAllClient(e.target.checked, fileData)
                      }
                      type="checkbox"
                    />
                  </th>
                  <th
                    scope="col"
                    className="py-3.5  uppercase  pl-4 pr-3 text-left text-sm font-semibold text-textColor2 sm:pl-6 "
                  >
                    File name
                  </th>
                  <th
                    scope="col"
                    className="px-3 uppercase py-3.5 text-left text-sm font-semibold text-textColor2"
                  >
                    Uploaded by
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
                {fileData?.map((item) => {
                  const isChecked = selectedFile.some(
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
                      <td className="whitespace-nowrap py-4 pl-4 pr-3  sm:pl-6 space-y-1 ">
                        <h3 className="text-sm   text-textColor font-metropolis font-normal ">
                          {item.name}
                        </h3>{" "}
                        <h6 className="text-xs  text-textColor2 font-metropolis font-normal ">
                          {item.url}
                        </h6>
                      </td>{" "}
                      <td className="whitespace-nowrap px-3 py-4  text-invoiceColor font-metropolis font-medium text-sm">
                        <div className="flex items-center  gap-3">
                          <img
                            className="h-7 w-7 rounded-full bg-gray-50"
                            src={
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            }
                            alt={item.created_by}
                          />
                          <div>
                            <h3 className="text-sm  text-textColor font-metropolis font-normal leading-[14px]">
                              {item.created_by}
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-textColor2 font-metropolis font-normal">
                        {item.time}
                      </td>
                      <td className="whitespace-nowrap   px-3 py-4 ">
                        <div className="flex gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFileId(item?.id);
                              setUpdateFileModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <PencilEdit02Icon
                              className="text-textColor2"
                              width="20px"
                              height="20px"
                            />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFileId(item?.id);
                              setDeleteFileModal(true);
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
              query="/?file"
              projectId={projectId}
            />
          </div>
        </div>
      </div>
      <Modal
        open={updateFileModal}
        setOpen={setUpdateFileModal}
        title="Update File"
      >
        <AddNewFileForm
          refetch={refetch}
          setOpen={setUpdateFileModal}
          type={type}
          id={fileId}
          update
        />
      </Modal>

      <DeleteModal
        open={deleteFileModal}
        setOpen={setDeleteFileModal}
        id={fileId}
        refetch={refetch}
        path="file"
        title="Delete File"
      />
    </div>
  );
};

export default FileTable;
