import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CourseDetails() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="lg:text-[25px]">
          Course Details
        </AccordionTrigger>
        <AccordionContent className="lg:border-2 lg:border-dotted lg:rounded-md lg:p-5">
          <article className="lg:text-pretty lg:flex lg:flex-col lg:gap-8 lg:text-[17px]">
            <strong className="lg:text-[30px]">Technopreneurship</strong>
            <p>
              <strong>Technopreneurship (ES038)</strong> is a course mandated by
              Commission on Higher Education (CHED) to foster innovation among
              the Filipino youth. It aims to produce students who are not only
              well-versed in engineering-turning skills and knowledge into
              science and technology products, but also entrepreneurs who can
              create more jobs and contribute to the national economy. CIT
              University is currently offering Technopreneurship in three
              colleges namely the College of Engineering and Architecture,
              College of Computer Studies, and College of Management, Business
              and Accountancy.
            </p>
            <p>
              This course is mainly based on{" "}
              <strong>Disciplined Entrepreneurship</strong> by
              <strong> Bill Aulet</strong> which provides a 24-step guide on how
              to efficiently bring products to market by giving emphasis on the
              real end-user needs. Following this customer-centric approach,
              your journey in ES038 will also revolve around{" "}
              <strong>customer discovery</strong>-putting end-user needs at the
              center of an iterative product/solution development.
            </p>
            <p>
              ES038 is guided by the following{" "}
              <strong>Intended Learning Outcomes:</strong>
            </p>
            <ul className="lg:ml-5">
              <li>
                {" "}
                &#8226; Develop sound knowledge and understanding of
                entrepreneurship and innovation.
              </li>
              <li>
                {" "}
                &#8226; Demonstrate critical thinking and systems analysis
                skills to identify, evaluate and communicate strategic and
                functional issues associated with invention and
                commercialization.
              </li>
              <li>
                {" "}
                &#8226; Apply communication, interpersonal, and team skills
                necessary in business practice.
              </li>
            </ul>
            <p>
              Through the university business incubator,{" "}
              <strong>Wildcat Innovation Labs (WIL)</strong>, these learning
              outcomes are complemented by a series of events and activities in{" "}
              <strong>WildFest</strong> to gather real-world problems, validate
              solutions and promote innovations.
            </p>
            <p>
              Watch this video of Engr. Ralph Laviste, WIL Manager, to know more
              about Wildcat Innovation Labs.
            </p>
            <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/pOUJXDKmEVU?disablekb=1"
            ></iframe>
          </article>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
