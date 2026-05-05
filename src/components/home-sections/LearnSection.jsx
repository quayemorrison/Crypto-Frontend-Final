import { Link } from "react-router-dom";
import learnCardOne from "../../assets/images/learn-card-1.png";
import learnCardTwo from "../../assets/images/learn-card-2.png";
import learnCardThree from "../../assets/images/learn-card-3.png";

const LearnSection = () => {
  return (
    <section className="w-full bg-[#f5f5f2] px-6 lg:px-10 py-16 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        {/* Top row */}
        <div className="grid items-start gap-8 lg:gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-[620px] text-center lg:text-left">
            <h2 className="text-[40px] md:text-[56px] lg:text-[72px] font-normal leading-[1.1] lg:leading-[0.98] tracking-[-0.04em] text-black">
              New to crypto?
              <br className="hidden lg:block" />
              Learn some
              <br className="hidden lg:block" />
              crypto basics
            </h2>
          </div>

          <div className="max-w-[560px] flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="text-[18px] lg:text-[20px] leading-[1.5] text-[#5b616e]">
              Beginner guides, practical tips, and market updates for
              first-timers, experienced investors, and everyone in
              between
            </p>

            <Link 
              to="/learn"
              className="mt-6 lg:mt-8 inline-flex items-center justify-center h-[54px] lg:h-[60px] rounded-full bg-black px-10 text-[18px] font-semibold text-white hover:bg-[#111] transition-colors w-full sm:w-auto"
            >
              Read More
            </Link>
          </div>
        </div>

        {/* Cards row */}
        <div className="mt-12 lg:mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <article className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="overflow-hidden rounded-[24px] lg:rounded-[36px] w-full">
              <img
                src={learnCardOne}
                alt="USDC article"
                className="h-[200px] lg:h-[250px] w-full object-cover"
              />
            </div>

            <h3 className="mt-5 lg:mt-6 text-[28px] lg:text-[36px] font-normal leading-[1.1] lg:leading-[1.02] tracking-[-0.04em] text-black">
              USDC: The digital
              <br className="hidden lg:block" />
              dollar for the global
              <br className="hidden lg:block" />
              crypto economy
            </h3>

            <p className="mt-4 lg:mt-6 max-w-[410px] text-[15px] lg:text-[16px] leading-[1.5] text-[#5b616e]">
              Coinbase believes crypto will be part of the
              solution for creating an open financial system
              that is both more efficient and more...
            </p>
          </article>

          {/* Card 2 */}
          <article className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="overflow-hidden rounded-[24px] lg:rounded-[36px] w-full">
              <img
                src={learnCardTwo}
                alt="Bank account article"
                className="h-[200px] lg:h-[250px] w-full object-cover"
              />
            </div>

            <h3 className="mt-5 lg:mt-6 text-[28px] lg:text-[36px] font-normal leading-[1.1] lg:leading-[1.02] tracking-[-0.04em] text-black">
              Can crypto really
              <br className="hidden lg:block" />
              replace your
              <br className="hidden lg:block" />
              bank account?
            </h3>

            <p className="mt-4 lg:mt-6 max-w-[410px] text-[15px] lg:text-[16px] leading-[1.5] text-[#5b616e]">
              If you’re a big enough fan of crypto, you’ve
              probably heard the phrase “be your own bank”
              or the term “bankless” — the idea being that...
            </p>
          </article>

          {/* Card 3 */}
          <article className="flex flex-col items-center lg:items-start text-center lg:text-left md:col-span-2 lg:col-span-1">
            <div className="overflow-hidden rounded-[24px] lg:rounded-[36px] w-full">
              <img
                src={learnCardThree}
                alt="Best time to invest article"
                className="h-[200px] lg:h-[250px] w-full object-cover"
              />
            </div>

            <h3 className="mt-5 lg:mt-6 text-[28px] lg:text-[36px] font-normal leading-[1.1] lg:leading-[1.02] tracking-[-0.04em] text-black underline decoration-[2px] underline-offset-[6px]">
              When is the best time
              <br className="hidden lg:block" />
              to invest in crypto?
            </h3>

            <p className="mt-4 lg:mt-6 max-w-[410px] text-[15px] lg:text-[16px] leading-[1.5] text-[#5b616e]">
              Cryptocurrencies like Bitcoin can experience
              daily (or even hourly) price volatility. As with
              any kind of investment, volatility may cause...
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default LearnSection;
