




import { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import EntityTableRow from "../components/table/EntityTableRow";


import { BranchAPI } from "../services";

import ActionButtons from "../components/form/ActionButton";
import SectionTitle from "../components/form/SectionTitle";
import EntityPageLayout from "../layout/EntityPageLayout";
import EntityViewCard from "../components/view/EntityViewCard";
import EntityForm from "../components/form/EntityForm";
import { useOutletContext } from "react-router-dom";
import { parseBackendErrors } from "../utils/parseBackendErrors";

export default function OfficeBranch() {
  const { setError, setSuccess } = useOutletContext();
  const [branches, setBranches] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedBranch, setSelectedBranch] = useState(null);

const fetchBranches = async () => {
  try {
    const res = await BranchAPI.getAll();
    setBranches(res.data.data);   // ✅ actual array
  } catch (err) {
    setError(parseBackendErrors(err));
  }
};
  useEffect(() => { fetchBranches(); }, []);

  const onSubmit = async (data) => {
    try {
      if (selectedBranch) {
        const res = await BranchAPI.update(selectedBranch.id, data);
        setSuccess(res.data?.message || "Saved successfully");
      } else {
        const res = await BranchAPI.create(data);
        setSuccess(res.data?.message || "Saved successfully");
      }
      setMode("list");
      fetchBranches();
    } catch (err) {
      setError(parseBackendErrors(err));
    }
  };
const branchColumns = [
  { key: "name" },
  { key: "address" },
  { key: "city" },
  { key: "state" },
  { key: "country" },
];
const branchFields = [
  { key: "name", label: "Branch Name" },
  { key: "address", label: "Address" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "country", label: "Country" }
];

  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 w-full">
          <SectionTitle title="Office Branches" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => {
  setSelectedBranch(null);   // ⭐ IMPORTANT RESET
  setMode("form");
}} />
        </div>

        <Table header={<TableHeader columns={["Name","Address","City","State","Country","Action"]} />}>
      {branches.map((b, index) => (
  <EntityTableRow
    key={b.id}
    row={b}
    index={index}
    columns={branchColumns}
    onView={(r) => {
      setSelectedBranch(r);
      setMode("view");
    }}
    onEdit={(r) => {
      setSelectedBranch(r);
      setMode("form");
    }}
    onDelete={async (id) => {
      try {
        const res = await BranchAPI.delete(id);
        setSuccess(res.data?.message || "Deleted successfully");
        fetchBranches();
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

if (mode === "view" && selectedBranch) {
  return (
    <EntityPageLayout
      title="Office Branch Details"
      showBack
      onBack={() => setMode("list")}
    >
      <EntityViewCard
        title="Office Branch"
        data={selectedBranch}
        fields={branchFields}
        api={BranchAPI}
        onUpdated={fetchBranches}
        onDeleted={fetchBranches}
        headerKeys={["name"]}   // ⭐ dynamic red header
      />
    </EntityPageLayout>
  );
}


  return (
    <EntityPageLayout title="Office Branch Details" showBack onBack={() => setMode("list")}>
      <EntityForm
        title={selectedBranch ? "Edit Office Branch" : "Create Office Branch"}
        selectedItem={selectedBranch}
        onSubmit={onSubmit}
        setMode={setMode}
    fields={[
  { label: "Branch Name", name: "name", required: true },
  { label: "Address", name: "address", type: "textarea", required: true },
  { label: "City", name: "city", required: true },
  { label: "State", name: "state", required: true },
  { label: "Country", name: "country", required: true },
]}

      />
    </EntityPageLayout>
  );
}
