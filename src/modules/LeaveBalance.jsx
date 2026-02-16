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
import { LeaveBalanceAPI } from "../services";
import api from "../services/api";
import { themes } from "../config/theme.config";

export default function LeaveBalance() {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    const res = await LeaveBalanceAPI.getAll();
    setData(res.data?.data || []);
  };

  const fetchEmployees = async () => {
    const res = await api.get("employee/");
    setEmployees(res.data?.data || []);
  };

  useEffect(() => {
    fetchData();
    fetchEmployees();
  }, []);

  const onSubmit = async (form) => {
    const total = Number(form.total_allocated || 0);
    const used = Number(form.used_days || 0);

    const payload = {
      leave_type: form.leave_type,
      employee_id: Number(form.employee_id),
      total_allocated: total,
      used_days: used,
      remaining_days: total - used,   // 🔥 MISSING FIELD FIX
    };

    try {
      selected
        ? await LeaveBalanceAPI.update(selected.id, payload)
        : await LeaveBalanceAPI.create(payload);

      setMode("list");
      fetchData();

    } catch (err) {
      console.log("API ERROR:", err.response?.data);

      const res = err.response?.data;
      if (!res) return alert("Network error");

      const message = Object.entries(res)
        .map(([f, e]) => `${f.replaceAll("_", " ")}: ${Array.isArray(e) ? e.join(", ") : e}`)
        .join("\n");

      alert(message);
    }
  };


  const leaveColumns = [
    { key: "leave_type" },
    { key: "total_allocated" },
    { key: "used_days" },
    {
      key: "remaining_days",
      render: (row) => (
        <span className="font-medium " style={{ color: themes.cardEmployee }}
>
          {row.remaining_days}
        </span>
      ),
    },
  ];
  // 🔥 VIEW FIELDS
  const leaveFields = [
    { key: "leave_type", label: "Leave Type" },
    { key: "total_allocated", label: "Total Allocated Days" },
    { key: "used_days", label: "Used Days" },
    {
      key: "remaining_days",
      label: "Remaining Days",
      format: (v) => `${v} days`,
    },
    {
      key: "employee_id",
      label: "Employee",
      format: (id) => {
        const emp = employees.find(e => e.id === id);
        return emp ? `${emp.first_name} ${emp.last_name}` : "—";
      },
    },
  ];

  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="LEAVE BALANCE" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
        </div>

        <Table header={<TableHeader columns={["Leave Type", "Allocated", "Used", "Remaining", "Action"]} />}>
          {data.map((l, index) => (
            <EntityTableRow
              key={l.id}
              row={l}
              index={index}
              columns={leaveColumns}
              onView={(r) => {
                setSelected(r);
                setMode("view");
              }}
              onEdit={(r) => {
                setSelected(r);
                setMode("form");
              }}
              onDelete={(id) => LeaveBalanceAPI.delete(id).then(fetchData)}
            />
          ))}

        </Table>
      </PageContainer>
    );
  }

  if (mode === "view") {
    return (
      <EntityPageLayout title="Leave Balance Details" showBack onBack={() => setMode("list")}>
        <EntityViewCard
          title="Leave Balance Details"
          data={selected}
          fields={leaveFields}
          api={LeaveBalanceAPI}
          headerKeys={["leave_type"]}
          onUpdated={fetchData}
          onDeleted={fetchData}
        />
      </EntityPageLayout>
    );
  }

  return (
    <EntityPageLayout title="Leave Balance Form" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selected ? "Edit Leave Balance" : "Create Leave Balance"}
        selectedItem={selected}
        onSubmit={onSubmit}
        setMode={setMode}
        fields={[
          {
            label: "Leave Type",
            name: "leave_type",
            type: "select",
            required: true,
            options: [
              { label: "Casual Leave", value: "casual leave" },
              { label: "Sick Leave", value: "sick leave" },
              { label: "Paid Leave", value: "paid leave" },
              { label: "Unpaid Leave", value: "unpaid leave" },
            ]

            ,
          },
          { label: "Total Allocated", name: "total_allocated", type: "number",required: true },
          { label: "Used Days", name: "used_days", type: "number",required: true },
          {
            label: "Employee",
            name: "employee_id",
            type: "select",
            options: employees.map(e => ({
              label: `${e.first_name} ${e.last_name}`,
              value: e.id,
            })),
          },
        ]}
      />
    </EntityPageLayout>
  );
}
