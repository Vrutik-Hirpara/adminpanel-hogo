
import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import EntityTableRow from "../components/table/EntityTableRow";

import { VisitsAPI, EmployeeAPI } from "../services";
import EntityViewCard from "../components/view/EntityViewCard";

export default function Visits() {
  const [visits, setVisits] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedVisit, setSelectedVisit] = useState(null);

//   const fetchData = async () => {
// const [v, e] = await Promise.all([
//   VisitsAPI.getAll(),
//   EmployeeAPI.getAll(),
// ]);


//     setVisits(v.data.data || []);
//     setEmployees(e.data.data || []);
//   };
const fetchData = async () => {
  const [v, e] = await Promise.all([
    VisitsAPI.getAll(),
    EmployeeAPI.getAll(),
  ]);

  const visitsData = v.data.data || [];
  setVisits(visitsData);
  setEmployees(e.data.data || []);

  // ⭐ UNIQUE LEAD TYPES FROM API

};

  useEffect(() => { fetchData(); }, []);
  
// const onSubmit = async (data) => {
  
//   try {
//     if (!data.employee_id) return alert("Employee is required");
// if (!data.lead_type) return alert("Lead Type is required");
// if (!data.visit_date) return alert("Visit Date is required");

//     const hasFile =
//       data.payment_image instanceof FileList ||
//       data.images instanceof FileList;

//     if (hasFile) {
//       // 👉 Use FormData ONLY if file present
//       const formData = new FormData();

//       Object.keys(data).forEach((key) => {
//         const value = data[key];

//         if (value instanceof FileList) {
//           console.log(value,"olp")
//           if (value.length > 0) formData.append(key, value[0]);
//         } else if (value !== "" && value !== null && value !== undefined) {
//           console.log(value,"olp1")

//           formData.append(key, value);
//         }
//       });
// console.log("plpl",formData,data)
//       selectedVisit
//         ? await VisitsAPI.update(selectedVisit.id, formData)
//         : await VisitsAPI.create(formData);

//     } else {
//       // 👉 PURE JSON (THIS FIXES LEAD TYPE ISSUE)
// console.log("plpl1")

//       selectedVisit
//         ? await VisitsAPI.update(selectedVisit.id, data)
//         : await VisitsAPI.create(data);
//     }

//     setMode("list");
//     fetchData();

//   } catch (err) {
//   const res = err.response?.data;

//   if (!res) {
//     alert("Network error. Please try again.");
//     return;
//   }

//   // 🔥 Convert API errors to readable message
//   const message = Object.entries(res)
//     .map(([field, errors]) => {
//       const text = Array.isArray(errors) ? errors.join(", ") : errors;
//       return `${field.replaceAll("_", " ")}: ${text}`;
//     })
//     .join("\n");

//   alert(message);
// }

// };
// const onSubmit = async (data) => {
//   try {
//     // if (!data.employee_id) return alert("Employee is required");
//     // if (!data.visit_date) return alert("Visit Date is required");

//     const hasFile =
//       data.payment_image instanceof FileList ||
//       data.images instanceof FileList;

//     if (hasFile) {
//       const formData = new FormData();
//       Object.keys(data).forEach((key) => {
//         const value = data[key];
//         if (value instanceof FileList) {
//           if (value.length > 0) formData.append(key, value[0]);
//         } else if (value !== "" && value !== null && value !== undefined) {
//           formData.append(key, value);
//         }
//       });

//       selectedVisit
//         ? await VisitsAPI.update(selectedVisit.id, formData)
//         : await VisitsAPI.create(formData);
//     } else {
//       selectedVisit
//         ? await VisitsAPI.update(selectedVisit.id, data)
//         : await VisitsAPI.create(data);
//     }

//     setMode("list");
//     fetchData();

//   } catch (err) {
//     const res = err.response?.data;

//     if (!res) {
//       alert("Network error. Please try again.");
//       return;
//     }

//     const message = Object.entries(res)
//       .map(([field, errors]) => {
//         const text = Array.isArray(errors) ? errors.join(", ") : errors;
//         return `${field.replaceAll("_", " ")}: ${text}`;
//       })
//       .join("\n");

//     alert(message);
//   }
// };
const onSubmit = async (data) => {
  try {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key];

      // If file field
      if (value instanceof FileList) {
        if (value.length > 0) {
          formData.append(key, value[0]);
        }
      }
      // Normal fields
      else if (value !== "" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    if (selectedVisit) {
      await VisitsAPI.update(selectedVisit.id, formData);
    } else {
      await VisitsAPI.create(formData);
    }

    setMode("list");
    fetchData();

  } catch (err) {
    const res = err.response?.data;

    if (!res) {
      alert("Network error. Please try again.");
      return;
    }

    const message = Object.entries(res)
      .map(([field, errors]) => {
        const text = Array.isArray(errors) ? errors.join(", ") : errors;
        return `${field.replaceAll("_", " ")}: ${text}`;
      })
      .join("\n");

    alert(message);
  }
};

