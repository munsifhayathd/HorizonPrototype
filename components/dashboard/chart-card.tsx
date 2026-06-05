type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function ChartCard({ title, description, children }: Props) {
  return (
    <section className="surface-card p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
