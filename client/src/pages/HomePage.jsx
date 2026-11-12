import DebtorCard from "@/components/debtors/DebtorCard";
import TopNavigation from "@/components/navigation/TopNavigation";
import { Card, CardContent } from "@/components/ui/card";

import { ArrowRight, TrendingDown, Users } from "lucide-react";
import { useState } from "react";
import AddDebtor from "@/pages/AddDebtor.jsx";
import { Link } from "react-router-dom";
//import { useSelector } from "react-redux";
import { useGetDebtorsQuery } from "@/debtorApi.js";
import { Skeleton } from "@/components/ui/skeleton";

function HomePage() {
  const [isAddDebtorOpen, setIsAddDebtorOpen] = useState(false);
  const { data = [], isLoading, isError } = useGetDebtorsQuery();

  const debtors = data?.debtorProfiles ?? [];

  return (
    <div className="w-full min-w-0 overflow-x-clip pt-52">
      {isAddDebtorOpen && (
        <AddDebtor onClose={() => setIsAddDebtorOpen(false)} />
      )}
      <div className="fixed top-0 right-0 left-0 z-50 bg-surface-default">
        <div className="py-space-component-padding-md">
          <TopNavigation
            buttonLabel="add Debtor"
            onButtonClick={() => setIsAddDebtorOpen(true)}
          />
        </div>

        <div className="px-space-component-padding-md pb-space-component-padding-md max-[240px]:px-2">
          <Card className="flex w-full min-w-0 rounded-card-debts-summary bg-surface-primary-card p-space-component-padding-md max-[240px]:p-2">
            <CardContent className="min-w-0 justify-between p-1 max-[240px]:px-1 md:grid md:grid-cols-5 md:items-center md:gap-x-1">
              <div className="flex flex-col md:col-span-2 md:pr-8">
                <span className="text-text-subtle">Outstanding Debts</span>
                <span className="text-h5 text-text-on-action">Ksh 2,000</span>
              </div>

              {/*stat cards -1 */}
              <div className="flex flex-row items-center justify-center gap-3 rounded-card-subtle-stat bg-surface-on-action-subtle px-2 max-[240px]:flex-col max-[240px]:items-stretch max-[240px]:gap-1 max-[240px]:px-1 md:col-span-2">
                <div className="flex items-center justify-center gap-1 md:min-w-0 md:flex-1">
                  <span className="p-x-2 text-icon-on-action">
                    <TrendingDown />
                  </span>
                  <div className="flex flex-col p-stat-card-padding-sm">
                    <span className="text-paragraph-sm-regular whitespace-nowrap text-text-on-action-subtle">
                      Unpaid Debts
                    </span>
                    <span className="text-paragraph-lg-bold text-text-on-action">
                      25
                    </span>
                  </div>
                </div>

                <span
                  className="h-8 w-px self-center bg-border-on-action-divider max-[240px]:h-px max-[240px]:w-full"
                  aria-hidden="true"
                />

                {/*stat cards -1 */}
                <div className="flex items-center justify-center gap-1 md:min-w-0 md:flex-1">
                  <span className="text-icon-on-action">
                    <Users />
                  </span>

                  <div className="flex flex-col p-stat-card-padding-sm">
                    <span className="text-paragraph-sm-regular whitespace-nowrap text-text-on-action-subtle">
                      Customers
                    </span>
                    <span className="text-paragraph-lg-bold text-text-on-action">
                      11
                    </span>
                  </div>
                </div>
              </div>

              <span className="justify-self-end-safe text-text-action max-[240px]:self-end md:justify-self-end-safe">
                See more
              </span>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between px-space-component-padding-md pb-space-component-padding-md max-[240px]:px-2">
          <span className="text-h6 text-text-body">Customers</span>
          <Link to="/debtor-profiles">
            <div className="flex items-center justify-center gap-2">
              <span className="text-paragraph-md-regular text-text-body">
                See All
              </span>

              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div
          className="divide divide-border-default pb-space-component-padding-sm"
          role="status"
          aria-label="Loading customers"
        >
          {Array.from({ length: 5 }, (_, index) => (
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
        <div className="divide divide-border-default pb-space-component-padding-sm">
          {isError ? (
            <p role="alert">Unable to load debtors.</p>
          ) : (
            debtors.map((debtor) => (
              <Link key={debtor._id} to={`/debtor/${debtor._id}`}>
                <DebtorCard
                  name={debtor.name}
                  phone={debtor.phone}
                  amount={debtor.amount}
                  activeDebts={debtor.tabs?.length ?? 0}
                />
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
