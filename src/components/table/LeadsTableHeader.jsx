// import { themes } from "../../config/theme.config";

// export default function LeadsTableHeader() {
//   return (
//     <thead className="border-b border-gray-300">
//       <tr className="bg-red-600 text-white">

//         {/* SERIAL NUMBER HEADER */}
//         <th className="w-[5%] px-4 py-3 text-center">No</th>

//         <th className="w-[14%] px-4 py-3 text-center">Business</th>
//         <th className="w-[10%] px-4 py-3 text-center">Lead Type</th>
//         <th className="w-[12%] px-4 py-3 text-center">Contact</th>
//         <th className="w-[12%] px-4 py-3 text-center">Phone</th>
//         <th className="w-[16%] px-4 py-3 text-center">Email</th>
//         <th className="w-[8%] px-4 py-3 text-center">Interest</th>
//         <th className="w-[8%] px-4 py-3 text-center">Status</th>
//         {/* <th className="w-[6%] px-4 py-3 text-center">Created By</th> */}
//         <th className="w-[9%] px-4 py-3 text-center">Action</th>

//       </tr>
//     </thead>
//   );
// }
export default function LeadsTableHeader() {
  return (
    <thead>
      <tr className="bg-red-600 text-white text-sm">

        <th className="w-12 px-4 py-3 text-center">No</th>
        <th className="w-[18%] px-4 py-3 text-center">Business</th>
        <th className="w-[12%] px-4 py-3 text-center">Lead Type</th>
        <th className="w-[14%] px-4 py-3 text-center">Contact</th>
        <th className="w-[12%] px-4 py-3 text-center">Phone</th>
        <th className="w-[18%] px-4 py-3 text-center">Email</th>
        <th className="w-[8%] px-4 py-3 text-center">Interest</th>
        <th className="w-[8%] px-4 py-3 text-center">Status</th>
        <th className="w-[12%] px-4 py-3 text-center">Action</th>

      </tr>
    </thead>
  );
}
