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
import { parseBackendErrors, parseBackendResponse } from "../utils/parseBackendErrors";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function LeaveBalance({ employeeFilterId, asSubcomponent }) {
  const { setError, setSuccess } = useOutletContext();
  const { employeeId, isHR } = useUser();


  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [mode, setMode] = useState("list");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true); // 🔥 START 

    try {
      const res = await LeaveBalanceAPI.getAll();
      let list = res.data?.data || [];

      // 🔒 NON-HR → only own leave balance
      if (!isHR) {
        list = list.filter(
          item => Number(item.employee_id) === Number(employeeId)
        );
      }
      if (employeeFilterId) {
        list = list.filter(
          item => Number(item.employee_id) === Number(employeeFilterId)
        );
      }

      setData(list);
    } catch (err) {
      setError(parseBackendErrors(err));
    } finally {
      setLoading(false); // 🔥 END 
    }
  };
  const fetchEmployees = async () => {
    try {
const res = await EmployeeAPI.getAll();
      setEmployees(res.data?.data || []);
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };
  useEffect(() => {
    fetchData();
    fetchEmployees();
  }, [employeeId, isHR]);

  //   const onSubmit = async (form) => {
  //     const used = Number(form.used_days || 0);

  //     // const payload = {
  //     //   leave_type: form.leave_type,
  //     //   employee_id: Number(form.employee_id),
  //     //   total_allocated: total,
  //     //   used_days: used,
  //     //   remaining_days: total - used,   // 🔥 MISSING FIELD FIX
  //     // };
  // const payload = {
  //   leave_type: form.leave_type,
  //   employee_id: Number(form.employee_id),

  //   cl: Number(form.cl ?? 0),
  //   sl: Number(form.sl ?? 0),
  //   pl: Number(form.pl ?? 0),
  //   ul: Number(form.ul ?? 0),
  //   compensatory_off: Number(form.compensatory_off ?? 0),
  //   public_holiday: Number(form.public_holiday ?? 0),
  //   maternity_leave: Number(form.maternity_leave ?? 0),
  //   paternity_leave: Number(form.paternity_leave ?? 0),

  //   total_allocated: total,
  //   used_days: used,
  // };
  //     try {
  //       if (selected) {
  //         const res = await LeaveBalanceAPI.update(selected.id, payload);
  //         setSuccess(res.data?.message || "Saved successfully");
  //       } else {
  //         const res = await LeaveBalanceAPI.create(payload);
  //         setSuccess(res.data?.message || "Saved successfully");
  //       }

  //       setMode("list");
  //       fetchData();

  //     } catch (err) {
  //       setError(parseBackendErrors(err));
  //       console.log("API ERROR:", err.response?.data);
  //     }
  //   };
  const onSubmit = async (form) => {
    const payload = {
      // leave_type: form.leave_type,
      employee_id: Number(form.employee_id),

      cl: Number(form.cl ?? 0),
      sl: Number(form.sl ?? 0),
      pl: Number(form.pl ?? 0),
      ul: Number(form.ul ?? 0),
      compensatory_off: Number(form.compensatory_off ?? 0),
      public_holiday: Number(form.public_holiday ?? 0),
      maternity_leave: Number(form.maternity_leave ?? 0),
      paternity_leave: Number(form.paternity_leave ?? 0),

      used_days: Number(form.used_days ?? 0),
    };

    console.log("FINAL PAYLOAD:", payload); // debug

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

    return `${empName}  ${item.total_allocated} ${item.used_days}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });
  const leaveColumns = [
    ...(isHR ? [{
      key: "employee_id",
      render: (row) => {
        const emp = employees.find(e => e.id === row.employee_id);
        return emp
          ? `${emp.first_name} ${emp.last_name}`
          : "—";
      },
    }] : []),
    // { key: "leave_type" },
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
    // { key: "leave_type", label: "Leave Type" },
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

  // ================= LIST =================
  if (mode === "list") {
    const listContent = (
      <>
        {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
          <SectionTitle title="LEAVE BALANCE" />

          <div className="flex flex-wrap gap-3 self-end ml-auto mb-2">
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
        </div> */}
        <div className="flex flex-col gap-4 mb-4 w-full">

          {/* ROW 1: Title + Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-3">

            {!asSubcomponent && <SectionTitle title="LEAVE BALANCE" />}

            <div className="w-full sm:w-auto sm:ml-auto">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search leave balance..."
              />
            </div>

          </div>

          {/* ROW 2: Add Button */}
          <div className="flex justify-end w-full">
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
        <Table header={<TableHeader columns={[...(isHR ? ["Employee"] : []), "Allocated", "Used", "Remaining", "Action"]} />}>
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
        {loading && <LoadingSpinner text="Loading Leave Balance Details..." />}

      </>
    );

    if (asSubcomponent) {
      return <div className="w-full bg-white rounded-lg p-5 shadow-sm">{listContent}</div>;
    }

    return <PageContainer>{listContent}</PageContainer>;
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
        // fields={[
        //   {
        //     label: "Leave Type",
        //     name: "leave_type",
        //     type: "select",
        //     required: true,
        //     options: [
        //       { label: "Casual Leave", value: "casual leave" },
        //       { label: "Sick Leave", value: "sick leave" },
        //       { label: "Paid Leave", value: "paid leave" },
        //       { label: "Unpaid Leave", value: "unpaid leave" },
        //     ]

        //     ,
        //   },
        //   { label: "Total Allocated", name: "total_allocated", type: "number",required: true },
        //   { label: "Used Days", name: "used_days", type: "number",required: true },
        //   {
        //     label: "Employee",
        //     name: "employee_id",
        //     type: "select",
        //     options: employees.map(e => ({
        //       label: `${e.first_name} ${e.last_name}`,
        //       value: e.id,
        //     })),
        //     disabled: !!employeeFilterId,
        //     defaultValue: employeeFilterId || "",
        //   },
        // ]}
        fields={[



          // 🔥 ADD THESE
          {
            label: "Employee",
            name: "employee_id",
            type: "select",
            options: employees.map(e => ({
              label: `${e.first_name} ${e.last_name}`,
              value: e.id,
            })),
            disabled: !!employeeFilterId,
            defaultValue: employeeFilterId || "",
          },
          { label: "CL", name: "cl", type: "number", defaultValue: 0 },
          { label: "SL", name: "sl", type: "number", defaultValue: 0 },
          { label: "PL", name: "pl", type: "number", defaultValue: 0 },
          { label: "UL", name: "ul", type: "number", defaultValue: 0 },
          { label: "Comp Off", name: "compensatory_off", type: "number", defaultValue: 0 },
          { label: "Public Holiday", name: "public_holiday", type: "number", defaultValue: 0 },
          { label: "Maternity Leave", name: "maternity_leave", type: "number", defaultValue: 0 },
          { label: "Paternity Leave", name: "paternity_leave", type: "number", defaultValue: 0 },


        ]}
      />
    </EntityPageLayout>
  );
}
