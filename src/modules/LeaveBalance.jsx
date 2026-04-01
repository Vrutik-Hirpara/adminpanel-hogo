import { useUser } from "../hooks/useUser";
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
import SearchBar from "../components/table/SearchBar";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors } from "../utils/parseBackendErrors";

export default function LeaveBalance() {
  const { setError, setSuccess } = useOutletContext();
  const { employeeId, isHR } = useUser();
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [mode, setMode] = useState("list");
  const [selected, setSelected] = useState(null);
const [search, setSearch] = useState("");
const fetchData = async () => {
  try {
    const res = await LeaveBalanceAPI.getAll();
    let list = res.data?.data || [];

    // 🔒 NON-HR → only own leave balance
    if (!isHR) {
      list = list.filter(
        item => Number(item.employee_id) === Number(employeeId)
      );
    }

    setData(list);
  } catch (err) {
    setError(parseBackendErrors(err));
  }
};

  const fetchEmployees = async () => {
    try {
      const res = await api.get("employee/");
      setEmployees(res.data?.data || []);
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };

useEffect(() => {
  fetchData();
  fetchEmployees();
}, [employeeId, isHR]);

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
      if (selected) {
        const res = await LeaveBalanceAPI.update(selected.id, payload);
        setSuccess(res.data?.message || "Saved successfully");
      } else {
        const res = await LeaveBalanceAPI.create(payload);
        setSuccess(res.data?.message || "Saved successfully");
      }

      setMode("list");
      fetchData();

    } catch (err) {
      setError(parseBackendErrors(err));
      console.log("API ERROR:", err.response?.data);
    }
  };

const filteredData = data.filter(item => {
  const emp = employees.find(e => e.id === item.employee_id);
  const empName = emp ? `${emp.first_name} ${emp.last_name}` : "";

  return `${empName} ${item.leave_type} ${item.total_allocated} ${item.used_days}`
    .toLowerCase()
    .includes(search.toLowerCase());
});
  const leaveColumns = [
      {
    key: "employee_id",
    render: (row) => {
      const emp = employees.find(e => e.id === row.employee_id);
      return emp
        ? `${emp.first_name} ${emp.last_name}`
        : "—";
    },
  },
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
  <SectionTitle title="LEAVE BALANCE" />

  <div className="flex flex-wrap gap-3 self-end">
    <SearchBar
      value={search}
      onChange={setSearch}
      placeholder="Search leave balance..."
    />

    {isHR && (
      <ActionButtons
        showAdd
        addText="+ Add"
        onAdd={() => {
          setSelected(null);
          setMode("form");
        }}
      />
    )}
  </div>
</div>

        <Table header={<TableHeader columns={["Employee","Leave Type", "Allocated", "Used", "Remaining", "Action"]} />}>
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
              onDelete={async (id) => {
                try {
                  const res = await LeaveBalanceAPI.delete(id);
                  setSuccess(res.data?.message || "Deleted successfully");
                  fetchData();
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
