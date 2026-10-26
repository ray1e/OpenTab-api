import { Card, CardContent } from "@/components/ui/card";

import { Users, TrendingDown, ArrowRight } from "lucide-react";

function HomePage() {
  return (
    <>
      <div className="py-space-component-padding-md px-space-component-padding-md">
        <Card className="bg-surface-primary-card flex w-full p-space-component-padding-md rounded-card-debts-summary">
          <CardContent className="p-1 md:grid md:grid-cols-5 md:gap-x-1 md:items-center justify-between">
            <div className="flex flex-col md:pr-8 md:col-span-2">
              <span className="text-text-subtle">Outstanding Debts</span>
              <span className="text-text-on-action text-h5">Ksh 2,000</span>
            </div>

            {/*stat cards -1 */}
            <div className="flex flex-row gap-6 md:col-span-2 px-2 justify-center items-center bg-surface-on-action-subtle rounded-card-subtle-stat">
              <div className="flex gap-1 items-center justify-center">
                <span className="text-icon-on-action p-x-2">
                  <TrendingDown />
                </span>
                <div className="flex flex-col p-stat-card-padding-sm">
                  <span className="text-text-on-action-subtle text-paragraph-sm-regular">
                    Unpaid Debts
                  </span>
                  <span className="text-text-on-action text-paragraph-lg-bold">
                    25
                  </span>
                </div>
              </div>

              <span
                className="h-8 w-px self-center bg-border-divider"
                aria-hidden="true"
              />

              {/*stat cards -1 */}
              <div className="flex gap-1 items-center justify-center">
                <span className="text-icon-on-action">
                  <Users />
                </span>

                <div className="flex flex-col  p-stat-card-padding-sm">
                  <span className="text-text-on-action-subtle text-paragraph-sm-regular">
                    Customers
                  </span>
                  <span className="text-text-on-action text-paragraph-lg-bold">
                    11
                  </span>
                </div>
              </div>
            </div>

            <span className="text-text-action md:justify-self-end-safe justify-self-end-safe">
              See more
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between px-space-component-padding-md pb-space-component-padding-md">    
        <span className="text-paragraph-lg-bold text-text-body">Customers</span>
        <div className="flex items-center justify-center gap-2">
          <span className="text-text-body text-paragraph-md-regular">
            See All
          </span>
          <ArrowRight className="w-4 h-4"/>
        </div>
      </div>

      <div className="pb-space-component-padding-sm border-t border-t-border-default">
        <div className="py-space-component-padding-sm border-b border-b-border-default">
          <div className="flex items-center justify-between px-space-component-padding-sm">
            <div className="flex items-center justify-center gap-2 p-space-component-padding-sm">
              {/*Initials*/}
              <div className="bg-surface-action h-10 w-10 rounded-full border flex items-center justify-center">
                <span className="text-text-on-action ">JN</span>
              </div>

              {/*name and phone number*/}
              <div className="flex flex-col gap-1">
                <span className="text-paragraph-md-bold text-text-body">
                  John Ngugi
                </span>
                <span className="text-paragraph-md text-text-subtle">
                  0797459821
                </span>
              </div>
            </div>

            {/*amount*/}
            <div className="flex flex-col gap-1">
              <span className="text-paragraph-md-medium text-text-body">
                Ksh. 3, 500
              </span>
              <span className="text-paragraph-md text-text-subtle">
                3 active
              </span>
            </div>
          </div>
        </div>
        <div className="py-space-component-padding-sm border-b border-b-border-default">
          <div className="flex items-center justify-between px-space-component-padding-sm">
            <div className="flex items-center justify-center gap-2 p-space-component-padding-sm">
              {/*Initials*/}
              <div className="bg-surface-action h-10 w-10 rounded-full border flex items-center justify-center">
                <span className="text-text-on-action ">JN</span>
              </div>

              {/*name and phone number*/}
              <div className="flex flex-col gap-1">
                <span className="text-paragraph-md-bold text-text-body">
                  John Ngugi
                </span>
                <span className="text-paragraph-md text-text-subtle">
                  0797459821
                </span>
              </div>
            </div>

            {/*amount*/}
            <div className="flex flex-col gap-1">
              <span className="text-paragraph-md-medium text-text-body">
                Ksh. 3, 500
              </span>
              <span className="text-paragraph-md text-text-subtle">
                3 active
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
