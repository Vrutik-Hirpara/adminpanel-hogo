
import { useState } from "react";
import ActionButtons from "../form/ActionButton";
import EntityForm from "../form/EntityForm";
import apiClient from "../../services/api";
import { themes } from "../../config/theme.config";

export default function EntityViewCard({
  title,
  data = {},
  fields = [],
  api,
  headerKeys = [],
  onUpdated,
  onDeleted,
  emptyText = "inactive", // 🔥 customizable empty text
}) {
  const [editMode, setEditMode] = useState(false);

  const BASE_URL = apiClient.defaults.baseURL.replace(/\/$/, "");

  const buildUrl = (path) => {
    if (!path || typeof path !== "string") return null;
    if (path.startsWith("http")) return path;
    return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const handleDelete = async () => {
    if (!data?.id) return;
    if (!window.confirm(`Delete this ${title}?`)) return;
    await api.delete(data.id);
    onDeleted?.();
  };

  const handleUpdate = async (formData) => {
    await api.update(data.id, formData);
    setEditMode(false);
    onUpdated?.();
  };

  if (editMode) {
    return (
      <EntityForm
        title={`Edit ${title}`}
        initialData={data}
        onSubmit={handleUpdate}
        onCancel={() => setEditMode(false)}
      />
    );
  }

  // 🔥 SPLIT LEFT / RIGHT
  const leftFields = fields.filter(f => f.column !== "right");
  const rightFields = fields.filter(f => f.column === "right");

  const renderField = (field) => {
    const value = data?.[field.key];
    const fullUrl = buildUrl(value);

    return (
      <div key={field.key}>
        <p className="text-sm"style={{ color: themes.textMuted }}>{field.label}</p>
        <div className="font-semibold " style={{ color: themes.backgroundBlack }}>
          {(() => {
            if (!value) return emptyText;

            if (typeof fullUrl === "string" && /\.(jpg|jpeg|png|webp)$/i.test(fullUrl)) {
              return <img src={fullUrl} className="h-28 rounded-lg border mt-1" />;
            }

            if (typeof fullUrl === "string" && /\.(pdf|doc|docx)$/i.test(fullUrl)) {
              return <a href={fullUrl} target="_blank" className=" underline"style={{ color: themes.cardEmployee }}
>View Document</a>;
            }

            return field.format ? field.format(value) : value;
          })()}
        </div>
      </div>
    );
  };

  return (
    <div className=" rounded-2xl shadow-lg overflow-hidden border" style={{ backgroundColor: themes.textWhite }}>

      {/* 🔴 HEADER */}
      <div className="bg-red-600  p-5"  style={{ color: themes.textWhite }}>
        <h2 className="text-xl font-bold">
          {headerKeys.length
            ? headerKeys.map(k => data?.[k]).filter(Boolean).join(" - ")
            : title}
        </h2>
        <p className="text-sm opacity-90">{title}</p>
      </div>

      {/* 📋 GRID */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
        <div className="space-y-5">{leftFields.map(renderField)}</div>
        <div className="space-y-5">{rightFields.map(renderField)}</div>
      </div>

      {/* ⚙ ACTIONS */}
      <div className="p-5 border-t flex justify-end gap-3 "   style={{ backgroundColor: themes.surfaceLight }}
>
        <ActionButtons onEdit={() => setEditMode(true)} onDelete={handleDelete} />
      </div>
    </div>
  );
}
