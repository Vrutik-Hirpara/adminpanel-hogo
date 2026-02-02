import { themes } from "../../config/theme.config";

export default function EmployeeSalaryViewCard({ salary, employeeName }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${themes.backgroundGray}`, backgroundColor: themes.textWhite }}>
      <div className="px-6 py-4" style={{ backgroundColor: themes.primary, color: themes.textWhite }}>
        <h3 className="text-lg font-semibold">{employeeName}</h3>
        <p className="text-sm opacity-90">Salary Details</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
        <Detail label="Basic Salary" value={salary.basic_salary} />
        <Detail label="Allowances" value={salary.alloances} />
        <Detail label="Deductions" value={salary.deductions} />
        <Detail label="Gross Salary" value={salary.gross_salary} />
        <Detail label="Effective From" value={salary.effective_from} />
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs mb-1" style={{ color: themes.backgroundGray }}>{label}</p>
      <p className="font-medium text-sm" style={{ color: themes.backgroundDark }}>{value || "-"}</p>
    </div>
  );
}
