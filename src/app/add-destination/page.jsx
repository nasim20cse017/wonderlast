"use client";

import {
  FieldError,
  Input,
  Label,
  ListBox,
  TextField,
  Select,
  TextArea,
  Button,
  Card,
} from "@heroui/react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AddDestinationPage = () => {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);

      const destination = Object.fromEntries(formData.entries());

      console.log("New Destination:", destination);

      const res = await fetch("http://localhost:3001/destination", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(destination),
      });

      const data = await res.json();

      console.log("Response from server:", data);

      // Success
      if (data.insertedId) {
        toast.success("Destination added successfully ✈️", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });

        e.target.reset();

        // Redirect after short delay
        setTimeout(() => {
          router.push("/destinations");
          router.refresh();
        }, 1500);
      } else {
        toast.error("Failed to add destination!", {
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
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-5">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-4xl font-extrabold text-gray-800">
          Add Destination
        </h2>

        <p className="mt-2 text-gray-500">
          Create a beautiful new travel destination package.
        </p>
      </div>

      {/* Form Card */}
      <Card className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
        <form
          onSubmit={onSubmit}
          className="space-y-8 p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Destination Name */}
            <div className="md:col-span-2">
              <TextField name="destinationName" isRequired>
                <Label className="mb-2 text-sm font-semibold text-gray-700">
                  Destination Name
                </Label>

                <Input
                  placeholder="Bali Paradise"
                  className="rounded-2xl"
                />

                <FieldError />
              </TextField>
            </div>

            {/* Country */}
            <TextField name="country" isRequired>
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
                name="category"
                isRequired
                className="w-full"
                placeholder="Select category"
              >
                <Select.Trigger className="rounded-2xl">
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
            <TextField name="price" type="number" isRequired>
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
            <TextField name="duration" isRequired>
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
            <div className="md:col-span-2">
              <TextField name="departureDate" type="date" isRequired>
                <Label className="mb-2 text-sm font-semibold text-gray-700">
                  Departure Date
                </Label>

                <Input type="date" className="rounded-2xl" />

                <FieldError />
              </TextField>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <TextField name="imageUrl" isRequired>
                <Label className="mb-2 text-sm font-semibold text-gray-700">
                  Image URL
                </Label>

                <Input
                  type="url"
                  placeholder="https://example.com/bali.jpg"
                  className="rounded-2xl"
                />

                <FieldError />
              </TextField>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label className="mb-2 text-sm font-semibold text-gray-700">
                  Description
                </Label>

                <TextArea
                  placeholder="Describe the travel experience..."
                  className="min-h-[150px] rounded-3xl"
                />

                <FieldError />
              </TextField>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={isPending}
            className="h-14 w-full rounded-2xl bg-cyan-500 text-lg font-semibold text-white transition-all duration-300 hover:bg-cyan-600 hover:shadow-xl"
          >
            {isPending
              ? "Adding Destination..."
              : "Add Destination"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddDestinationPage;