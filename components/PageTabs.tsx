import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the type for each tab item
interface TabItem {
  title: string; // Title of the tab
  value: string; // Unique identifier for the tab
  component: React.ReactNode; // The content to display when the tab is active
}

// Define the props for the PageTabs component
interface PageTabsProps {
  tabItems: TabItem[]; // Array of tab items
}

const PageTabs: React.FC<PageTabsProps> = ({ tabItems }) => {
  // Assuming we want to always default to the first tab if no default is specified
  const defaultValue = tabItems.length > 0 ? tabItems[0].value : "";

  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="bg-transparent p-0 w-full border-b rounded-none justify-start">
        {tabItems.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="px-12 py-3 data-[state=active]:text-foreground data-[state=active]:border-b-4 rounded-none border-primary"
          >
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabItems.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.component}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default PageTabs;
