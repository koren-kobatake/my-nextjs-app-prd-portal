import { CheckboxReactHookFormMultiple } from "@/components/CheckboxReactHookFormMultipleDemo";

export default function CheckBox() {
    return (
      <div className='container mx-auto'>
        <h1 className='text-3xl font-bold'>CheckBox</h1>
        <section className="container flex pt-16 grid grid-cols-2 gap-10 xl:grid-cols-3">
            <CheckboxReactHookFormMultiple />
        </section>
      </div>
    );
}
