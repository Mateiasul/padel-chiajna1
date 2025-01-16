import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <figure className="mx-auto max-w-2xl">
        <p className="sr-only">5 out of 5 stars</p>
        <div className="flex gap-x-1 text-indigo-600">
          <StarIcon aria-hidden="true" className="size-5 flex-none" />
          <StarIcon aria-hidden="true" className="size-5 flex-none" />
          <StarIcon aria-hidden="true" className="size-5 flex-none" />
          <StarIcon aria-hidden="true" className="size-5 flex-none" />
          <StarIcon aria-hidden="true" className="size-5 flex-none" />
        </div>
        <blockquote className="mt-10 text-xl/8 font-semibold tracking-tight text-gray-900 sm:text-2xl/9">
          <p>
            Terenul de padel a fost excelent! Suprafața impecabilă, iluminarea
            perfectă și atmosfera prietenoasă m-au făcut să mă bucur la maxim de
            joc. Abia aștept să revin!
          </p>
        </blockquote>
        <figcaption className="mt-10 flex items-center gap-x-6">
          <Image
            width={1000}
            height={1000}
            alt=""
            src="/rares.jpeg"
            className="size-12 rounded-full bg-gray-50"
          />
          <div className="text-sm/6">
            <div className="font-semibold text-gray-900">Rares Potcovaru</div>
            <div className="mt-0.5 text-gray-600">Jucator profesionist</div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
