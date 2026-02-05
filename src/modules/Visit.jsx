import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import VisitsViewCard from "../components/view/VisitViewCard";
import EntityTableRow from "../components/table/EntityTableRow";

import { VisitsAPI, EmployeeAPI, LeadsAPI } from "../services/apiService";

export default function Visits() {
  const [visits, setVisits] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [leads, setLeads] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedVisit, setSelectedVisit] = useState(null);

  const fetchData = async () => {
    const [v, e, l] = await Promise.all([
      VisitsAPI.getAll(),
      EmployeeAPI.getAll(),
      LeadsAPI.getAll(),
    ]);

    setVisits(v.data.data || []);
    setEmployees(e.data.data || []);
    setLeads(l.data.data || []);
  };

  useEffect(() => { fetchData(); }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      const value = data[key];

      if (value instanceof FileList) {
        if (value.length > 0) formData.append(key, value[0]);
      } else if (value !== "" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    try {
      if (selectedVisit) {
        await VisitsAPI.update(selectedVisit.id, formData);
      } else {
        await VisitsAPI.create(formData);
      }

      setMode("list");
      fetchData();
    } catch (err) {
      console.log("Save failed", err.response?.data);
    }
  };

  /* 🔥 TABLE COLUMN CONFIG */
  const visitColumns = [
    { key: "employee_id" },
    { key: "lead_id" },
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
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
              ${row.followup_type === "CALL" && "bg-blue-100 text-blue-700"}
              ${row.followup_type === "MEETING" && "bg-green-100 text-green-700"}
              ${row.followup_type === "VISIT" && "bg-purple-100 text-purple-700"}
            `}
          >
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
            <div className="absolute z-50 hidden group-hover:block bg-black text-white text-xs rounded px-3 py-2 top-full -mt-8 left-1/2 -translate-x-1/2 w-56 text-left break-words shadow-xl">
              {row.notes}
            </div>
          </div>
        ) : "-",
    },
  ];

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
                "Employee ID",
                "Lead ID",
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
              onView={(r) => {
                setSelectedVisit(r);
                setMode("view");
              }}
              onEdit={(r) => {
                setSelectedVisit(r);
                setMode("form");
              }}
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
        <VisitsViewCard visit={selectedVisit} />
      </EntityPageLayout>
    );
  }

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
{
  label: "Lead",
  name: "lead_id",
  type: "select",
  options: leads.map(l => ({
    label: l.business_name,
    value: l.id,
  })),
},
          { label: "Address", name: "address" },
          { label: "Location", name: "location" },
          { label: "Visit Purpose", name: "visit_purpose" },
          { label: "Visit Date", name: "visit_date", type: "datetime-local" },
          { label: "Check In Time", name: "check_in_time", type: "datetime-local" },
          { label: "Checkout Time", name: "checkout_time", type: "datetime-local" },
          // { label: "Total Hours", name: "total_hr" },
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
          { label: "Notes", name: "notes", type: "textarea" },
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
