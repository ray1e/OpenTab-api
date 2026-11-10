import TopNavigation from "@/components/navigation/TopNavigation.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetDebtorsQuery } from "@/debtorApi.js";
import AddDebt from "@/pages/AddDebt.jsx";
import { formatDate } from "@/utils/dateFormatter.js";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ReceiptText, FileSpreadsheet } from "lucide-react";

function DebtorProfile() {
  const [isAddDebtOpen, setIsAddDebtOpen] = useState(false);
  const { data: debtors = [], isLoading, isError } = useGetDebtorsQuery();
  const { debtorId } = useParams();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const debtor = debtors.find((debtor) => debtor._id === debtorId);
  const tabs = debtor?.tabs ?? [];
  const activeTabCount = tabs.filter((tab) => !tab.tabPaid).length;
  const currentTabs = tabs.filter((tab) => {
    if (selectedFilter === "Active") return !tab.tabPaid;
    if (selectedFilter === "Paid") return tab.tabPaid;
    return true;
  });
  return (
    <div className="flex w-full min-w-0 flex-col overflow-x-clip">
      <div className="pb-space-component-padding-md">
        <TopNavigation
          buttonLabel="Add Debt"
          onButtonClick={() => setIsAddDebtOpen(true)}
        />
      </div>

      {isAddDebtOpen && <AddDebt onClose={() => setIsAddDebtOpen(false)} />}

      {/*debtor statistics card*/}
      <div className="flex min-w-0 gap-4 px-space-component-padding-md pb-space-component-padding-md">
        <Card className="w-full items-start bg-surface-primary-card p-space-component-padding-md">
          <CardContent className="grid w-full grid-cols-1 grid-rows-3 gap-1 px-space-component-padding-sm md:grid-cols-3 md:grid-rows-1 md:items-center">
            {/*name and phone */}
            <div className="flex flex-col items-start space-y-1 whitespace-nowrap">
              <span className="text-paragraph-lg-bold text-text-on-action">
                {debtor?.name ??
                  (isLoading ? "Loading..." : "Debtor not found")}
              </span>
              {/* <span className="text-text-on-action-subtle">0797459821</span> */}
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
                {activeTabCount}
              </span>
              <span className="text-text-on-action-subtle">active debts</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Something went wrong</p>
      ) : !debtor ? (
        <p>Debtor not found.</p>
      ) : tabs.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ReceiptText />
            </EmptyMedia>
            <EmptyTitle>No Debts</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t added any debts yet. add debt to this customer.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button
              variant="default"

              className="cursor-pointer rounded-card-debtor bg-surface-action px-space-component-padding-md text-text-on-action hover:bg-surface-action-hover has-data-[icon=inline-start]:pl-space-component-padding-md max-[240px]:px-2 max-[240px]:has-data-[icon=inline-start]:pl-2"
            >
              Add Debt
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <Tabs
          defaultValue="All"
          value={selectedFilter}
          onValueChange={setSelectedFilter}
          className="w-full rounded-card-debtor bg-surface-default"
        >
          <TabsList
            className="w-1/2 gap-2 self-center rounded-full px-2 text-text-secondary bg-neutral-100"
            
          >
            <TabsTrigger
              className="cursor-pointer rounded-full  text-text-secondary not-data-active:hover:bg-surface-default-hover not-data-active:hover:text-text-body data-active:bg-surface-primary-card data-active:text-text-on-action data-active:hover:text-text-on-action-hover"
              value="All"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="Active"
              className="cursor-pointer rounded-full  text-text-secondary not-data-active:hover:bg-surface-default-hover not-data-active:hover:text-text-body data-active:bg-surface-primary-card data-active:text-text-on-action data-active:hover:text-text-on-action-hover"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="Paid"
              className="cursor-pointer rounded-full  text-text-secondary not-data-active:hover:bg-surface-default-hover not-data-active:hover:text-text-body data-active:bg-surface-primary-card data-active:text-text-on-action data-active:hover:text-text-on-action-hover"
            >
              Paid
            </TabsTrigger>
          </TabsList>
          <TabsContent value={selectedFilter} className="flex flex-col">
            {currentTabs.length === 0 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <FileSpreadsheet />
                  </EmptyMedia>
                  <EmptyTitle>No {selectedFilter} Debts</EmptyTitle>
                  <EmptyDescription>
                    {selectedFilter === "Active"
                      ? "You don't have any active debts. Add debt to this customer."
                      : "You don't have any paid debts."}
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent className="flex-row justify-center gap-2">
                  {selectedFilter === "Active" && <Button
                    variant="default"

                    className="cursor-pointer rounded-card-debtor bg-surface-action px-space-component-padding-md text-text-on-action hover:bg-surface-action-hover has-data-[icon=inline-start]:pl-space-component-padding-md max-[240px]:px-2 max-[240px]:has-data-[icon=inline-start]:pl-2"
                  >
                    Add Debt
                  </Button>}
                </EmptyContent>
              </Empty>
            ) : (
              <>
                <p className="text-sm-md-regular pr-space-component-padding-md pb-space-component-padding-sm pl-8 text-text-subtle italic">
                  Showing{" "}
                  <span className="text-text-body">{currentTabs.length}</span>{" "}
                  {selectedFilter === "All"
                    ? currentTabs.length === 1
                      ? "record"
                      : "records"
                    : selectedFilter === "Active"
                      ? currentTabs.length === 1
                        ? "active debt"
                        : "active debts"
                      : currentTabs.length === 1
                        ? "paid debt"
                        : "paid debts"}
                </p>
                {/*has all cards */}
                <div className="flex flex-col divide-y divide-border-default pb-space-component-padding-sm">
                  {currentTabs.map((tab) => (
                    <Card
                      key={tab._id}
                      className="cursor-pointer rounded-none bg-transparent shadow-none ring-0 hover:bg-surface-default-hover"
                    >
                      <CardContent className="px-space-component-padding-sm py-space-component-padding-sm">
                        <Collapsible>
                          <CollapsibleTrigger
                            render={
                              <Button
                                variant="ghost"
                                className="h-auto min-h-9 w-full cursor-pointer justify-start py-space-component-padding-sm text-left"
                              >
                                <div className="flex flex-col items-start gap-1">
                                  <span className="text-paragraph-lg-bold">
                                    Ksh. {tab.tabTotal}
                                  </span>
                                  <div className="flex items-center gap-space-component-padding-sm text-paragraph-md-regular text-text-subtle">
                                    <span>
                                      {tab.items.length}{" "}
                                      {tab.items.length > 1 ? "items" : "item"}
                                    </span>
                                    <span className="h-1 w-1 self-center rounded-full bg-border-divider-default max-[240px]:h-px max-[240px]:w-full" />
                                    <span>{formatDate(tab.dateTaken)}</span>
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
                                {tab.items.map((item) => (
                                  <div
                                    key={item._id}
                                    className="flex flex-col gap-1"
                                  >
                                    {/*items */}
                                    <div className="text-paragraph-medium-regular grid grid-cols-3 grid-rows-1 justify-between gap-x-space-component-padding-md">
                                      <span>{item.itemName}</span>
                                      <span>{item.itemPrice}</span>
                                      <span className="text-body">
                                        Ksh. {item.itemQuantity}
                                      </span>
                                    </div>
                                  </div>
                                ))}

                                <div className="grid grid-cols-3 justify-between gap-x-space-component-padding-md border-t border-t-border-default pt-space-component-padding-sm">
                                  <span className="col-span-2 text-paragraph-md-bold">
                                    Total
                                  </span>
                                  <span className="text-paragraph-md-bold">
                                    Ksh. 1,200
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default DebtorProfile;
