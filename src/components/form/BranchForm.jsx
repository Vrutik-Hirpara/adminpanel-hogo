import { useEffect } from "react";
import FormWrapper from "../form/FormWrapper";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import FormTextarea from "../form/FormTextarea";
import FormActions from "../form/FormActions";

export default function BranchForm({ selectedBranch, onSubmit, setMode }) {
  return (
    <FormWrapper onSubmit={onSubmit}>
      {(methods) => {
        const { register, reset } = methods;

        useEffect(() => {
          selectedBranch
            ? reset(selectedBranch)
            : reset({
                name: "",
                address: "",
                city: "",
                state: "",
                country: "",
              });
        }, [selectedBranch, reset]);

        return (
          <FormContainer
            title={
              selectedBranch
                ? "Edit Office Branch"
                : "Create Office Branch"
            }
          >
            {/* NAME + ADDRESS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="Name" name="name" register={register} required />
              <div className="md:col-span-2">
                <FormTextarea label="Address" name="address" register={register} />
              </div>
            </div>

            {/* CITY STATE COUNTRY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <FormInput label="City" name="city" register={register} />
              <FormInput label="State" name="state" register={register} />
              <FormInput label="Country" name="country" register={register} />
            </div>

            <FormActions onCancel={() => setMode("list")} />
          </FormContainer>
        );
      }}
    </FormWrapper>
  );
}
