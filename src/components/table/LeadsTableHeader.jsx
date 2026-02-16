

export default function LeadsTableHeader() {
  return (
    <thead>
      <tr className="bg-red-600 text-sm"  style={{ color: themes.textWhite }}>

        <th className="w-[4%] py-3 text-center">No</th>
        <th className="w-[14%] py-3 text-center">Business</th>
        <th className="w-[8%] py-3 text-center">Lead Type</th>
        <th className="w-[10%] py-3 text-center">Contact</th>
        <th className="w-[9%] py-3 text-center">Phone</th>
        <th className="w-[13%] py-3 text-center">Email</th>
        <th className="w-[6%] py-3 text-center">Interest</th>
        {/* <th className="w-[6%] py-3 text-center">Status</th> */}
        <th className="w-[10%] py-3 text-center">Assigned To</th>
        <th className="w-[10%] py-3 text-center">Action</th>

      </tr>
    </thead>
  );
}
