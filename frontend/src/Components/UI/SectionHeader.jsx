export default function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-x-2 mb-4">
      <div className="w-1 h-8 bg-primary" />
      <h1 className="text-xl font-medium">{title}</h1>
    </div>
  );
}
