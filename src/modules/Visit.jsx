import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityForm from "../components/form/EntityForm";
import VisitsRow from "../components/table/VisitRow";
import VisitsViewCard from "../components/view/VisitViewCard";

import {
    getVisits,
    createVisit,
    updateVisit,
    deleteVisit,
    getEmployees,
    getLeads,
} from "../services/visit.service";
import VisitRow from "../components/table/VisitRow";

export default function Visits() {
    const [visits, setVisits] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [leads, setLeads] = useState([]);
    const [mode, setMode] = useState("list");
    const [selectedVisit, setSelectedVisit] = useState(null);

    const fetchData = async () => {
        const [v, e, l] = await Promise.all([
            getVisits(),
            getEmployees(),
            getLeads(),
        ]);

        setVisits(v.data.data || []);
        setEmployees(e.data.data || []);
        setLeads(l.data.data || []);
    };

    useEffect(() => { fetchData(); }, []);

    const getEmployeeName = (id) =>
        employees.find(e => e.id === id)?.employee_code || "—";

    const getLeadName = (id) =>
        leads.find(l => l.id === id)?.business_name || "—";

    const onSubmit = async (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            const value = data[key];

            // FILE FIELD
            if (value instanceof FileList) {
                if (value.length > 0) {
                    formData.append(key, value[0]);
                }
            }

            // NORMAL FIELD
            else if (value !== "" && value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        try {
            if (selectedVisit) {
                await updateVisit(selectedVisit.id, formData); // PATCH
            } else {
                await createVisit(formData);
            }

            setMode("list");
            fetchData();
        } catch (err) {
            console.log("Save failed", err.response?.data);
        }
    };


    if (mode === "list") {
        return (
            <PageContainer>
                <div className="flex justify-between items-center mb-4">
                    <SectionTitle title="Visits" />
                    <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
                </div>

                <Table header={
                    <TableHeader
                        columns={[
                            "No",
                            "Lead ID",
                            "Check-In / Check-Out",
                            " follow up type",

                            "Notes",
                            "Action",
                        ]}
                    />

                }>
                    {visits.map((v, index) => (
                        <VisitRow
                            key={v.id}
                            row={v}
                            index={index}
                            refreshData={fetchData}
                            onView={(r) => { setSelectedVisit(r); setMode("view"); }}
                            onEdit={(r) => { setSelectedVisit(r); setMode("form"); }}
                            onDelete={(id) => deleteVisit(id).then(fetchData)}
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
                        label: "Employee ID",
                        name: "employee_id",
                        type: "select",
                        options: employees.map(e => ({ label: e.id, value: e.id }))
                    },
                    {
                        label: "Lead ID",
                        name: "lead_id",
                        type: "select",
                        options: leads.map(l => ({ label: l.id, value: l.id }))
                    },

                    { label: "Address", name: "address" },
                    { label: "Location", name: "location" },
                    { label: "Visit Purpose", name: "visit_purpose" },
                    { label: "Visit Date", name: "visit_date", type: "datetime-local" },
                    { label: "Check In Time", name: "check_in_time", type: "datetime-local" },
                    { label: "Checkout Time", name: "checkout_time", type: "datetime-local" },
                    { label: "Total Hours", name: "total_hr" },
                    { label: "Followup Date", name: "followup_date", type: "datetime-local" },

                    {
                        label: "Followup Type",
                        name: "followup_type",
                        type: "select",
                        options: [
                            { label: "CALL", value: "CALL" },
                            { label: "MEETING", value: "MEETING" },
                            { label: "VISIT", value: "VISIT" }
                        ]
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
