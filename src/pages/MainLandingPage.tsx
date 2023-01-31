import { MutableRefObject, useRef } from "react";
import Navbar from "components/landing-page/Navbar";
import Hero from "components/landing-page/Hero";
import Features from "components/landing-page/Features";
import Highlights from "components/landing-page/Highlights";
import OurTeam from "components/landing-page/OurTeam";
import Timeline from "components/landing-page/Timeline";
import Contact from "components/landing-page/Contact";
import MailingList from "components/landing-page/MailingList";
import ChatSupport from "components/landing-page/ChatSupport";

const Home = () => {
  const smoothScrollToDiv = (ref: MutableRefObject<HTMLInputElement>) =>
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToDiv = (ref: MutableRefObject<HTMLInputElement>) =>
    window.scrollTo(0, ref.current.offsetTop);

  const elNav = useRef() as MutableRefObject<HTMLInputElement>;
  const elHighlights = useRef() as MutableRefObject<HTMLInputElement>;
  const elFeatures = useRef() as MutableRefObject<HTMLInputElement>;
  const elOurTeam = useRef() as MutableRefObject<HTMLInputElement>;
  const elContact = useRef() as MutableRefObject<HTMLInputElement>;

  return (
    <div>
      <Navbar
        innerRef={elNav}
        clickHighlights={() => smoothScrollToDiv(elHighlights)}
        clickFeatures={() => smoothScrollToDiv(elFeatures)}
        clickOurTeam={() => smoothScrollToDiv(elOurTeam)}
        clickContact={() => smoothScrollToDiv(elContact)}
      />
      <Hero />
      <Highlights innerRef={elHighlights} />
      <Features innerRef={elFeatures} />
      <OurTeam innerRef={elOurTeam} />
      <Timeline />
      <MailingList innerRef={elContact} />
      <Contact />
      <ChatSupport />
    </div>
  );
};

export default Home;
