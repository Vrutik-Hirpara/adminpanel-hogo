

import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import EntityTableRow from "../components/table/EntityTableRow";
import SearchBar from "../components/table/SearchBar";

import { formatDate } from "../utils/dateFormatter";

import { EmployeeAPI, BranchAPI, DepartmentAPI, RolesAPI } from "../services";
import api from "../services/api";

import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
// import EmployeeViewCard from "../components/view/EmployeeViewCard";
import EntityViewCard from "../components/view/EntityViewCard";

import axios from "axios";

// const DEPT_API = "https://hogofilm.pythonanywhere.com/departments/";
// const ROLE_API = "https://hogofilm.pythonanywhere.com/roles/";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState([]);


  // FETCH EMPLOYEES
  const fetchEmployees = async () => {
    const res = await EmployeeAPI.getAll();
    const data = res.data?.data || [];

    const formatted = data.map(e => ({
      id: e.id,
      employee_code: e.employee_code,
      first_name: e.first_name,
      last_name: e.last_name,
      date_of_birth: e.date_of_birth,
      email: e.email,
      phone: e.phone,
      role_name: e.role_name || e.role?.name || "-",
      office_branch_name: e.office_branch_name || e.branch?.name || "-",

      joining_date: e.joining_date,
      employment_type: e.employment_type,
      status: e.status === "Active",
      raw: e,
    }));

    setEmployees(formatted);
  };

  // FETCH DEPARTMENTS & ROLES
  // const fetchMeta = async () => {
  //   const deptRes = await axios.get(DEPT_API);
  //   const roleRes = await axios.get(ROLE_API);
  //   const branchRes = await BranchAPI.getAll();  // ⭐ CORRECT API NAME


  //   setDepartments(deptRes.data.data || []);
  //   setRoles(roleRes.data.data || []);
  //   setBranches(branchRes.data.data || []);

  // };
  const fetchMeta = async () => {
    const deptRes = await DepartmentAPI.getAll();
    const roleRes = await RolesAPI.getAll();
    const branchRes = await BranchAPI.getAll();

    setDepartments(deptRes.data?.data || []);
    setRoles(roleRes.data?.data || []);
    setBranches(branchRes.data?.data || []);
  };

  useEffect(() => {
    fetchEmployees();
    fetchMeta();
  }, []);
  const filteredEmployees = employees.filter(emp =>
    `${emp.employee_code} ${emp.first_name} ${emp.last_name} ${emp.email} ${emp.phone} ${emp.role_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  // STATUS TOGGLE
  const handleStatusToggle = async (emp) => {
    const newStatus = !emp.status;

    setEmployees(prev =>
      prev.map(e =>
        e.id === emp.id
          ? { ...e, status: newStatus, raw: { ...e.raw, status: newStatus ? "Active" : "Inactive" } }
          : e
      )
    );

    try {
      await EmployeeAPI.update(emp.id, { status: newStatus ? "Active" : "Inactive" });
    } catch {
      fetchEmployees();
    }
  };

  // CREATE / UPDATE
  const onSubmit = async (data, methods) => {
    try {
      const payload = {
        ...data,
        department_id: Number(data.department_id),
        role_id: Number(data.role_id),
        office_branch_id: data.office_branch_id
          ? Number(data.office_branch_id)
          : null,
        status: data.status,
      };

      if (selectedEmployee) {
        delete payload.password;
        await EmployeeAPI.update(selectedEmployee.id, payload);
      } else {
        await EmployeeAPI.create(payload);
      }

      setMode("list");
      fetchEmployees();
    }catch (error) {
  console.log("SERVER ERROR:", error.response?.data);

  const serverData = error.response?.data;

  if (serverData?.email) {
    methods.setError("email", {
      type: "manual",
      message: serverData.email[0] || "This email id already exists",
    });
  } else if (serverData?.detail) {
    methods.setError("email", {
      type: "manual",
      message: serverData.detail,
    });
  } else {
    methods.setError("email", {
      type: "manual",
      message: "This email id already exists",
    });
  }
}


  }
  const employeeColumns = [
    { key: "employee_code" },
    { key: "office_branch_name" },   // ⭐ HERE

    {
      key: "name",
      render: (row) => `${row.first_name} ${row.last_name}`,
    },

    {
      key: "date_of_birth",
      render: (row) => formatDate(row.date_of_birth),
    },

    { key: "phone" },
    { key: "role_name" },
    {
      key: "status",
      render: (row) => (
        <button
          onClick={() => handleStatusToggle(row)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500 ${row.status ? "bg-green-500" : "bg-gray-400"
            }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-all duration-500 ${row.status ? "translate-x-6" : "translate-x-1"
              }`}
          />
        </button>
      ),
    },
  ];
  const employeeFields = [
    { key: "employee_code", label: "Employee Code" },
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "gender", label: "Gender" },
    { key: "date_of_birth", label: "Date of Birth" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "office_branch_name", label: "Office Branch " },
    { key: "department_name", label: "Department Name" },
    { key: "role_name", label: "Role Name" },
    { key: "joining_date", label: "Joining Date" },
    { key: "employment_type", label: "Employee Type" },

    { key: "status", label: "Status" }
  ];


  // LIST
  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Employees" />

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <ActionButtons
              showAdd
              addText="+ Add"
              onAdd={() => setMode("form")}
            />
          </div>
        </div>

        {/* <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Employees" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
        </div>
        <div className="flex justify-between items-center mb-4">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div> */}

        <Table header={<TableHeader columns={["Code", "Branch", "Name", "DOB", "Phone", "Role", "Status", "Action"]} />}>
          {filteredEmployees.map((emp, index) => (
            <EntityTableRow
              key={emp.id}
              row={emp}
              index={index}
              columns={employeeColumns}
              onView={(r) => { setSelectedEmployee(r.raw); setMode("view"); }}
              onEdit={(r) => {
                const dept = departments.find(d => d.name === r.raw.department_name);
                const role = roles.find(r2 => r2.name === r.raw.role_name);

                setSelectedEmployee({
                  ...r.raw,
                  department_id: dept?.id,
                  role_id: role?.id,
                  office_branch_id: r.raw.office_branch_id || "", // ⭐ ADD

                });

                setMode("form");
              }}
              onDelete={(id) => EmployeeAPI.delete(id).then(fetchEmployees)}
            />
          ))}

        </Table>
      </PageContainer>
    );
  }

  // // VIEW
  // if (mode === "view" && selectedEmployee) {
  //   return (
  //     <EntityPageLayout title="Employee Details" showBack onBack={() => setMode("list")}>
  //       <EntityViewCard employee={selectedEmployee} />
  //     </EntityPageLayout>
  //   );
  // }
  if (mode === "view" && selectedEmployee) {
    return (
      <EntityPageLayout
        title="Employee Details"
        showBack
        onBack={() => setMode("list")}
      >
        <EntityViewCard
          title="Employee"
          data={selectedEmployee}        // ✅ correct prop
          fields={employeeFields}       // ✅ required
          api={EmployeeAPI}             // ✅ for edit/delete
          onUpdated={fetchEmployees}
          onDeleted={fetchEmployees}
          headerKeys={["employee_code", "first_name", "last_name"]}   // ⭐ ADD THIS

        />
      </EntityPageLayout>
    );
  }

  // FORM
  return (
    <EntityPageLayout title="Employee Details" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedEmployee ? "Edit Employee" : "Create Employee"}
        selectedItem={
          selectedEmployee
            ? {
              ...selectedEmployee,
              status:
                selectedEmployee.status === true ||
                  selectedEmployee.status === "Active"
                  ? "Active"
                  : "Inactive",
            }
            : null
        }

        onSubmit={onSubmit}
        setMode={setMode}
        //         fields={[
        //   { label: "Employee Code", name: "employee_code", required: true },
        //   { label: "First Name", name: "first_name", required: true },
        //   { label: "Last Name", name: "last_name", required: true },

        //   {
        //     label: "Gender",
        //     name: "gender",
        //     type: "select",
        //     required: true,
        //     options: [
        //       { label: "Male", value: "Male" },
        //       { label: "Female", value: "Female" }
        //     ]
        //   },

        //   {
        //     label: "Office Branch",
        //     name: "office_branch_id",
        //     type: "select",
        //     options: branches.map(b => ({
        //       label: b.name,
        //       value: b.id,
        //     })),
        //   },

        //   { label: "Date of Birth", name: "date_of_birth", type: "date", required: true },
        //   { label: "Email", name: "email", type: "email", required: true },
        //   { label: "Phone", name: "phone", required: true },
        //   { label: "Joining Date", name: "joining_date", type: "date", required: true },

        //   {
        //     label: "Department",
        //     name: "department_id",
        //     type: "select",
        //     required: true,
        //     options: departments.map(d => ({ label: d.name, value: d.id }))
        //   },

        //   {
        //     label: "Role",
        //     name: "role_id",
        //     type: "select",
        //     required: true,
        //     options: roles.map(r => ({ label: r.name, value: r.id }))
        //   },

        //   {
        //     label: "Employment Type",
        //     name: "employment_type",
        //     type: "select",
        //     required: true,
        //     options: [
        //       { label: "Permanent", value: "Permanent" },
        //       { label: "Contract", value: "Contract" },
        //       { label: "Intern", value: "Intern" }
        //     ]
        //   },

        //   {
        //     label: "Status",
        //     name: "status",
        //     type: "select",
        //     required: true,
        //     options: [
        //       { label: "Active", value: "Active" },
        //       { label: "Inactive", value: "Inactive" }
        //     ]
        //   },

        //   ...(selectedEmployee ? [] : [
        //     { label: "Password", name: "password", type: "password", required: true }
        //   ]),
        // ]}

        fields={[
          { label: "Employee Code", name: "employee_code", required: true },

          { label: "First Name", name: "first_name", required: true },

          { label: "Last Name", name: "last_name", required: true },

          {
            label: "Gender",
            name: "gender",
            type: "select",
            required: true,
            options: [
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" }
            ]
          },

          {
            label: "Office Branch",
            name: "office_branch_id",
            type: "select",
            options: branches.map(b => ({
              label: b.name,
              value: b.id,
            })),
          },

          {
            label: "Date of Birth",
            name: "date_of_birth",
            type: "date",
            required: true
          },

          { label: "Email", name: "email", type: "email", required: true },

          { label: "Phone", name: "phone", required: true },

          {
            label: "Joining Date",
            name: "joining_date",
            type: "date",
            required: true
          },

          {
            label: "Department",
            name: "department_id",
            type: "select",
            required: true,
            options: departments.map(d => ({ label: d.name, value: d.id }))
          },

          {
            label: "Role",
            name: "role_id",
            type: "select",
            required: true,
            options: roles.map(r => ({ label: r.name, value: r.id }))
          },

          {
            label: "Employment Type",
            name: "employment_type",
            type: "select",
            required: true,
            options: [
              { label: "Permanent", value: "Permanent" },
              { label: "Contract", value: "Contract" },
              { label: "Intern", value: "Intern" }
            ]
          },

          {
            label: "Status",
            name: "status",
            type: "select",
            required: true,
            options: [
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" }
            ]
          },

          ...(selectedEmployee
            ? []
            : [{ label: "Password", name: "password", type: "password", required: true }]),
        ]}


      />
    </EntityPageLayout>
  );
}
