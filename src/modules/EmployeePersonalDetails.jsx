import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import EntityTableRow from "../components/table/EntityTableRow";
import EntityViewCard from "../components/view/EntityViewCard";

import { EmployeeAPI, EmployeePersonalAPI } from "../services";
import SearchBar from "../components/table/SearchBar";

// ✅ NEW
import { useUser } from "../hooks/useUser";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors, parseBackendResponse } from "../utils/parseBackendErrors";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function EmployeePersonalDetails({ employeeFilterId, asSubcomponent, setTabActions }) {
  const { setError, setSuccess } = useOutletContext();
  const { employeeId, isHR } = useUser();
const [formError, setFormError] = useState(null);
const [savedFormData, setSavedFormData] = useState(null);
  const [details, setDetails] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [mode, setMode] = useState("list");
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (asSubcomponent && setTabActions) {
      if (mode === "view" && selectedItem) {
        setTabActions({
          onEdit: () => setMode("form"),
          onDelete: () => handleDelete(selectedItem.id),
        });
      } else {
        setTabActions(null);
      }
      return () => setTabActions(null);
    }
  }, [asSubcomponent, setTabActions, mode, selectedItem]);
  //  const fetchEmployees = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await EmployeeAPI.getAll();
  //       let list = res.data?.data || [];
  //      // 🔒 non HR → only own employee
  //       if (!isHR) {
  //         list = list.filter(e => e.id === employeeId);
  //       }
  //       setEmployees(list);
  //     } catch (err) {
  //       setError(parseBackendErrors(err));
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // ================= FETCH DETAILS =================

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await EmployeeAPI.getAll();
      const parsed = parseBackendResponse(res);
      let list = parsed.success && parsed.data ? (Array.isArray(parsed.data) ? parsed.data : []) : [];
      // 🔒 non HR → only own employee
      if (!isHR) {
        list = list.filter(e => e.id === employeeId);
      }
      setEmployees(list);
    } catch (err) {
      setError(parseBackendErrors(err));
    } finally {
      setLoading(false);
    }
  };
  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await EmployeePersonalAPI.getAll();
      const parsed = parseBackendResponse(res);
      let data = parsed.success && parsed.data ? (Array.isArray(parsed.data) ? parsed.data : []) : [];

      // 🔒 non HR → only own details
      if (!isHR) {
        data = data.filter(d => Number(d.employee_id) === Number(employeeId));
      }
      if (employeeFilterId) {
        data = data.filter(d => Number(d.employee_id) === Number(employeeFilterId));
      }

      const formatted = data.map(d => {
        const emp = employees.find(e => e.id === d.employee_id);

        return {
          ...d,
          employeeName: emp
            ? `${emp.employee_code} - ${emp.first_name} ${emp.last_name}`
            : "—",
        };
      });

      setDetails(formatted);

      // For non-HR with data, automatically go to view mode
      if (asSubcomponent && !isHR && formatted.length > 0) {
        setSelectedItem(formatted[0]);
        setMode("view");
      }
    } catch (err) {
      setError(parseBackendErrors(err));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, [isHR, employeeId]);

  useEffect(() => {
    if (employees.length > 0) {
      fetchDetails();
    }
  }, [employees, isHR, employeeId]);

  // ================= SEARCH =================
  const filteredDetails = details.filter(d =>
    `${d.employeeName} ${d.father_name} ${d.mother_name} ${d.emergency_contact_phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= SAVE =================
  // const onSubmit = async (data) => {
  //   try {
  //     const payload = {
  //       ...data,
  //       employee_id: Number(data.employee_id),
  //       marital_status: data.marital_status?.toLowerCase(),
  //     };

  //     // 🔥 FIXED UNIQUE CHECK
  //     let exists = false;

  //     if (selectedItem) {
  //       exists = details.find(
  //         d => d.employee_id === payload.employee_id && d.id !== selectedItem.id
  //       );
  //     } else {
  //       exists = details.find(d => d.employee_id === payload.employee_id);
  //     }

  //     if (exists) {
  //       setError(["This employee already has personal details!"]);
  //       return;
  //     }

  //     if (selectedItem) {
  //       const changedFields = {};
  //       Object.keys(payload).forEach(key => {
  //         if (payload[key] !== selectedItem[key]) {
  //           changedFields[key] = payload[key];
  //         }
  //       });

  //       if (Object.keys(changedFields).length === 0) {
  //         setSuccess("No changes to save");
  //         setMode(isHR ? "list" : "view");
  //         return;
  //       }

  //       const res = await EmployeePersonalAPI.update(selectedItem.id, changedFields);
  //       const parsed = parseBackendResponse(res);
  //       setSuccess(parsed.message || "Saved successfully");
  //     } else {
  //       const res = await EmployeePersonalAPI.create(payload);
  //       const parsed = parseBackendResponse(res);
  //       setSuccess(parsed.message || "Saved successfully");
  //     }

  //     setMode(isHR ? "list" : "view");
  //     await fetchDetails();

  //   } catch (err) {
  //     if (err.response?.data?.errors) {
  //       const errorMessages = Object.values(err.response.data.errors).flat();
  //       setError(errorMessages);
  //     } else if (err.response?.data?.error) {
  //       setError([err.response.data.error]);
  //     } else {
  //       setError(parseBackendErrors(err));
  //     }
  //     console.error("SAVE ERROR:", err.response?.data || err.message);
  //   }
  // };
const onSubmit = async (data, methods) => {
  try {
    const payload = {
      ...data,
      // employee_id: Number(data.employee_id),
      employee_id: isHR
  ? Number(data.employee_id)
  : Number(employeeId),
      marital_status: data.marital_status?.toLowerCase(),
    };

    // 🔥 FIXED UNIQUE CHECK
    let exists = false;

    if (selectedItem) {
      exists = details.find(
        d => d.employee_id === payload.employee_id && d.id !== selectedItem.id
      );
    } else {
      exists = details.find(d => d.employee_id === payload.employee_id);
    }

    if (exists) {
      setError(["This employee already has personal details!"]);
      return;
    }

    if (selectedItem) {
      const changedFields = {};
      Object.keys(payload).forEach(key => {
        if (payload[key] !== selectedItem[key]) {
          changedFields[key] = payload[key];
        }
      });

      // if (Object.keys(changedFields).length === 0) {
      //   setSuccess("No changes to save");
      //   setMode(isHR ? "list" : "view");
      //   return;
      // }

      const res = await EmployeePersonalAPI.update(selectedItem.id, changedFields);
      const parsed = parseBackendResponse(res);
      setSuccess(parsed.message || "Saved successfully");
    } else {
      const res = await EmployeePersonalAPI.create(payload);
      const parsed = parseBackendResponse(res);
      setSuccess(parsed.message || "Saved successfully");
    }

    // Clear saved data on success
    setSavedFormData(null);
    setFormError(null);
    setMode(isHR ? "list" : "view");
    await fetchDetails();

  } catch (err) {
    // ✅ PRESERVE FORM DATA ON ERROR
    setSavedFormData(data);
    setFormError(true);
    
    if (err.response?.data?.errors) {
      const errorMessages = Object.values(err.response.data.errors).flat();
      setError(errorMessages);
    } else if (err.response?.data?.error) {
      setError([err.response.data.error]);
    } else {
      setError(parseBackendErrors(err));
    }
    console.error("SAVE ERROR:", err.response?.data || err.message);
  }
};
  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      const res = await EmployeePersonalAPI.delete(id);
      const parsed = parseBackendResponse(res);
      setSuccess(parsed.message || "Deleted successfully");
      await fetchDetails();

      // After delete, if no details left for non-HR, go to form
      if (!isHR && details.length <= 1) {
        setSelectedItem(null);
        setMode("form");
      }
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  const personalColumns = [
    ...(isHR ? [{
      key: "employeeName",
      render: (row) => row.employeeName,
    }] : []),
    
    { key: "father_name" },
    { key: "mother_name" },
    { key: "marital_status" },
    { key: "emergency_contact_phone" },
  ];

  const personalFields = [
    ...(isHR ? [{ key: "employeeName", label: "Employee" }] : []),
    { key: "father_name", label: "Father Name" },
    { key: "mother_name", label: "Mother Name" },
    { key: "marital_status", label: "Marital Status" },
    { key: "spouse_name", label: "Spouse Name" },
    { key: "address", label: "Address" },
    { key: "emergency_contact_name", label: "Emergency Contact Name" },
    { key: "emergency_contact_phone", label: "Emergency Contact Phone" },
  ];

  // ================= LIST =================
  if (mode === "list") {
    // For non-HR with 0 data, show message with add button (no table)
    if (!isHR && filteredDetails.length === 0 && !loading) {
      const noDataContent = (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
            {!asSubcomponent && <SectionTitle title="EMPLOYEE PERSONAL DETAILS" />}
            <ActionButtons
              showAdd
              addText="+ Add Personal Details"
              onAdd={() => {
                setSelectedItem(null);
                setMode("form");
              }}
            />
          </div>
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-gray-500 mb-4">No personal details found</div>

          </div>
          {loading && <LoadingSpinner text="Loading Employee Personal Details..." />}
        </>
      );

      if (asSubcomponent) {
        return <div className="w-full bg-white rounded-lg p-5 shadow-sm">{noDataContent}</div>;
      }
      return <PageContainer>{noDataContent}</PageContainer>;
    }

    // For HR or non-HR with data, show the table
    const listContent = (
      <>
        {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 w-full">
          <SectionTitle title="EMPLOYEE PERSONAL DETAILS" />

          <div className="flex flex-wrap gap-3 self-end ml-auto mb-2">
            <SearchBar value={search} onChange={setSearch} placeholder="Search details..." />
            {(isHR && filteredDetails.length === 0) && (
              <ActionButtons 
                showAdd 
                addText="+ Add" 
                onAdd={() => {
                  setSelectedItem(null);
                  setMode("form");
                }} 
              />
            )}
            {isHR && filteredDetails.length > 0 && (
              <ActionButtons 
                showAdd 
                addText="+ Add" 
                onAdd={() => {
                  setSelectedItem(null);
                  setMode("form");
                }} 
              />
            )}
          </div>
        </div> */}
        <div className="flex flex-col sm:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">

          {/* LEFT: Title + Search */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-3">

            <div>
              {!asSubcomponent && <SectionTitle title="EMPLOYEE PERSONAL DETAILS" />}
            </div>

            <div>
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search details..."
              />
            </div>

          </div>

        </div>

        {/* RIGHT: Add Button (separate SAME as USERS) */}
        <div className="flex flex-wrap gap-3 self-end ml-auto mb-2">

          {isHR && (
            <ActionButtons
              showAdd
              addText="+ Add"
              onAdd={() => {
                setSelectedItem(null);
                setMode("form");
              }}
            />
          )}

        </div>
        {isHR && (
          <>
            <Table
              header={
                <TableHeader
                  columns={[
                    ...(isHR ? ["Employee"] : []),
                    "Father Name",
                    "Mother Name",
                    "Marital Status",
                    "Emergency Contact",
                    "Action",
                  ]}
                />
              }
            >
              {filteredDetails.map((d, index) => (
                <EntityTableRow
                  key={d.id}
                  row={d}
                 rowNumber={index + 1} 
                  columns={personalColumns}
                  onView={(r) => {
                    setSelectedItem(r);
                    setMode("view");
                  }}
                  onEdit={(r) => {
                    setSelectedItem(r);
                    setMode("form");
                  }}
                  onDelete={() => handleDelete(d.id)}
                />
              ))}
            </Table>
          </>)}
        {loading && <LoadingSpinner text="Loading Employee Personal Details..." />}
      </>
    );

    if (asSubcomponent) {
      return <div className="w-full bg-white rounded-lg p-5 shadow-sm">{listContent}</div>;
    }

    return <PageContainer>{listContent}</PageContainer>;
  }

  // ================= VIEW =================
  if (mode === "view" && selectedItem) {
    const viewContent = (
      <EntityViewCard
        title="Personal Details"
        data={selectedItem}
        fields={personalFields}
        api={EmployeePersonalAPI}
        onUpdated={fetchDetails}
        onDeleted={fetchDetails}
        headerKeys={["employeeName"]}
      />
    );
    if (asSubcomponent) {
      return <div className="w-full bg-white rounded-lg p-5 shadow-sm">{viewContent}</div>;
    }
    return (
      <EntityPageLayout
        title="Personal Details"
        showBack={isHR}
        onBack={() => setMode("list")}
      >
        {viewContent}
      </EntityPageLayout>
    );
  }

  // ================= FORM =================
  // const formContent = (
  //   <EntityForm
  //     title={selectedItem ? "Edit Personal Details" : "Create Personal Details"}
  //     selectedItem={
  //       selectedItem
  //         ? {
  //           ...selectedItem,
  //           marital_status:
  //             selectedItem.marital_status?.toLowerCase() === "married"
  //               ? "married"
  //               : selectedItem.marital_status?.toLowerCase() === "single"
  //                 ? "single"
  //                 : "",
  //         }
  //         : null
  //     }
  //     onSubmit={onSubmit}
  //     setMode={setMode}
  //     onCancel={() => setMode(isHR ? "list" : "view")}
  //     fields={[
  //       {
  //         label: "Employee",
  //         name: "employee_id",
  //         type: "select",
  //         options: employees.map(e => ({
  //           label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
  //           value: e.id,
  //         })),
  //         required: true,
  //         disabled: !!employeeFilterId,
  //         defaultValue: employeeFilterId || "",
  //       },
  //       { label: "Father Name", name: "father_name" },
  //       { label: "Mother Name", name: "mother_name" },
  //       {
  //         label: "Marital Status",
  //         name: "marital_status",
  //         type: "select",
  //         required: true,
  //         options: [
  //           { label: "Single", value: "single" },
  //           { label: "Married", value: "married" },
  //         ],
  //       },
  //       { label: "Spouse Name", name: "spouse_name" },
  //       { label: "Address", name: "address", type: "textarea" },
  //       { label: "Emergency Contact Name", name: "emergency_contact_name" },
  //       { label: "Emergency Contact Phone", name: "emergency_contact_phone" },
  //     ]}
  //   />
  // );
  const formContent = (
    <EntityForm
      key={formError ? "error-" + Date.now() : selectedItem?.id || "new"}
      title={selectedItem ? "Edit Personal Details" : "Create Personal Details"}
      selectedItem={
        savedFormData ? savedFormData : (selectedItem
          ? {
              ...selectedItem,
              marital_status:
                selectedItem.marital_status?.toLowerCase() === "married"
                  ? "married"
                  : selectedItem.marital_status?.toLowerCase() === "single"
                    ? "single"
                    : "",
            }
          : null)
      }
      onSubmit={onSubmit}
      setMode={setMode}
      onCancel={() => {
        setSavedFormData(null);
        setFormError(null);
        setMode(isHR ? "list" : "view");
      }}
      fields={[
       ...(isHR
    ? [
        {
          label: "Employee",
          name: "employee_id",
          type: "select",
          options: employees.map(e => ({
            label: `${e.employee_code} - ${e.first_name} ${e.last_name}`,
            value: e.id,
          })),
          required: true,
          disabled: !!employeeFilterId,
          defaultValue: employeeFilterId || "",
        },
      ]
    : []),
        { label: "Father Name", name: "father_name" },
        { label: "Mother Name", name: "mother_name" },
        {
          label: "Marital Status",
          name: "marital_status",
          type: "select",
          required: true,
          options: [
            { label: "Single", value: "single" },
            { label: "Married", value: "married" },
          ],
        },
        { label: "Spouse Name", name: "spouse_name" },
        { label: "Address", name: "address", type: "textarea" },
        { label: "Emergency Contact Name", name: "emergency_contact_name" },
        { label: "Emergency Contact Phone", name: "emergency_contact_phone" },
      ]}
    />
  );
  if (asSubcomponent) {
    return <div className="w-full bg-white rounded-lg p-5 shadow-sm">{formContent}</div>;
  }

  return (
    <EntityPageLayout title="Employee Personal Details" showBack={isHR} onBack={() => setMode(isHR ? "list" : "view")}>
      {formContent}
    </EntityPageLayout>
  );
}
