import TopNavigation from "@/components/navigation/TopNavigation.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";

function DebtorProfile() {
  return (
    <div className="w-full min-w-0 overflow-x-clip">
      <div className="pb-space-component-padding-md">
        <TopNavigation buttonLabel="Add Debt" />
      </div>

      {/*debtor statistics card*/}
      <div className="flex min-w-0 gap-4 px-space-component-padding-md pb-space-component-padding-md">
        <Card className="w-full items-start bg-surface-primary-card p-space-component-padding-md">
          <CardContent className="grid w-full grid-cols-1 grid-rows-3 gap-1 px-space-component-padding-sm md:grid-cols-3 md:grid-rows-1 md:items-center">
            {/*name and phone */}
            <div className="flex flex-col items-start space-y-1 whitespace-nowrap">
              <span className="text-paragraph-lg-bold text-text-on-action">
                John Ngugi
              </span>
              <span className="text-text-on-action-subtle">0797459821</span>
            </div>

            {/*Outstanding balance */}
            <div className="flex flex-col space-y-1 rounded-card-debtor bg-surface-on-action-subtle p-space-component-padding-sm whitespace-nowrap max-[240px]:w-fit">
              <span className="text-text-on-action-subtle">
                Outstanding balance
              </span>
              <span className="text-paragraph-lg-bold text-text-on-action">
                Ksh. 6,000
              </span>
            </div>

            {/*active debts */}
            <div className="flex items-center space-x-1 whitespace-nowrap md:flex-col-reverse md:justify-center">
              <span className="text-paragraph-lg-bold text-text-on-action-subtle md:text-paragraph-md-bold md:text-text-on-action">
                30
              </span>
              <span className="text-text-on-action-subtle">active debts</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/*has all cards */}
      <div className="flex flex-col border-t border-border-default pb-space-component-padding-sm">
        <Card className="cursor-pointer rounded-none border-b border-b-border-default bg-transparent shadow-none ring-0 hover:bg-surface-default-hover">
          <CardContent className="px-space-component-padding-sm py-space-component-padding-sm">
            <Collapsible>
              <CollapsibleTrigger
                render={
                  <Button
                    variant="ghost"
                    className="h-auto min-h-9 w-full cursor-pointer justify-start py-space-component-padding-sm text-left"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-paragraph-lg-bold">Ksh. 850</span>
                      <div className="flex items-center gap-space-component-padding-sm text-paragraph-md-regular text-text-subtle">
                        <span>1 item</span>
                        <span className="h-1 w-1 self-center rounded-full bg-border-divider-default max-[240px]:h-px max-[240px]:w-full"/>
                        <span>18 May 2026</span>
                      </div>
                    </div>
                    <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180" />
                  </Button>
                }
              />
              <CollapsibleContent className="flex flex-col gap-2 border-t border-t-border-default p-space-component-padding-sm pt-space-component-padding-sm">
                <div className="overflow-auto">
                  <div className="min-w-64 whitespace-nowrap">
                    {/*item headings */}
                    <div className="grid grid-cols-3 grid-rows-1 justify-between gap-x-space-component-padding-md pb-space-component-padding-sm text-paragraph-md-medium">
                      <span>Item</span>
                      <span>Quantity</span>
                      <span>Price</span>
                    </div>

                    {/*item container */}
                    <div className="flex flex-col gap-1">
                      {/*items */}
                      <div className="text-paragraph-medium-regular grid grid-cols-3 grid-rows-1 justify-between gap-x-space-component-padding-md">
                        <span>Rice</span>
                        <span>1</span>
                        <span className="text-body">Ksh. 450</span>
                      </div>
                      <div className="text-paragraph-medium-regular grid grid-cols-3 grid-rows-1 justify-between gap-x-space-component-padding-md">
                        <span>Milk 2L</span>
                        <span>1</span>
                        <span className="text-body">Ksh. 50</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 justify-between gap-x-space-component-padding-md border-t border-t-border-default pt-space-component-padding-sm">
                      <span className="col-span-2 text-paragraph-md-bold">
                        Total
                      </span>
                      <span className="text-paragraph-md-bold">Ksh. 1,200</span>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DebtorProfile;
