import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import EntityTableRow from "../components/table/EntityTableRow";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import LeaveBalanceViewCard from "../components/view/LeaveBalanceViewCard";
import { LeaveBalanceAPI } from "../services/apiService";
import api from "../services/api";

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
    const payload = {
      ...form,
      employee_id: Number(form.employee_id),
    };

    if (selected) await LeaveBalanceAPI.update(selected.id, payload);
    else await LeaveBalanceAPI.create(payload);

    setMode("list");
    fetchData();
  };
  const leaveColumns = [
    { key: "leave_type" },
    { key: "total_allocated" },
    { key: "used_days" },
    {
      key: "remaining_days",
      render: (row) => (
        <span className="font-medium text-blue-600">
          {row.remaining_days}
        </span>
      ),
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
              onDelete={(id) => LeaveBalanceAPI.delete(id).then(fetchLeaveBalances)}
            />
          ))}

        </Table>
      </PageContainer>
    );
  }

  if (mode === "view") {
    return (
      <EntityPageLayout title="Leave Balance Details" showBack onBack={() => setMode("list")}>
        <LeaveBalanceViewCard data={selected} />
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
            ],
          },
          { label: "Total Allocated", name: "total_allocated", type: "number" },
          { label: "Used Days", name: "used_days", type: "number" },
          {
            label: "Employee",
            name: "employee_id",
            type: "select",
            options: employees.map(e => ({
              label: e.first_name,
              value: e.id,
            })),
          },
        ]}
      />
    </EntityPageLayout>
  );
}
