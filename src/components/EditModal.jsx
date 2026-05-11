"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";

import { BiEdit } from "react-icons/bi";
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar } from "react-icons/fa6";
import { MdOutlineTravelExplore } from "react-icons/md";
import toast from "react-hot-toast";

export function EditModal({ destination }) {
  const {
    _id,
    imageUrl,
    price,
    destinationName,
    duration,
    country,
    description,
    category,
    departureDate,
  } = destination;

  const onSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(e.currentTarget);
    const updatedDestination = Object.fromEntries(formData.entries());

    const res = await fetch(`http://localhost:3001/destination/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedDestination),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Destination updated successfully!");
      console.log(data);
    } else {
      toast.error(data?.message || "Failed to update destination");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};

  return (
    <Modal>
      {/* Trigger Button */}
      <Button
        variant="solid"
        className="rounded-2xl bg-cyan-500 px-5 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:bg-cyan-600 hover:shadow-xl"
      >
        <BiEdit size={18} />
        Edit Destination
      </Button>

      {/* Modal */}
      <Modal.Backdrop className="backdrop-blur-sm bg-black/40">
        <Modal.Container placement="center">
          <Modal.Dialog className="max-h-[95vh] w-full overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl sm:max-w-4xl">
            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header className="border-b border-gray-100 bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-cyan-500 p-3 text-white shadow-lg">
                  <MdOutlineTravelExplore size={24} />
                </div>

                <div>
                  <Modal.Heading className="text-2xl font-bold text-gray-800">
                    Edit Destination
                  </Modal.Heading>

                  <p className="text-sm text-gray-500">
                    Update travel destination information
                  </p>
                </div>
              </div>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="overflow-y-auto bg-slate-50 p-0">
              <Surface variant="default" className="bg-transparent shadow-none">
                <form onSubmit={onSubmit} className="space-y-8 p-5 sm:p-8">
                  {/* Preview Card */}
                  <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                    <div
                      className="h-52 w-full bg-cover bg-center sm:h-64"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                      }}
                    >
                      <div className="flex h-full items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                        <div className="text-white">
                          <div className="mb-2 flex items-center gap-2 text-sm">
                            <LuMapPin className="text-cyan-300" />
                            {country}
                          </div>

                          <h2 className="text-3xl font-extrabold">
                            {destinationName}
                          </h2>

                          <div className="mt-2 flex items-center gap-2 text-sm">
                            <FaRegCalendar className="text-cyan-300" />
                            {duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Destination Name */}
                    <TextField
                      defaultValue={destinationName}
                      name="destinationName"
                      isRequired
                    >
                      <Label className="mb-2 text-sm font-semibold text-gray-700">
                        Destination Name
                      </Label>

                      <Input
                        placeholder="Bali Paradise"
                        className="rounded-2xl"
                      />

                      <FieldError />
                    </TextField>

                    {/* Country */}
                    <TextField defaultValue={country} name="country" isRequired>
                      <Label className="mb-2 text-sm font-semibold text-gray-700">
                        Country
                      </Label>

                      <Input
                        placeholder="Indonesia"
                        className="rounded-2xl"
                      />

                      <FieldError />
                    </TextField>

                    {/* Category */}
                    <div>
                      <Label className="mb-2 block text-sm font-semibold text-gray-700">
                        Category
                      </Label>

                      <Select
                        defaultValue={category}
                        name="category"
                        isRequired
                        placeholder="Select category"
                        className="w-full"
                      >
                        <Select.Trigger className="rounded-2xl bg-white">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          <ListBox>
                            {[
                              "Beach",
                              "Mountain",
                              "City",
                              "Adventure",
                              "Cultural",
                              "Luxury",
                            ].map((item) => (
                              <ListBox.Item
                                key={item}
                                id={item}
                                textValue={item}
                              >
                                {item}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Price */}
                    <TextField
                      defaultValue={price}
                      name="price"
                      type="number"
                      isRequired
                    >
                      <Label className="mb-2 text-sm font-semibold text-gray-700">
                        Price (USD)
                      </Label>

                      <Input
                        type="number"
                        placeholder="1299"
                        className="rounded-2xl"
                      />

                      <FieldError />
                    </TextField>

                    {/* Duration */}
                    <TextField
                      defaultValue={duration}
                      name="duration"
                      isRequired
                    >
                      <Label className="mb-2 text-sm font-semibold text-gray-700">
                        Duration
                      </Label>

                      <Input
                        placeholder="7 Days / 6 Nights"
                        className="rounded-2xl"
                      />

                      <FieldError />
                    </TextField>

                    {/* Departure Date */}
                    <TextField
                      defaultValue={departureDate}
                      name="departureDate"
                      type="date"
                      isRequired
                    >
                      <Label className="mb-2 text-sm font-semibold text-gray-700">
                        Departure Date
                      </Label>

                      <Input type="date" className="rounded-2xl" />

                      <FieldError />
                    </TextField>

                    {/* Image URL */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={imageUrl}
                        name="imageUrl"
                        isRequired
                      >
                        <Label className="mb-2 text-sm font-semibold text-gray-700">
                          Image URL
                        </Label>

                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          className="rounded-2xl"
                        />

                        <FieldError />
                      </TextField>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <TextField
                        defaultValue={description}
                        name="description"
                        isRequired
                      >
                        <Label className="mb-2 text-sm font-semibold text-gray-700">
                          Description
                        </Label>

                        <TextArea
                          placeholder="Describe the travel experience..."
                          className="min-h-[160px] rounded-3xl"
                        />

                        <FieldError />
                      </TextField>
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <Modal.Footer className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                    <Button
                      variant="outline"
                      slot="close"
                      className="rounded-2xl px-6"
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      slot="close"
                      className="rounded-2xl bg-cyan-500 px-8 font-semibold text-white transition-all duration-300 hover:bg-cyan-600"
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}