// 🔥 VIEW FIELDS (FOR EntityViewCard)
const visitFields = [
  { key: "employee_name", label: "Employee", column: "left" },
  { key: "lead_type", label: "Lead Type", column: "left" },
  { key: "contact_person", label: "Contact Person", column: "left" },
  { key: "address", label: "Address", column: "left" },
  { key: "location", label: "Location", column: "left" },
  { key: "visit_purpose", label: "Visit Purpose", column: "left" },
  { key: "order_name", label: "Order Name", column: "left" },

  { key: "visit_date", label: "Visit Date", column: "right" },
  { key: "check_in_time", label: "Check In Time", column: "right" },
  { key: "checkout_time", label: "Checkout Time", column: "right" },
  { key: "followup_date", label: "Followup Date", column: "right" },
  { key: "followup_type", label: "Followup Type", column: "right" },
  { key: "order_information", label: "Order Information", column: "right" },
  { key: "payment_details", label: "Payment Details", column: "right" },
  { key: "notes", label: "Notes", column: "right" },

  { key: "payment_image", label: "Payment Image", column: "right" },
  { key: "images", label: "Visit Image", column: "right" },
];

  /* 🔥 TABLE COLUMNS */
  const visitColumns = [
    { key: "employee_name" },
    { key: "lead_type" }, // FIXED
    {
      key: "time",
      render: (row) =>
        row.check_in_time && row.checkout_time
          ? `${new Date(row.check_in_time).toLocaleTimeString()} / ${new Date(row.checkout_time).toLocaleTimeString()}`
          : "-",
    },
    {
      key: "followup_type",
      render: (row) =>
        row.followup_type ? (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold
            ${row.followup_type === "CALL" && "bg-blue-100 text-blue-700"}
            ${row.followup_type === "MEETING" && "bg-green-100 text-green-700"}
            ${row.followup_type === "VISIT" && "bg-purple-100 text-purple-700"}`}>
            {row.followup_type}
          </span>
        ) : "-",
    },
    {
      key: "notes",
      render: (row) =>
        row.notes ? (
          <div className="relative inline-block group">
            <span className="cursor-pointer text-blue-600 text-lg">📝</span>
            <div className="absolute z-50 hidden group-hover:block bg-black text-white text-xs rounded px-3 py-2 top-full -mt-8 left-1/2 -translate-x-1/2 w-48 text-left break-words shadow-xl">
              {row.notes}
            </div>
          </div>
        ) : "-",
    },
  ];

  /* 🔥 EDIT HANDLER */
const handleEdit = (r) => {
  const emp = employees.find(e =>
    `${e.first_name} ${e.last_name}`.trim() === r.employee_name?.trim()
  );

  setSelectedVisit({
    ...r,
    employee_id: emp?.id,
    lead_type: r.lead_type,   // ⭐ IMPORTANT
  });

  setMode("form");
};


  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Visits" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
        </div>

        <Table
          header={
            <TableHeader
              columns={[
                "Employee Name",
                "Lead Type", // FIXED
                "Check-In / Check-Out",
                "Followup Type",
                "Notes",
                "Action",
              ]}
            />
          }
        >
          {visits.map((v, index) => (
            <EntityTableRow
              key={v.id}
              row={v}
              index={index}
              columns={visitColumns}
              onView={(r) => { setSelectedVisit(r); setMode("view"); }}
              onEdit={handleEdit}
              onDelete={(id) => VisitsAPI.delete(id).then(fetchData)}
            />
          ))}
        </Table>
      </PageContainer>
    );
  }

  if (mode === "view" && selectedVisit) {
    return (
      <EntityPageLayout title="Visit Details" showBack onBack={() => setMode("list")}>
<EntityViewCard
  title="Visit Details"
  data={selectedVisit}
  fields={visitFields}
  api={VisitsAPI}
  headerKeys={["visit_date"]}
  onUpdated={fetchData}
  onDeleted={fetchData}
/>
      </EntityPageLayout>
    );
  }

  /* 🔥 UNIQUE LEAD TYPES */


  return (
    <EntityPageLayout title="Visit Details" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedVisit ? "Edit Visit" : "Create Visit"}
        selectedItem={selectedVisit}
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          {
            label: "Employee",
            name: "employee_id",
            type: "select",
            options: employees.map(e => ({
              label: `${e.first_name} ${e.last_name}`,
              value: e.id,
            })),
          },
          // {
          //   label: "Lead Type",
          //   name: "lead_id",
          //   type: "select",
          //   options: uniqueLeadTypes, // FIXED UNIQUE
          // },
// {
//   label: "Lead Type",
//   name: "lead_type",   // correct
//   type: "select",
//   options: [
//     { label: "Distributor", value: "Distributor" },
//     { label: "Direct", value: "Direct" },
//     { label: "Retailer", value: "Retailer" },
//   ],
//   required: true,
// },



          { label: "Address", name: "address",required: true,  },
          { label: "Location", name: "location" },
          { label: "Visit Purpose", name: "visit_purpose",required: true  },
          { label: "Visit Date", name: "visit_date", type: "datetime-local",required: true, },
          { label: "Check In Time", name: "check_in_time", type: "datetime-local" },
          { label: "Checkout Time", name: "checkout_time", type: "datetime-local" },
          { label: "Followup Date", name: "followup_date", type: "datetime-local" },
          {
            label: "Followup Type",
            name: "followup_type",
            type: "select",
            options: [
              { label: "CALL", value: "CALL" },
              { label: "MEETING", value: "MEETING" },
              { label: "VISIT", value: "VISIT" },
            ],
          },
          { label: "Contact Person", name: "contact_person" },
          { label: "Notes", name: "notes", type: "textarea",required: true, },
          { label: "Order Information", name: "order_information", type: "textarea" },
          { label: "Payment Details", name: "payment_details", type: "textarea" },
          { label: "Order Name", name: "order_name" },
          { label: "Payment Image", name: "payment_image", type: "file" },
          { label: "Visit Image", name: "images", type: "file" },
        ]}
      />
    </EntityPageLayout>
  );
}
