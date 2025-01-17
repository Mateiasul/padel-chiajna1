import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "Ce este padelul și cum se joacă?",
    answer:
      "Padelul este un sport de rachetă popular, asemănător cu tenisul și squash-ul, care se joacă pe un teren mai mic, cu pereți care fac parte din joc. Este ideal pentru amatori, profesioniști și familii din Chiajna, Ilfov.",
  },
  {
    question:
      "Care sunt tarifele pentru închirierea terenului de padel în Chiajna?",
    answer:
      "Tarifele noastre competitive pentru închirierea terenului de padel încep de la [X] lei pe oră. Consultați secțiunea de prețuri sau sunați la [XXX-XXX-XXX] pentru oferte speciale și reduceri.",
  },
  {
    question: "Cum pot rezerva un teren de padel în Chiajna?",
    answer:
      "Rezervările pentru terenul de padel se fac simplu și rapid online, pe site-ul nostru, sau telefonic la [XXX-XXX-XXX]. Recomandăm să rezervați din timp pentru a evita aglomerația.",
  },
  {
    question: "Oferiți rachete și mingi de padel pentru închiriere?",
    answer:
      "Da, punem la dispoziție echipament complet pentru jocul de padel, inclusiv rachete și mingi. Contactați-ne pentru detalii sau menționați acest lucru la rezervare.",
  },
  {
    question: "Terenul de padel este acoperit sau în aer liber?",
    answer:
      "Terenul nostru de padel din Chiajna este [acoperit/în aer liber], perfect pentru joc în orice condiții meteo. Vă așteptăm cu facilități moderne.",
  },
  {
    question:
      "Organizați cursuri de padel pentru începători, copii sau avansați?",
    answer:
      "Da, oferim cursuri de padel pentru toate nivelurile, inclusiv pentru copii, începători și avansați. Verificați programul pe site-ul nostru sau sunați pentru detalii.",
  },
  {
    question: "Există vestiare și dușuri la terenul de padel din Chiajna?",
    answer:
      "Da, terenul nostru de padel este echipat cu vestiare și dușuri curate și moderne, oferind confort maxim jucătorilor.",
  },
  {
    question: "Unde este situat terenul de padel din Chiajna, Ilfov?",
    answer:
      "Terenul de padel se află în Chiajna, județul Ilfov, la adresa exactă [Strada/Locația]. Ne puteți găsi cu ușurință cu mașina, iar parcarea este gratuită.",
  },
  {
    question: "Se organizează turnee de padel sau competiții în Chiajna?",
    answer:
      "Da, organizăm turnee și competiții de padel pentru toate nivelurile de jucători. Urmăriți-ne pe site sau pe rețelele sociale pentru detalii despre evenimente viitoare.",
  },
  {
    question: "Care sunt orele de funcționare ale terenului de padel?",
    answer:
      "Terenul nostru de padel este deschis zilnic, între [ora deschidere] și [ora închidere]. Contactați-ne pentru rezervări în afara acestui program.",
  },
];

export default function Faq() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="pt-6">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base/7 font-semibold">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon
                        aria-hidden="true"
                        className="size-6 group-data-[open]:hidden"
                      />
                      <MinusSmallIcon
                        aria-hidden="true"
                        className="size-6 group-[&:not([data-open])]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base/7 text-gray-600">{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
