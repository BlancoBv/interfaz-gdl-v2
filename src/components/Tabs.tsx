import { FC, ReactNode, useMemo, useState } from "react";

const Tabs: FC<{
  tabs: { tabName: string; content: ReactNode; id: number; show: boolean }[];
}> = ({ tabs }) => {
  const [tabActive, setTabactive] = useState<number>(1);
  const indexTab = useMemo(() => {
    const index = tabs.findIndex((el) => el.id === tabActive);
    if (index >= 0) {
      return index;
    }
    return 0;
  }, [tabActive]);
  return (
    <div className="h-96 relative">
      <div
        role="tablist"
        className="tabs tabs-bordered tabs-xs lg:tabs-md sticky top-0 bg-base-100/80 backdrop-blur-sm"
      >
        {tabs.map((tab) => {
          if (tab.show) {
            return (
              <div
                role="tab"
                className={`tab ${tabActive === tab.id ? "tab-active" : ""}`}
                onClick={() => {
                  setTabactive(tab.id);
                }}
                key={`Tab ${tab.id}`}
              >
                {tab.tabName}
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="p-10 overflow-y-auto">{tabs[indexTab].content}</div>
    </div>
  );
};
export default Tabs;
