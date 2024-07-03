import { DataTableDemo } from "@/components/DataTableDemo";

import { Payment } from "./constants/data";

export default function DataTable() {
    return (
      <div className='container mx-auto'>
        <h1 className='text-3xl font-bold'>DataTable</h1>
        <DataTableDemo />
      </div>
    );
}
