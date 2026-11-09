import DebtorCard from "@/components/debtors/DebtorCard";
import TopNavigation from "@/components/navigation/TopNavigation";
import { Card, CardContent } from "@/components/ui/card";

import { ArrowRight, TrendingDown, Users } from "lucide-react";
import { useState } from "react";
import AddDebtor from "@/pages/AddDebtor.jsx";
import { Link } from "react-router-dom";

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
  const [isAddDebtorOpen, setIsAddDebtorOpen] = useState(false);
  return (
    <div className="w-full min-w-0 overflow-x-clip">
      <div className="pb-space-component-padding-md">
        <TopNavigation
          buttonLabel="add Debtor"
          onButtonClick={() => setIsAddDebtorOpen(true)}
        />
      </div>

      {isAddDebtorOpen && (
        <AddDebtor onClose={() => setIsAddDebtorOpen(false)} />
      )}

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

      <div className="border-t border-t-border-default pb-space-component-padding-sm">
        <Link to="/debtor">
          {debtors.map((debtor) => (
            <DebtorCard key={debtor.id} {...debtor} />
          ))}
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
