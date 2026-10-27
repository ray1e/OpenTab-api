import TopNavigation from "@/components/navigation/TopNavigation.jsx";
import DebtorCard from "@/components/debtors/DebtorCard.jsx";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button.jsx";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function DebtorProfiles() {
  const debtors = [
    {
      id: 1,
      name: "John Ngugi",
      phone: "0797459821",
      amount: "Ksh. 3, 500",
      activeDebts: 3,
    },
    {
      id: 2,
      name: "John Ngugi",
      phone: "0797459821",
      amount: "Ksh. 3, 500",
      activeDebts: 3,
    },
  ];

  const [position, setPosition] = useState("bottom");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  return (
    <div className="w-full min-w-0 overflow-x-clip">
      <div className="pb-space-component-padding-md">
        <TopNavigation buttonLabel="Add Debtor" />
      </div>
      <div className="flex gap-4  min-w-0 px-space-component-padding-md pb-space-component-padding-md">
        <div className="relative max-w-md">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-subtle"
            aria-hidden="true"
          />
          <Input
            type="search"
            placeholder="Search debtors"
            aria-label="Search debtors"
            className="pl-9 rounded-(--radius-card-debtor) border border-border-input-ring-default placeholder:text-text-subtle focus:border-2 focus:border-border-input-ring-focus focus:ring-0 focus-visible:border-2 focus-visible:border-border-input-ring-focus focus-visible:ring-0"
          />
        </div>
        <div>
          <DropdownMenu open={sortMenuOpen} onOpenChange={setSortMenuOpen}>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="rounded-(--radius-card-debtor) cursor-pointer bg-transparent hover:bg-surface-default-hover aria-expanded:bg-surface-default-hover"
                >
                  Sort by: Date
                  <ChevronDown
                    data-icon="inline-end"
                    className={`transition-transform duration-200 ${sortMenuOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              }
            />
            <DropdownMenuContent className="bg-surface-default border-0 ring-0 outline-0">
              <DropdownMenuGroup>
                <DropdownMenuRadioGroup
                  value={position}  
                  onValueChange={setPosition}
                >
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    Bottom
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                    Right
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="pb-space-component-padding-sm border-t border-t-border-default">
        {debtors.map((debtor) => (
          <DebtorCard key={debtor.id} {...debtor} />
        ))}
      </div>
    </div>
  );
}
