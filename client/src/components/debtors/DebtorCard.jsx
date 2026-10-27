import { Card, CardContent } from "@/components/ui/card";

function DebtorCard({ name, phone, amount, activeDebts }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="cursor-pointer rounded-none border-b border-border-default bg-transparent py-space-component-padding-sm shadow-none ring-0 hover:bg-surface-default-hover">
      <CardContent className="p-0">
        <div className="flex items-center justify-between px-space-component-padding-sm max-[240px]:flex-col max-[240px]:items-stretch max-[240px]:gap-1 max-[240px]:px-2">
          <div className="flex min-w-0 items-center justify-center gap-2 p-space-component-padding-sm max-[240px]:justify-start max-[240px]:p-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-surface-action max-[240px]:size-8">
              <span className="text-text-on-action">{initials}</span>
            </div>

            <div className="flex min-w-0 flex-col gap-1">
              <span className="truncate text-paragraph-md-medium text-text-body">
                {name}
              </span>
              <span className="truncate text-paragraph-md text-text-subtle">
                {phone}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 max-[240px]:flex-row max-[240px]:justify-between">
            <span className="text-paragraph-md-medium text-text-body">
              {amount}
            </span>
            <span className="text-paragraph-md text-text-subtle">
              {activeDebts} active
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DebtorCard;
