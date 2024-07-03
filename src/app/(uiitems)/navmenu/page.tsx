import { NavigationMenuDemo } from "@/components/NavigationMenuDemo";

export default function Tabs() {
    return (
      <div className='container mx-auto'>
        <h1 className='text-3xl font-bold'>たぶ</h1>
        <section className="container flex pt-16 grid grid-cols-2 gap-10 xl:grid-cols-3">
            <NavigationMenuDemo />
        </section>
      </div>
    );
}
