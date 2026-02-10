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

import { ExpenseAPI } from "../services";

export default function Expenses() {
    const [expenses, setExpenses] = useState([]);
    const [mode, setMode] = useState("list");
    const [selectedItem, setSelectedItem] = useState(null);

    // ================= FETCH =================
    const fetchExpenses = async () => {
        const res = await ExpenseAPI.getAll();
        const data = res.data?.data || [];

        const formatted = data.map(e => ({
            ...e,
            status: Boolean(e.status),
        }));

        setExpenses(formatted);
    };

    useEffect(() => { fetchExpenses(); }, []);

    // ================= SAVE =================
    const onSubmit = async (data) => {
        data.status = data.status === "true"; // ⭐ ADD THIS

        const formData = new FormData();

        Object.keys(data).forEach(key => {
            const val = data[key];
            if (val instanceof FileList) {
                if (val.length > 0) formData.append(key, val[0]);
            } else if (val !== "" && val !== null && val !== undefined) {
                formData.append(key, val);
            }
        });

        selectedItem
            ? await ExpenseAPI.update(selectedItem.id, formData)
            : await ExpenseAPI.create(formData);

        setMode("list");
        fetchExpenses();
    };

    const handleDelete = async (id) => {
        await ExpenseAPI.delete(id);
        fetchExpenses();
    };
    const handleStatusToggle = async (exp) => {
        const newStatus = !exp.status;

        setExpenses(prev =>
            prev.map(e => e.id === exp.id ? { ...e, status: newStatus } : e)
        );

        try {
            await ExpenseAPI.update(exp.id, { status: newStatus });
        } catch {
            fetchExpenses();
        }
    };

    // ================= TABLE COLUMNS =================
    const expenseColumns = [
        { key: "vendor_name" },
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
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500 ${row.status ? "bg-green-500" : "bg-gray-400"
                        }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-500 ${row.status ? "translate-x-6" : "translate-x-1"
                            }`}
                    />
                </button>
            ),
        }

    ];

    // ================= VIEW FIELDS =================
    // const expenseFields = [
    //     { key: "vendor_name", label: "Vendor Name" },
    //     { key: "expense_type", label: "Expense Type" },
    //     { key: "amount", label: "Amount" },
    //     { key: "date", label: "Date" },
    //     { key: "status", label: "Status", format: v => v ? "Approved" : "Pending" },
    //     {
    //         key: "receipt_photo",
    //         label: "Receipt Photo",
    //         format: (url) =>
    //             url ? (
    //                 <img
    //                     src={url.startsWith("http") ? url : `${api.defaults.baseURL}${url}`}
    //                     alt="receipt"
    //                     className="w-40 rounded shadow border"
    //                 />
    //             ) : "No Image",
    //     }

    //     ,
    //     { key: "created_at", label: "Created At" },
    // ];
    const expenseFields = [
        { key: "vendor_name", label: "Vendor Name" },
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
                        className="w-40 rounded shadow border"
                    />
                ) : "No Image",
        },

        { key: "created_at", label: "Created At", format: formatDate },
    ];

    // ================= LIST PAGE =================
    if (mode === "list") {
        return (
            <PageContainer>
                <div className="flex justify-between items-center mb-4">
                    <SectionTitle title="Expenses" />
                    <ActionButtons showAdd addText="+ Add" onAdd={() => { setSelectedItem(null); setMode("form"); }} />
                </div>

                <Table header={<TableHeader columns={["Vendor", "Type", "Amount", "Date", "Status", "Action"]} />}>
                    {expenses.map((exp, index) => (
                        <EntityTableRow
                            key={exp.id}
                            row={exp}
                            index={index}
                            columns={expenseColumns}
                            onView={(r) => { setSelectedItem(r); setMode("view"); }}
                            // onEdit={(r) => { setSelectedItem(r); setMode("form"); }}
                            onEdit={(r) => {
                                setSelectedItem({
                                    ...r,
                                    status: String(r.status) // ⭐ IMPORTANT FIX
                                });
                                setMode("form");
                            }}

                            onDelete={handleDelete}
                        />
                    ))}
                </Table>
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
                fields={[
                    { label: "Vendor Name", name: "vendor_name", required: true },
                    { label: "Expense Type", name: "expense_type" },
                    { label: "Amount", name: "amount", type: "number" },
                    {
                        label: "Status",
                        name: "status",
                        type: "select",
                        options: [
                            { label: "Approved", value: "true" },
                            { label: "Pending", value: "false" },
                        ],
                    },
                    { label: "Date", name: "date", type: "date" },
                    { label: "Receipt Photo", name: "receipt_photo", type: "file" },

                ]}
            />
        </EntityPageLayout>
    );
}
