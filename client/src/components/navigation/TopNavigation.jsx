import { Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

function TopNavigation({buttonLabel}) {
  return (
    <div className="flex items-center justify-between gap-2 px-space-component-padding-md max-[240px]:px-2">
      <Button
        variant="ghost"
        className="px-0 text-text-body hover:text-text-secondary cursor-pointer"
        aria-label="Open menu"
      >
        <Menu className="size-6" strokeWidth={2} />
      </Button>

      <Button variant="ghost" className="cursor-pointer text-text-on-action hover:bg-surface-action rounded-card-debtor px-space-component-padding-md has-data-[icon=inline-start]:pl-space-component-padding-md max-[240px]:px-2 max-[240px]:has-data-[icon=inline-start]:pl-2">
        <Plus data-icon="inline-start" />
        {buttonLabel}
      </Button>
    </div>
  );
}

export default TopNavigation;
