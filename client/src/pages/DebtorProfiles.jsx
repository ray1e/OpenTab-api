import TopNavigation from "@/components/navigation/TopNavigation.jsx";
import DebtorCard from "@/components/debtors/DebtorCard.jsx";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button.jsx";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useGetDebtorsQuery } from "@/debtorApi.js";
import { Link } from "react-router-dom";

export function DebtorProfiles() {
  const [sortMethod, setSortMethod] = useState("comfortable");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const { data: debtors = [], isLoading, isError } = useGetDebtorsQuery();

  return (
    <div className="w-full min-w-0 overflow-x-clip pt-20">
      <div className="fixed top-0 left-0 right-0 z-50 bg-surface-default">
        <div className="py-space-component-padding-md">
          <TopNavigation buttonLabel="Add Debtor" />
        </div>
        <div className="flex min-w-0 gap-4 px-space-component-padding-md pb-space-component-padding-md">
          <div className="relative w-1/2 max-w-md">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-subtle"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search debtors"
              aria-label="Search debtors"
              className="rounded-(--radius-card-debtor) border border-border-input-ring-default pl-9 placeholder:text-text-subtle focus:border-2 focus:border-border-input-ring-focus focus:ring-0 focus-visible:border-2 focus-visible:border-border-input-ring-focus focus-visible:ring-0"
            />
          </div>
          <div>
            <DropdownMenu open={sortMenuOpen} onOpenChange={setSortMenuOpen}>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="cursor-pointer rounded-(--radius-card-debtor) bg-transparent hover:bg-surface-default-hover aria-expanded:bg-surface-default-hover"
                  >
                    Sort by: {sortMethod}
                    <ChevronDown
                      data-icon="inline-end"
                      className={`transition-transform duration-200 ${sortMenuOpen ? "rotate-180" : ""}`}
                    />
                  </Button>
                }
              />
              <DropdownMenuContent className="border-0 bg-surface-default ring-0 outline-0">
                <DropdownMenuRadioGroup
                  value={sortMethod}
                  onValueChange={setSortMethod}
                >
                  <DropdownMenuRadioItem value="default">
                    Default
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="comfortable">
                    Comfortable
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="compact">
                    Compact
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="divide divide-border-default pb-space-component-padding-sm">
        {debtors.map((debtor) => (
          <Link key={debtor._id} to={`/debtor/${debtor._id}`}>
            <DebtorCard
              name={debtor.name}
              activeDebts={debtor.tabs?.length ?? 0}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
