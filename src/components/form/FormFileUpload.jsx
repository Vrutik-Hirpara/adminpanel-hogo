export default function FormFileUpload({
  label,
  name,
  register,
}) {
  return (
    <div className="flex flex-col gap-6">
      <label className="text-sm text-gray-600">{label}</label>

      <label className="border-2 border-dashed rounded p-6 text-center cursor-pointer text-gray-500">
        Upload file
        <input
          type="file"
          {...register(name)}
          className="hidden"
        />
      </label>
    </div>
  );
}
