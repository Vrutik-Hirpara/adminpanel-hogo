import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import EntityTableRow from "../components/table/EntityTableRow";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import EntityViewCard from "../components/view/EntityViewCard";
import { HolidayAPI } from "../services";
import { formatDate } from "../utils/dateFormatter";
import { themes } from "../config/theme.config";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors } from "../utils/parseBackendErrors";

export default function Holiday() {
  const { setError, setSuccess } = useOutletContext();
  const [holidays, setHolidays] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  // FETCH HOLIDAYS
  const fetchHolidays = async () => {
    try {
      const res = await HolidayAPI.getAll();
      setHolidays(res.data?.data || []);
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  // SUBMIT (CREATE / UPDATE)
  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        is_paid: Boolean(data.is_paid),
      };

      if (selectedHoliday) {
        const res = await HolidayAPI.update(selectedHoliday.id, payload);
        setSuccess(res.data?.message || "Saved successfully");
      } else {
        const res = await HolidayAPI.create(payload);
        setSuccess(res.data?.message || "Saved successfully");
      }

      setMode("list");
      fetchHolidays();
    } catch (error) {
      setError(parseBackendErrors(error));
      console.error("Holiday Save Error:", error.response?.data);
    }
  };
const holidayColumns = [
  { key: "holiday_name" },
{
  key: "holiday_date",
  render: (row) => formatDate(row.holiday_date),
},
  { key: "holiday_type" },
  {
    key: "is_paid",
    render: (row) => (
      // <span className={row.is_paid ? themes.success : themes.danger}>
      <span
  style={{ color: row.is_paid ? themes.success : themes.danger }}
>

        {row.is_paid ? "Paid" : "Unpaid"}
      </span>
    ),
  },
  { key: "description" },
];
// 🔥 VIEW FIELDS
// const holidayFields = [
//   { key: "holiday_name", label: "Holiday Name" },
//   { key: "holiday_date", label: "Holiday Date" },
//   { key: "holiday_type", label: "Holiday Type" },
//   {
//     key: "is_paid",
//     label: "Paid Status",
//     format: (v) => (v ? "Paid Holiday" : "Unpaid Holiday"),
//   },
//   { key: "description", label: "Description", emptyLabel: "No description" },
// ];
const holidayFields = [
  { key: "holiday_name", label: "Holiday Name" },
  { key: "holiday_date", label: "Holiday Date", format: formatDate },
  { key: "holiday_type", label: "Holiday Type" },
  {
    key: "is_paid",
    label: "Paid Status",
    format: (v) => (v ? "Paid Holiday" : "Unpaid Holiday"),
  },
  { key: "description", label: "Description", emptyLabel: "No description" },
];

  // LIST VIEW
  if (mode === "list") {
    return (
      <PageContainer>
        {/* 🔥 HEADER SECTION (YOU ASKED THIS) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
          <SectionTitle title="HOLIDAYS" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => {
  setSelectedHoliday(null);   // ⭐ RESET
  setMode("form");}} />
        </div>

        <Table
          header={
            <TableHeader
              columns={[  "Name", "Date", "Type", "Paid", "Description", "Action"]}
            />
          }
        >
   {holidays.map((h, index) => (
  <EntityTableRow
    key={h.id}
    row={h}
    index={index}
    columns={holidayColumns}
    onView={(r) => {
      setSelectedHoliday(r);
      setMode("view");
    }}
    onEdit={(r) => {
      setSelectedHoliday(r);
      setMode("form");
    }}
    onDelete={async (id) => {
      try {
        const res = await HolidayAPI.delete(id);
        setSuccess(res.data?.message || "Deleted successfully");
        fetchHolidays();
      } catch (err) {
        setError(parseBackendErrors(err));
      }
    }}
  />
))}

        </Table>
      </PageContainer>
    );
  }

  // VIEW MODE
  if (mode === "view" && selectedHoliday) {
    return (
      <EntityPageLayout title="Holiday Details" showBack onBack={() => setMode("list")}>
<EntityViewCard
  title="Holiday Details"
  data={selectedHoliday}
  fields={holidayFields}
  api={HolidayAPI}
  headerKeys={["holiday_name"]}
  onUpdated={fetchHolidays}
  onDeleted={fetchHolidays}
/>
      </EntityPageLayout>
    );
  }

  // FORM MODE
  return (
    <EntityPageLayout title="Holiday Details" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedHoliday ? "Edit Holiday" : "Create Holiday"}
        selectedItem={selectedHoliday}
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          { label: "Holiday Name", name: "holiday_name", required: true },
          { label: "Holiday Date", name: "holiday_date", type: "date", required: true },
          {
            label: "Holiday Type",
            name: "holiday_type",
            type: "select",
            options: [
              { label: "National", value: "National" },
              { label: "Festival", value: "Festival" },
              { label: "Company", value: "Company" },
              { label: "Optional", value: "Optional" },
            ],
          },
          { label: "Paid Holiday", name: "is_paid", type: "checkbox" },
          { label: "Description", name: "description", type: "textarea" },
        ]}
      />
    </EntityPageLayout>
  );
}
