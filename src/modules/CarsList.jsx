import { useState } from "react";
import Table from "../components/table/Table";
import TableHeader from "../components/table/TableHeader";
import TableRow from "../components/table/TableRow";
import CarViewCard from "../components/view/ViewCard";

export default function CarsList() {
  const [cars, setCars] = useState([
    {
      id: 1,
      name: "Creta",
      brand: "Hyundai",
      year: 2023,
      fuel: "Petrol",
      transmission: "Automatic",
      status: "Available",
      price: "₹15,00,000",
      bookingDate: "2024-02-12",
      description: "Premium compact SUV",
    },
    {
      id: 2,
      name: "XUV700",
      brand: "Mahindra",
      year: 2022,
      fuel: "Diesel",
      transmission: "Manual",
      status: "Sold",
      price: "₹18,50,000",
      bookingDate: "2024-01-20",
      description: "Powerful and spacious SUV",
    },
  ]);

  const [selectedCar, setSelectedCar] = useState(null);

  const handleView = (car) => {
    setSelectedCar(car);
  };

  const handleEdit = (car) => {
    console.log("EDIT", car);
  };

  const handleDelete = (id) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
    if (selectedCar?.id === id) setSelectedCar(null);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Cars</h2>

      {/* TABLE */}
      <Table>
        <TableHeader
          columns={[
            "Car",
            "Brand",
            "Year",
            "Price",
            "Status",
            "Actions",
          ]}
        />
        <tbody>
          {cars.map((car) => (
            <TableRow
              key={car.id}
              car={car}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </Table>

      {/* VIEW CARD */}
      <CarViewCard
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
      />
    </div>
  );
}
