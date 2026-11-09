export function PagePlaceholder({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="flex min-h-64 flex-1 items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
        Coming soon
      </div>
    </div>
  )
}
