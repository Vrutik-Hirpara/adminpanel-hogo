const visitFormFields = [
  { name: "address", label: "Address", type: "text" },
  { name: "location", label: "Location", type: "text" },
  { name: "visit_purpose", label: "Visit Purpose", type: "text" },
  { name: "visit_date", label: "Visit Date", type: "datetime-local" },
  { name: "check_in_time", label: "Check In Time", type: "datetime-local" },
  { name: "checkout_time", label: "Checkout Time", type: "datetime-local" },
  { name: "total_hr", label: "Total Hours", type: "text" },
  { name: "followup_date", label: "Followup Date", type: "datetime-local" },

  {
    name: "followup_type",
    label: "Followup Type",
    type: "select",
    options: [
      { label: "CALL", value: "CALL" },
      { label: "MEETING", value: "MEETING" },
      { label: "VISIT", value: "VISIT" },
    ],
  },

  { name: "contact_person", label: "Contact Person", type: "text" },
  { name: "notes", label: "Notes", type: "textarea" },
  { name: "order_information", label: "Order Info", type: "textarea" },
  { name: "payment_details", label: "Payment Details", type: "textarea" },

  { name: "order_name", label: "Order Name", type: "text" },

  { name: "payment_image", label: "Payment Image", type: "file" },
  { name: "images", label: "Visit Image", type: "file" },

  { name: "employee_id", label: "Employee", type: "select" },
  { name: "lead_id", label: "Lead", type: "select" },
];

export default visitFormFields;
