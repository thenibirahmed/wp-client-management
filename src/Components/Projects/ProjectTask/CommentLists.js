import React from "react";
import {
  Delete03Icon,
  PencilEdit02Icon,
  SquareArrowMoveLeftUpIcon,
} from "../../../utils/icons";
import { useStoreContext } from "../../../store/ContextApiStore";

const CommentLists = ({ commentlists }) => {
  return (
    <div className="pt-5 space-y-4">
      {commentlists?.map((item, i) => (
        <>
          <Comments first={i === 0} key={i} {...item} />
          {item?.replies?.length > 0 &&
            item?.replies?.map((repliesData) => (
              <Replies key={i} {...repliesData} />
            ))}
        </>
      ))}
    </div>
  );
};

export default CommentLists;

const Comments = ({ author, date, comment, id, first }) => {
  const { commentReplyId, setCommentReplyId } = useStoreContext();
  return (
    <div
      className={`flex justify-between items-start ${
        first ? "" : "border-t border-borderColor"
      }  py-4`}
    >
      <div className="space-y-2 ">
        <div className="flex items-center gap-2">
          <img
            className="w-9 h-9 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <div>
            <h3 className="text-sm text-textColor font-normal leading-4 font-metropolis">
              {author}
            </h3>
            <span className="text-xs text-textColor2 font-normal leading-[12px] font-metropolis">
              {date}
            </span>
          </div>
        </div>
        <p className="font-metropolis font-medium text-textColor2 text-sm ">
          {comment}
        </p>
      </div>
      <div className="space-x-4">
        <button onClick={() => setCommentReplyId(id)}>
          <SquareArrowMoveLeftUpIcon
            className="text-textColor2"
            width="20px"
            height="20px"
          />
        </button>
        <button>
          <PencilEdit02Icon
            className="text-textColor2"
            width="20px"
            height="20px"
          />
        </button>
        <button>
          {" "}
          <Delete03Icon className="text-customRed" width="20px" height="20px" />
        </button>
      </div>
    </div>
  );
};

const Replies = ({ author, date, reply }) => {
  return (
    <div className="space-y-2 ml-10 border-t border-borderColor py-4">
      <div className="flex items-center gap-2">
        <img
          className="w-9 h-9 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div>
          <h3 className="text-sm text-textColor font-normal leading-4 font-metropolis">
            {author}
          </h3>
          <span className="text-xs text-textColor2 font-normal leading-[12px] font-metropolis">
            {date}
          </span>
        </div>
      </div>
      <p className="font-metropolis font-medium text-textColor2 text-sm ">
        {reply}
      </p>
    </div>
  );
};
