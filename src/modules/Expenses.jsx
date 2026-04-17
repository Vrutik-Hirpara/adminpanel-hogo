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
import api from "../services/api";
import { formatDate } from "../utils/dateFormatter";
import { themes } from "../config/theme.config";
import SearchBar from "../components/table/SearchBar";
import { ExpenseAPI, LeadsAPI, EmployeeAPI } from "../services";
import { useUser } from "../hooks/useUser";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors } from "../utils/parseBackendErrors";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Expenses() {
    const { setError, setSuccess } = useOutletContext();
    const { employeeId, isHR } = useUser();
    const [leads, setLeads] = useState([]);


    const [search, setSearch] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [mode, setMode] = useState("list");
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);    // ================= FETCH =================
    const fetchExpenses = async () => {
        try {
            let res;
            if (isHR) {
                res = await ExpenseAPI.getAll();
            } else {
                res = await ExpenseAPI.getByEmployee(employeeId);
            }
            const data = res.data?.data || [];
            const formatted = data.map(e => ({
                ...e,
                status: Boolean(e.status),
            }));
            setExpenses(formatted);
        } catch (err) {
            setError(parseBackendErrors(err));
        }
    };
    const fetchEmployees = async () => {
        try {
            const res = await EmployeeAPI.getAll();
            let empList = res.data?.data || [];
            // 🔒 NON HR → only self
            if (!isHR) {
                empList = empList.filter(emp => emp.id === employeeId);
            }
            setEmployees(empList);
        } catch (err) {
            setError(parseBackendErrors(err));
        }
    };
    const fetchLeads = async () => {
        setLoading(true); // 🔥 START 
        try {
            const res = await LeadsAPI.getAll();
            const data = res.data?.data || res.data || [];
            console.log("Fetched leads:", data); // 🔍 Debug log
            setLeads(data);
        } catch (err) {
            setError(parseBackendErrors(err));
        } finally {
            setLoading(false); // 🔥 END 
        }
    };

    useEffect(() => {
        fetchExpenses();
        fetchLeads();
        fetchEmployees();
    }, [isHR, employeeId]); // ← Add dependencies




  
    // ================= SAVE =================
    // ================= SAVE =================
    const onSubmit = async (data) => {
        data.status = data.status === "true";

        const formData = new FormData();

        Object.keys(data).forEach(key => {
            const val = data[key];
            if (val instanceof FileList) {
                if (val.length > 0) formData.append(key, val[0]);
            } else if (val !== "" && val !== null && val !== undefined) {
                formData.append(key, val);
            }
        });

        // Add employee_id for new expenses (only if not HR and creating new)
        if (!selectedItem && !isHR) {
            formData.append('employee_id', employeeId);
        }

        try {
            if (selectedItem) {
                const res = await ExpenseAPI.update(selectedItem.id, formData);
                setSuccess(res.data?.message || "Saved successfully");
            } else {
                console.log("Creating expense with data:", Object.fromEntries(formData.entries())); // 🔍 Debug log
                const res = await ExpenseAPI.create(formData);
                setSuccess(res.data?.message || "Saved successfully");
            }

            setMode("list");
            fetchExpenses();
        } catch (err) {
            setError(parseBackendErrors(err));
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await ExpenseAPI.delete(id);
            setSuccess(res.data?.message || "Deleted successfully");
            fetchExpenses();
        } catch (err) {
            setError(parseBackendErrors(err));
        }
    };
    const handleStatusToggle = async (exp) => {
        const newStatus = !exp.status;

        setExpenses(prev =>
            prev.map(e => e.id === exp.id ? { ...e, status: newStatus } : e)
        );

        try {
            const res = await ExpenseAPI.update(exp.id, { status: newStatus });
            setSuccess(res.data?.message || "Status updated successfully");
        } catch (err) {
            setError(parseBackendErrors(err));
            fetchExpenses();
        }
    };
    const filteredExpenses = expenses.filter(exp =>
        `${exp.vendor_name} ${exp.expense_type} ${exp.amount} ${exp.lead_name}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );
    // ================= TABLE COLUMNS =================
    const expenseColumns = [

        { key: "lead_name" },
        { key: "expense_type" },
        { key: "amount" },
        {
            key: "date",
            render: (row) => formatDate(row.date),
        },
        {
            key: "status",
            render: (row) => (
                <button
                    onClick={() => handleStatusToggle(row)}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500"
                    style={{
                        backgroundColor: row.status ? themes.toggleOn : themes.toggleOff,
                    }}

                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full  transition-all duration-500 ${row.status ? "translate-x-6" : "translate-x-1"
                            }`} style={{ backgroundColor: themes.textWhite }}

                    />
                </button>
            ),
        }

    ];


    const expenseFields = [

        { key: "lead_name", label: "Lead Name" },
        { key: "expense_type", label: "Expense Type" },
        { key: "amount", label: "Amount" },

        { key: "date", label: "Date", format: formatDate },

        { key: "status", label: "Status", format: v => v ? "Approved" : "Pending" },

        {
            key: "receipt_photo",
            label: "Receipt Photo",
            format: (url) =>
                url ? (
                    <img
                        src={url.startsWith("http") ? url : `${api.defaults.baseURL}${url}`}
                        alt="receipt"
                        className="w-40 rounded shadow"
                        style={{
                            border: `1px solid ${themes.borderLight}`,
                            backgroundColor: themes.surfaceLight,
                        }}
                    />

                    // <img
                    //     src={url.startsWith("http") ? url : `${api.defaults.baseURL}${url}`}
                    //     alt="receipt"
                    //     className="w-40 rounded shadow border"
                    // />
                ) : "No Image",
        }];

    // ================= LIST PAGE =================
    if (mode === "list") {
        return (
            <PageContainer>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
                    <SectionTitle title="Expenses" />

                    <div className="flex flex-wrap gap-3 self-end">
                        {/* <SearchBar
                            value={search}
                            onChange={setSearch}
                            placeholder="Search expenses..."
                        /> */}
                        {/* {(isHR) && (
                            <ActionButtons
                                showAdd
                                addText="+ Add"
                                onAdd={() => {
                                    setSelectedItem(null);
                                    setMode("form");
                                }}
                            />
                        )} */}
                        <ActionButtons
                            showAdd
                            addText="+ Add"
                            onAdd={() => {
                                setSelectedItem(null);
                                setMode("form");
                            }}

                        />
                    </div>
                </div>
                <div className="flex justify-end">

                </div>

                <Table header={<TableHeader columns={["Lead name", "Type", "Amount", "Date", "Status", "Action"]} />}>
                    {filteredExpenses.map((exp, index) => (
                        <EntityTableRow
                            key={exp.id}
                            row={exp}
                            index={index}
                            columns={expenseColumns}
                            onView={(r) => { setSelectedItem(r); setMode("view"); }}
                            // onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
                            onEdit={isHR ? (r) => {
                                setSelectedItem({
                                    ...r,
                                    status: String(r.status) // ⭐ IMPORTANT FIX
                                });
                                setMode("form");
                            } : null}

                            onDelete={handleDelete}
                        />
                    ))}
                </Table>
                {loading && <LoadingSpinner text="Loading Expense Details..." />}

            </PageContainer>
        );
    }

    // ================= VIEW PAGE =================
    if (mode === "view" && selectedItem) {
        return (
            <EntityPageLayout title="Expense Details" showBack onBack={() => setMode("list")}>
                <EntityViewCard
                    title="Expense"
                    data={selectedItem}
                    fields={expenseFields}
                    api={ExpenseAPI}
                    headerKeys={["vendor_name", "expense_type"]}
                    onUpdated={fetchExpenses}
                    onDeleted={() => { setMode("list"); fetchExpenses(); }}
                />
            </EntityPageLayout>
        );
    }

    // ================= FORM PAGE =================
    return (
        <EntityPageLayout title="Expense" showBack onBack={() => setMode("list")}>
            <EntityForm
                title={selectedItem ? "Edit Expense" : "Create Expense"}
                selectedItem={selectedItem}
                onSubmit={onSubmit}
                setMode={setMode}
                // fields={[
                //     { label: "Vendor Name", name: "vendor_name", required: true },
                //     { label: "Expense Type", name: "expense_type" },
                //     { label: "Amount", name: "amount", type: "number" },
                //     {
                //         label: "Status",
                //         name: "status",
                //         type: "select",
                //         options: [
                //             { label: "Approved", value: "true" },
                //             { label: "Pending", value: "false" },
                //         ],
                //     },
                //     { label: "Date", name: "date", type: "date" },
                //     { label: "Receipt Photo", name: "receipt_photo", type: "file" },

                // ]}
                fields={[
                    ...(isHR
                        ? [
                            {
                                label: "Employee",
                                name: "employee_id",
                                type: "select",
                                options: employees.map(e => ({
                                    label: `${e.first_name} ${e.last_name}`,
                                    value: e.id,
                                })),
                                required: true,
                            },
                        ]
                        : [
                            {
                                label: "Employee",
                                name: "employee_name",
                                type: "text",
                                value: employees[0]
                                    ? `${employees[0].first_name} ${employees[0].last_name}`
                                    : "",
                                disabled: true, // 🔥 non-editable
                            },
                        ]),
                    {
                        label: "Lead Name", name: "lead_id", type: "select",
                        options: leads.map(e => ({
                            label: `${e.business_name} `,
                            value: e.id,
                        })), required: true
                    },

                    { label: "Expense Type", name: "expense_type", required: true },

                    { label: "Amount", name: "amount", type: "number", required: true },

                    {
                        label: "Status",
                        name: "status",
                        type: "select",
                        required: true,
                        options: [
                            { label: "Approved", value: "true" },
                            { label: "Pending", value: "false" },
                        ],
                    },

                    { label: "Date", name: "date", type: "date", required: true },

                    { label: "Receipt Photo", name: "receipt_photo", type: "file" }, // optional
                ]}

            />
        </EntityPageLayout>
    );
}
