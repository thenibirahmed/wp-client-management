import React from "react";

const CommentLists = ({ commentlists }) => {
  return (
    <div className="pt-5 space-y-4">
      {commentlists.map((item, i) => (
        <>
          <Sender first={i === 0} key={i} {...item} />
          <Receiver key={i} {...item} />
        </>
      ))}
    </div>
  );
};

export default CommentLists;

const Sender = ({ sender, first }) => {
  return (
    <div
      className={`space-y-2 ${
        first ? "" : "border-t border-borderColor"
      }  py-4`}
    >
      <div className="flex items-center gap-2">
        <img
          className="w-9 h-9 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div>
          <h3 className="text-sm text-textColor font-normal leading-4 font-metropolis">
            {sender?.name}
          </h3>
          <span className="text-xs text-textColor2 font-normal leading-[12px] font-metropolis">
            {sender?.time}
          </span>
        </div>
      </div>
      <p className="font-metropolis font-medium text-textColor2 text-sm ">
        {sender?.text}
      </p>
    </div>
  );
};

const Receiver = ({ receiver }) => {
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
            {receiver?.name}
          </h3>
          <span className="text-xs text-textColor2 font-normal leading-[12px] font-metropolis">
            {receiver?.time}
          </span>
        </div>
      </div>
      <p className="font-metropolis font-medium text-textColor2 text-sm ">
        {receiver?.text}
      </p>
    </div>
  );
};
