




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

export default function OfficeBranch() {
  const [branches, setBranches] = useState([]);
  const [mode, setMode] = useState("list");
  const [selectedBranch, setSelectedBranch] = useState(null);

const fetchBranches = async () => {
  const res = await BranchAPI.getAll();
  setBranches(res.data.data);   // ✅ actual array
};
  useEffect(() => { fetchBranches(); }, []);

  const onSubmit = async (data) => {
    selectedBranch
      ? await BranchAPI.update(selectedBranch.id, data)
      : await BranchAPI.create(data);
    setMode("list");
    fetchBranches();
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
  { key: "country", label: "Country" },
  { key: "created_at", label: "Created at" },
];

  if (mode === "list") {
    return (
      <PageContainer>
        <div className="flex justify-between items-center mb-4">
          <SectionTitle title="Office Branches" />
          <ActionButtons showAdd addText="+ Add" onAdd={() => setMode("form")} />
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
    onDelete={(id) => BranchAPI.delete(id).then(fetchBranches)}
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
          { label: "Name", name: "name", required: true },
          { label: "Address", name: "address", type: "textarea" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "Country", name: "country" },
        ]}
      />
    </EntityPageLayout>
  );
}
