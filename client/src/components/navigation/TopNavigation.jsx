import { Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

function TopNavigation({ buttonLabel, onButtonClick }) {
  return (
    <div className="flex items-center justify-between gap-2 px-space-component-padding-md max-[240px]:px-2">
      <Button
        variant="ghost"
        className="cursor-pointer px-0 text-text-body hover:text-text-secondary"
        aria-label="Open menu"
      >
        <Menu className="size-6" strokeWidth={2} />
      </Button>

      <Button
        variant="default"
        onClick={onButtonClick}
        className="cursor-pointer rounded-card-debtor bg-surface-action px-space-component-padding-md text-text-on-action hover:bg-surface-action-hover has-data-[icon=inline-start]:pl-space-component-padding-md max-[240px]:px-2 max-[240px]:has-data-[icon=inline-start]:pl-2"
      >
        <Plus data-icon="inline-start" />
        {buttonLabel}
      </Button>
    </div>
  );
}

export default TopNavigation;
