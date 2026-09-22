import { faqs as fallbackFaqs } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Accordion } from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/ui/faq-jsonld";
import { sanityFetch } from "@/sanity/lib/live";
import { faqsQuery } from "@/sanity/lib/queries";

export async function Faq() {
  const { data } = await sanityFetch({ query: faqsQuery });
  const faqs =
    data && data.length > 0
      ? data.map((item) => ({ question: item.question ?? "", answer: item.answer ?? "" }))
      : fallbackFaqs;

  return (
    <div
      id="faq"
      className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25"
    >
      <FaqJsonLd faqs={faqs} />
      <Eyebrow>FAQ</Eyebrow>
      <h2 className="text-3xl font-semibold lg:text-[42px]">
        Common questions
      </h2>
      <Accordion items={faqs} />
    </div>
  );
}
