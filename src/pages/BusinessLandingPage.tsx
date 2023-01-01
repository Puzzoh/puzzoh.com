import { MutableRefObject, useRef } from "react";
import BusinessNavbar from "components/landing-page/BusinessNavbar";
import StickyNavbar from "components/landing-page/StickyNavbar";
import BusinessOverview from "components/landing-page/BusinessOverview";
import BusinessPerks from "components/landing-page/BusinessPerks";
import BusinessFAQ from "components/landing-page/BusinessFAQ";

const Business = () => {
  const smoothScrollToDiv = (ref: MutableRefObject<HTMLInputElement>) =>
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToDiv = (ref: MutableRefObject<HTMLInputElement>) =>
    window.scrollTo(0, ref.current.offsetTop);

  const elBusinessNav = useRef() as MutableRefObject<HTMLInputElement>;
  const elOverview = useRef() as MutableRefObject<HTMLInputElement>;
  const elPerks = useRef() as MutableRefObject<HTMLInputElement>;
  const elFAQ = useRef() as MutableRefObject<HTMLInputElement>;

  return (
    <div>
      <BusinessNavbar />
      <StickyNavbar
        reference={elBusinessNav}
        clickOverview={() => smoothScrollToDiv(elOverview)}
        clickPerks={() => smoothScrollToDiv(elPerks)}
        clickFAQ={() => smoothScrollToDiv(elFAQ)}
      />
      <BusinessOverview
        reference={elOverview}
        clickPerks={() => smoothScrollToDiv(elPerks)}
      />
      <BusinessPerks reference={elPerks} />
      <BusinessFAQ reference={elFAQ} />
    </div>
  );
};

export default Business;
