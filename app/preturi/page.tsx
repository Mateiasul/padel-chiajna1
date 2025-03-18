import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const tiers = [
  {
    name: "Abonament standard",
    id: "tier-basic",
    href: "#",
    price: { monthly: "700 Lei", annually: "400 Lei" },
    description: "Potrivit pentru orice jucator de padel",
    features: [
      "1 ora / sapt de persoana",
      "8 jucatori/ora",
      "Access vestiare",
      "Suprafata teren: 20x10m",
    ],
  },
  {
    name: "Abonament studenti",
    id: "tier-student",
    href: "#",
    price: { monthly: "500 Lei", annually: "350 Lei" },
    description: "Pentru orice student",
    features: [
      "1 ora / sapt de persoana",
      "8 jucatori/ora",
      "Access vestiare",
      "Suprafata teren: 20x10m",
    ],
  },
  {
    name: "Pret pe ora",
    id: "tier-growth",
    href: "#",
    price: { monthly: "140", annually: "140" },
    description: "Inchiriat un teren standard pentru o ora",
    features: [
      "1 ora / sapt de persoana",
      "8 jucatori/ora",
      "Access vestiare",
      "Suprafata teren: 20x10m",
    ],
  },
];

export default function Prices() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Preturi</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl sm:text-balance">
            Padel Chiajna
          </p>
        </div>

        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
                <h3
                  id={tier.id}
                  className="text-base/7 font-semibold text-gray-900"
                >
                  {tier.name}
                </h3>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-semibold tracking-tight text-gray-900">
                    {tier.price.monthly}
                  </span>
                  <span className="text-sm/6 font-semibold text-gray-600">
                    /month
                  </span>
                </p>
                <p className="mt-3 text-sm/6 text-gray-500">
                  {tier.price.annually} per month if paid annually
                </p>
                <Link
                  href={tier.href}
                  aria-describedby={tier.id}
                  className="mt-10 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm/6 font-semibold text-white shadow-2xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Cumpara
                </Link>
                <p className="mt-10 text-sm/6 font-semibold text-gray-900">
                  {tier.description}
                </p>
                <ul
                  role="list"
                  className="mt-6 space-y-3 text-sm/6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckCircleIcon
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-indigo-600"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
