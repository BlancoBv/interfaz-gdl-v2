import { FC, ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: FC<{ children?: ReactNode; scrollAreaID?: string }> = ({
  children,
  scrollAreaID,
}) => {
  const location = useLocation();

  console.log(location);

  useEffect(() => {
    if (scrollAreaID) {
      const element = document.getElementById("scroll-area");
      element?.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  return <>{children}</>;
};
export default ScrollToTop;
