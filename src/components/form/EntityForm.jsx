
import { useEffect } from "react";
import FormWrapper from "../form/FormWrapper";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import FormSelect from "../form/FormSelect";
import FormTextarea from "../form/FormTextarea";
import FormActions from "../form/FormActions";

export default function EntityForm({
  title,
  fields,
  selectedItem,
  onSubmit,
  setMode,
}) {
  return (
    <FormWrapper onSubmit={onSubmit}>
      {(methods) => {
        const {
          register,
          reset,
          setError,
          clearErrors,
          formState: { errors },
        } = methods;

        useEffect(() => {
          if (selectedItem) {
            const data = { ...selectedItem };
            fields.forEach((f) => {
              if (f.type === "file") delete data[f.name];
            });
            reset(data);
          } else {
            const empty = {};
            fields.forEach((f) => (empty[f.name] = ""));
            reset(empty);
          }
        }, [selectedItem, reset, fields]);

        const getRules = (field) => ({
          required:
            field.required || field.name === "status"
              ? `${field.label} is required`
              : false,
        });

        return (
          <FormContainer title={title}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map((field) => {
                if (field.type === "textarea")
                  return (
                    <FormTextarea
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      register={register}
                      rules={getRules(field)}
                      error={errors[field.name]}
                    />
                  );

                if (field.type === "select")
                  return (
                    <FormSelect
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      options={field.options}
                      register={register}
                      rules={getRules(field)}
                      error={errors[field.name]}
                    />
                  );

                return (
                  <FormInput
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    type={field.type || "text"}
                    register={register}
                    rules={getRules(field)}
                    error={errors[field.name]}
                  />
                );
              })}
            </div>

            <FormActions onCancel={() => setMode("list")} />
          </FormContainer>
        );
      }}
    </FormWrapper>
  );
}
