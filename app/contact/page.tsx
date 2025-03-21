"use client";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import useSupabaseBrowserClient from "../utils/supabase/client";

interface IFormInput {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  text: string;
}

export default function Contact() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => handleFormSubmit(data);
  const supabase = useSupabaseBrowserClient();

  async function handleFormSubmit(values: IFormInput) {
    const { firstName, lastName, phone, email, text } = values;
    try {
      const { error } = await supabase
        .from("contactUs")
        .insert({ firstName, lastName, phone, email, text });
      if (error) {
        throw error;
      }
      alert("Form submitted successfully");
      reset();
    } catch (error) {
      console.log("Error occurred", { error });
    }
  }

  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
              </svg>
            </div>
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Contacteaza-ne
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Ai întrebări sau vrei să faci o rezervare? Completează formularul
              și te vom contacta în cel mai scurt timp!
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  Intrarea Nicolae Iorga 88
                  <br /> Chiajna 077040
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  <Link
                    href="tel:+40 741 576 619"
                    className="hover:text-gray-900"
                  >
                    +40 741 576 619
                  </Link>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  <Link
                    href="mailto:hello@example.com"
                    className="hover:text-gray-900"
                  >
                    padel_chiajna@contact.ro
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="#"
          method="POST"
          className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    {...register("firstName", {
                      required: true,
                      maxLength: 20,
                    })}
                    placeholder="First name"
                    aria-invalid={errors.firstName ? "true" : "false"}
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                  {errors.firstName?.type === "required" && (
                    <p role="alert" className="text-red-400">
                      First name is required
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    {...register("lastName", {
                      pattern: /^[A-Za-z]+$/i,
                      required: true,
                    })}
                    name="lastName"
                    placeholder="Last name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    aria-invalid={errors.lastName ? "true" : "false"}
                  />
                  {errors.lastName?.type === "required" && (
                    <p role="alert" className="text-red-400">
                      Last name is required
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    placeholder="xxxxx@gmail.com"
                    aria-invalid={errors.email ? "true" : "false"}
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                  {errors.email?.type === "required" && (
                    <p role="alert" className="text-red-400">
                      Email is required
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    type="tel"
                    placeholder="0723......."
                    {...register("phone", { required: true })}
                    aria-invalid={errors.phone ? "true" : "false"}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                  />
                  {errors.phone?.type === "required" && (
                    <p role="alert" className="text-red-400">
                      Phone is required
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    {...register("text", { required: true })}
                    rows={4}
                    aria-invalid={errors.text ? "true" : "false"}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    defaultValue={""}
                  />
                  {errors.text?.type === "required" && (
                    <p role="alert" className="text-red-400">
                      Text is required
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
