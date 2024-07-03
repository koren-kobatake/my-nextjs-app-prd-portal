import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between px-8 w-screen h-16 bg-teal-400 items-center drop-shadow-2xl border-b border-gray-300 shadow-md z-10">
      <h1 className="font-bold text-2xl">決済バック（Next.js × shadcn/ui）</h1>
      <div className="flex gap-3">
        <Button variant="outline">
          <a href="https://ui.shadcn.com/docs">shadcn/ui 公式</a>
        </Button>
        <Button>menu</Button>
      </div>
    </div>
  );
};