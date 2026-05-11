"use client";

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import {
  MdDeleteOutline,
  MdWarningAmber,
} from "react-icons/md";

export function DeleteAlert({ destination }) {
  const router = useRouter();

  const { _id, destinationName } = destination;

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/destination/${_id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Destination deleted successfully ✈️", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
        });

        setTimeout(() => {
          router.push("/destinations");
          router.refresh();
        }, 1200);
      } else {
        toast.error("Failed to delete destination!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <AlertDialog>
      {/* Trigger Button */}
      <Button
        variant="outline"
        className="group rounded-2xl border border-red-200 bg-white px-5 py-2 font-semibold text-red-500 shadow-sm transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:shadow-lg"
      >
        <MdDeleteOutline
          size={20}
          className="transition-transform duration-300 group-hover:scale-110"
        />
        Delete
      </Button>

      {/* Modal */}
      <AlertDialog.Backdrop className="bg-black/40 backdrop-blur-sm">
        <AlertDialog.Container placement="center">
          <AlertDialog.Dialog className="w-full max-w-[92%] overflow-hidden rounded-3xl border border-red-100 bg-white shadow-2xl sm:max-w-[450px]">
            <AlertDialog.CloseTrigger />

            {/* Header */}
            <AlertDialog.Header className="flex flex-col items-center border-b border-red-100 bg-gradient-to-b from-red-50 to-white px-6 py-8 text-center">
              <div className="mb-5 rounded-full bg-red-100 p-5 text-red-500 shadow-md">
                <MdWarningAmber size={42} />
              </div>

              <AlertDialog.Heading className="text-2xl font-bold text-gray-800">
                Delete Destination?
              </AlertDialog.Heading>

              <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
                You are about to permanently remove this destination from your
                travel collection.
              </p>
            </AlertDialog.Header>

            {/* Body */}
            <AlertDialog.Body className="space-y-4 px-6 py-6 text-center">
              <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                <p className="text-sm text-gray-600">
                  Destination Name
                </p>

                <h3 className="mt-1 text-lg font-bold text-red-500">
                  {destinationName}
                </h3>
              </div>

              <p className="text-sm leading-6 text-gray-500">
                This action cannot be undone. All related data will be deleted
                permanently.
              </p>
            </AlertDialog.Body>

            {/* Footer */}
            <AlertDialog.Footer className="flex flex-col gap-3 border-t border-gray-100 px-6 py-5 sm:flex-row sm:justify-end">
              <Button
                slot="close"
                variant="outline"
                className="rounded-2xl border-gray-200 px-6 py-2 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-100"
              >
                Cancel
              </Button>

              <Button
                onClick={handleDelete}
                slot="close"
                className="rounded-2xl bg-red-500 px-6 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
              >
                <MdDeleteOutline size={18} />
                Delete Permanently
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}