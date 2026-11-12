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
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useGetAllDebtorsListQuery } from "@/debtorApi.js";
import { Link, useSearchParams } from "react-router-dom";
import AddDebtor from "./AddDebtor.jsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { paginate } from "@/utils/pagination.js";
import { Skeleton } from "@/components/ui/skeleton";

export function DebtorProfiles() {
  const [isAddDebtorOpen, setIsAddDebtorOpen] = useState(false);
  const [sortMethod, setSortMethod] = useState("comfortable");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  //get the page for the first render from the url otherwise use 1
  const page = Number(searchParams.get("page") || 1);
  const { data = [], isLoading } = useGetAllDebtorsListQuery(page);

  //use setSearchParams to set the new url path with the include and
  //page keys
  // also page here is what will be visible to the user in the urlpath
  const goToPage = (nextPage) =>
    setSearchParams({
      include: "tabs",
      page: String(nextPage),
    });

  const debtors = data?.debtorProfiles ?? [];

  const availablePages = data?.pagination?.availablePages || 1;
  const { startPage, visibleCount } = paginate(3, page, availablePages);

  return (
    <div className="w-full min-w-0 overflow-x-clip pt-24">
      {isAddDebtorOpen && (
        <AddDebtor onClose={() => setIsAddDebtorOpen(false)} />
      )}
      <div className="fixed top-0 right-0 left-0 z-50 bg-surface-default">
        <div className="py-space-component-padding-md">
          <TopNavigation
            buttonLabel="Add Debtor"
            onButtonClick={() => setIsAddDebtorOpen(true)}
          />
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

      {isLoading ? (
        <div
          className="divide divide-border-default pb-space-component-padding-sm"
          role="status"
          aria-label="Loading customers"
        >
          {Array.from({ length: 4 }, (_, index) => (
            <Card
              key={index}
              aria-hidden="true"
              className="rounded-none border-b border-border-default bg-transparent py-space-component-padding-sm shadow-none ring-0"
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between px-space-component-padding-sm max-[240px]:flex-col max-[240px]:items-stretch max-[240px]:gap-1 max-[240px]:px-2">
                  <div className="flex min-w-0 items-center gap-2 p-space-component-padding-sm max-[240px]:p-0">
                    <Skeleton className="size-10 shrink-0 rounded-full bg-neutral-200 max-[240px]:size-8" />
                    <div className="flex min-w-0 flex-col gap-2">
                      <Skeleton
                        className={`h-4 bg-neutral-200 ${
                          index % 2 === 0 ? "w-36" : "w-28"
                        }`}
                      />
                      <Skeleton className="h-3 w-24 bg-neutral-200" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 max-[240px]:flex-row max-[240px]:justify-between">
                    <Skeleton className="h-4 w-16 bg-neutral-200" />
                    <Skeleton className="h-3 w-20 bg-neutral-200" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <span className="sr-only">Loading customers...</span>
        </div>
      ) : (
        <div className="flex flex-col pb-space-component-padding-md">
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
          {/*pagination */}
          {availablePages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`?include=tabs&page=${Math.max(1, page - 1)}`}
                    onClick={(event) => {
                      event.preventDefault();
                      if (page > 1) {
                        goToPage(page - 1);
                      }
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: visibleCount }, (_, index) => {
                  // we already know the startpage so a page number is going to be
                  //how far it is from the start page example: if page is 5
                  //the start page is 4 and since the buttons are shown in groups of 3 like 4,5,6
                  // the page number is the start page plus index(how far it is from the start page)
                  const pageNumber = startPage + index;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href={`?include=tabs&page=${pageNumber}`}
                        isActive={page === pageNumber}
                        onClick={(event) => {
                          event.preventDefault();
                          goToPage(pageNumber);
                        }}
                        className="not-data-active:size-6 not-data-active:hover:rounded-md not-data-active:hover:border not-data-active:hover:border-border-default data-active:size-6 data-active:rounded-md data-active:border-surface-primary-card"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href={`?include=tabs&page=${Math.min(availablePages, page + 1)}`}
                    onClick={(event) => {
                      event.preventDefault();
                      if (page < availablePages) {
                        goToPage(page + 1);
                      }
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  );
}
