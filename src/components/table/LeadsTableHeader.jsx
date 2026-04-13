
import { themes } from "../../config/theme.config";
import { useUser } from "../../hooks/useUser";
  const { isHR } = useUser();

export default function LeadsTableHeader() {
  return (
    <thead>
      <tr className="bg-red-600 text-sm"  style={{ color: themes.textWhite }}>

        <th className="px-3 py-3 text-center whitespace-nowrap">No</th>
        <th className="px-3 py-3 text-center whitespace-nowrap">Business</th>
        <th className="px-3 py-3 text-center whitespace-nowrap">Lead Type</th>
        <th className="px-3 py-3 text-center whitespace-nowrap">Contact</th>
        <th className="px-3 py-3 text-center whitespace-nowrap">Phone</th>
        <th className="px-3 py-3 text-center whitespace-nowrap">Interest</th>
        {/* <th className="px-3 py-3 text-center whitespace-nowrap">Status</th> */}
        <th className="px-3 py-3 text-center whitespace-nowrap">Visit List</th>
                <th className="px-3 py-3 text-center whitespace-nowrap">Leads Followup</th>

        {/* {isHR && (
        <th className="px-3 py-3 text-center whitespace-nowrap">Assigned To</th>
                
)} */}
        <th className="px-3 py-3 text-center whitespace-nowrap">Assigned To</th>

        <th className="px-3 py-3 text-center whitespace-nowrap">Action</th>

      </tr>
    </thead>
  );
}
