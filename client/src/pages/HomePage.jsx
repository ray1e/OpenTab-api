import DebtorCard from "@/components/debtors/DebtorCard";
import TopNavigation from "@/components/navigation/TopNavigation";
import { Card, CardContent } from "@/components/ui/card";

import { ArrowRight, TrendingDown, Users } from "lucide-react";

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

function HomePage() {
  return (
    <div className="w-full min-w-0 overflow-x-clip">
      <div className="pb-space-component-padding-md">
        <TopNavigation buttonLabel="add Debtor" />
      </div>
      
      <div className="px-space-component-padding-md pb-space-component-padding-md max-[240px]:px-2">
        <Card className="bg-surface-primary-card flex w-full min-w-0 p-space-component-padding-md rounded-card-debts-summary max-[240px]:p-2">
          <CardContent className="min-w-0 p-1 md:grid md:grid-cols-5 md:gap-x-1 md:items-center justify-between max-[240px]:px-1">
            <div className="flex flex-col md:pr-8 md:col-span-2">
              <span className="text-text-subtle">Outstanding Debts</span>
              <span className="text-text-on-action text-h5">Ksh 2,000</span>
            </div>

            {/*stat cards -1 */}
            <div className="flex flex-row gap-3 md:col-span-2 px-2 justify-center items-center bg-surface-on-action-subtle rounded-card-subtle-stat max-[240px]:flex-col max-[240px]:items-stretch max-[240px]:gap-1 max-[240px]:px-1">
              <div className="flex gap-1 items-center justify-center md:min-w-0 md:flex-1">
                <span className="text-icon-on-action p-x-2">
                  <TrendingDown />
                </span>
                <div className="flex flex-col p-stat-card-padding-sm">
                  <span className="whitespace-nowrap text-text-on-action-subtle text-paragraph-sm-regular">
                    Unpaid Debts
                  </span>
                  <span className="text-text-on-action text-paragraph-lg-bold">
                    25
                  </span>
                </div>
              </div>

              <span
                className="h-8 w-px self-center bg-border-divider max-[240px]:h-px max-[240px]:w-full"
                aria-hidden="true"
              />

              {/*stat cards -1 */}
              <div className="flex gap-1 items-center justify-center md:min-w-0 md:flex-1">
                <span className="text-icon-on-action">
                  <Users />
                </span>

                <div className="flex flex-col  p-stat-card-padding-sm">
                  <span className="whitespace-nowrap text-text-on-action-subtle text-paragraph-sm-regular">
                    Customers
                  </span>
                  <span className="text-text-on-action text-paragraph-lg-bold">
                    11
                  </span>
                </div>
              </div>
            </div>

            <span className="text-text-action md:justify-self-end-safe justify-self-end-safe max-[240px]:self-end">
              See more
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between px-space-component-padding-md pb-space-component-padding-md max-[240px]:px-2">
        <span className="text-h6 text-text-body">Customers</span>
        <div className="flex items-center justify-center gap-2">
          <span className="text-text-body text-paragraph-md-regular">
            See All
          </span>
          <ArrowRight className="w-4 h-4" />
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

export default HomePage;
