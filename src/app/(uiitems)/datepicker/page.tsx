import { DatePickerForm } from "@/components/DatePickerDemo/DatePickerForm";

export default function DatePicker() {
    return (
      <div className='container mx-auto'>
        <h1 className='text-3xl font-bold'>DatePicker</h1>
        <section className="container flex pt-16 grid grid-cols-2 gap-10 xl:grid-cols-3">
            <DatePickerForm />
        </section>
      </div>
    );
}
