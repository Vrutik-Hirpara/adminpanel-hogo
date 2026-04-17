
import { useForm } from "react-hook-form";
import { themes } from "../config/theme.config";
import FormField from "../components/form/FormField";
import FormSelect from "../components/form/FormSelect";
import FormTextarea from "../components/form/FormTextarea";
import FormFileUpload from "../components/form/FormFileUpload";

export default function ExampleForm({ defaultValues = null }) {
  const { register, handleSubmit } = useForm({
    defaultValues: defaultValues || {},
  });

  const onSubmit = (data) => {
    console.log("CAR DATA 👉", data); // ADD / EDIT ready
  };

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-lg shadow"
      style={{ backgroundColor: themes.textWhite }}
    >
      {/* HEADER */}
      <div
        className="px-6 py-3  font-semibold rounded-t-lg"
        style={{ backgroundColor: themes.primary  , color: themes.textWhite }}
      >
        {defaultValues ? "Edit Car" : "Add Car"}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {/* BASIC DETAILS */}
<h3
  className="text-sm font-semibold uppercase pb-1 mb-4"
  style={{ borderBottom: `1px solid ${themes.borderLight}` }}
>
          Basic Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormField
            label="Car Name"
            name="name"
            register={register}
          />
          <FormField
            label="Brand"
            name="brand"
            register={register}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <FormField
            label="Model Year"
            name="year"
            type="number"
            register={register}
          />
          <FormSelect
            label="Fuel Type"
            name="fuel"
            register={register}
            options={[
              { label: "Petrol", value: "petrol" },
              { label: "Diesel", value: "diesel" },
              { label: "Electric", value: "electric" },
            ]}
          />
          <FormSelect
            label="Transmission"
            name="transmission"
            register={register}
            options={[
              { label: "Manual", value: "manual" },
              { label: "Automatic", value: "automatic" },
            ]}
          />
        </div>

        {/* PRICING & AVAILABILITY */}
<h3
  className="text-sm font-semibold uppercase pb-1 mt-6 mb-4"
  style={{
    borderBottom: `1px solid ${themes.borderLight}`,
    color: themes.textSecondary,   // optional but recommended
  }}
>
          Pricing & Availability
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <FormField
            label="Price (₹)"
            name="price"
            type="number"
            register={register}
          />

          {/* ✅ DATE OF BOOKING ADDED HERE */}
          <FormField
            label="Date of Booking"
            name="bookingDate"
            type="date"
            register={register}
          />

          <FormSelect
            label="Status"
            name="status"
            register={register}
            options={[
              { label: "Available", value: "available" },
              { label: "Sold", value: "sold" },
            ]}
          />
        </div>

        {/* DESCRIPTION */}
        <FormTextarea
          label="Car Description"
          name="description"
          register={register}
        />

        {/* IMAGE UPLOAD */}
        <div className="mt-4">
          <FormFileUpload
            label="Upload Car Image"
            name="image"
            register={register}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
      <button
  type="button"
  className="px-4 py-2 rounded"
  style={{
    border: `1px solid ${themes.borderLight}`,
    color: themes.textPrimary,
    backgroundColor: themes.surfaceLight,
  }}
>
  Cancel
</button>


      <button
  type="submit"
  className="px-5 py-2 rounded transition-all duration-200"
  style={{
    backgroundColor: themes.primary,
    color: themes.textWhite,
  }}
>

            {defaultValues ? "Update Car" : "Save Car"}
          </button>
        </div>
      </form>
    </div>
  );
}
