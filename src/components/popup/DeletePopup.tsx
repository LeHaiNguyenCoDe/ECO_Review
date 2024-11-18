import React from "react";
import Image from "next/image";
import Button from "../elements/Button";

interface DeletePopupProps {
  show: boolean;
  title?: string;
  onClose: (e: React.MouseEvent) => void;
  onConfirm: (e: React.MouseEvent) => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({
  show,
  title,
  onClose,
  onConfirm,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-md text-center shadow-2xl">
        <p className="mb-4 text-lg text-primary font-semibold">
          {title || "Bạn có muốn xóa sản phẩm này không?"}
        </p>
        <Image
          src="/images/recycle-delete.png"
          alt="recycle-delete"
          width={70}
          height={70}
          className="mx-auto mb-4"
        />
        <div className="flex justify-center mt-4 font-medium">
          <Button
            onClick={onConfirm}
            className="w-1/3 mr-2 border border-primary text-primary rounded-md px-4 py-2"
          >
            Có
          </Button>
          <Button
            onClick={onClose}
            className="w-1/3 ml-2 bg-primary text-white rounded-md px-4 py-2"
          >
            Không
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
