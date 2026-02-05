import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import EntityTableRow from "../components/table/EntityTableRow";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import HolidayViewCard from "../components/view/HolidayViewCard";
import { HolidayAPI } from "../services/apiService";

export default function Holiday() {
  const [holidays, setHolidays] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  // FETCH HOLIDAYS
  const fetchHolidays = async () => {
    const res = await HolidayAPI.getAll();
    setHolidays(res.data?.data || []);
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
        await HolidayAPI.update(selectedHoliday.id, payload);
      } else {
        await HolidayAPI.create(payload);
      }

      setMode("list");
      fetchHolidays();
    } catch (error) {
      console.error("Holiday Save Error:", error.response?.data);
    }
  };
const holidayColumns = [
  { key: "holiday_name" },
  { key: "holiday_date" },
  { key: "holiday_type" },
  {
    key: "is_paid",
    render: (row) => (
      <span className={row.is_paid ? "text-green-600" : "text-red-500"}>
        {row.is_paid ? "Paid" : "Unpaid"}
      </span>
    ),
  },
  { key: "description" },
];

  // LIST VIEW
  if (mode === "list") {
    return (
      <PageContainer>
        {/* 🔥 HEADER SECTION (YOU ASKED THIS) */}
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="HOLIDAYS" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
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
    onDelete={(id) => HolidayAPI.delete(id).then(fetchHolidays)}
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
        <HolidayViewCard holiday={selectedHoliday} />
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
