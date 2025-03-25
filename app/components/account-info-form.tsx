"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { accountFormSubmit } from "../actions/account-form-submit";
import { accountFormSchema } from "../utils/types/schemas";
import { FormState } from "../actions/form-submit";

export default function AccountInfoForm({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  const initialState: FormState = {
    message: "",
    success: false,
  };

  const [state, formAction, pending] = useActionState(
    accountFormSubmit,
    initialState
  );
  const [inEdit, setInEdit] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<z.output<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful && state.success) {
      reset();
    }
  }, [reset, isSubmitSuccessful, state.success]);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={formAction}
      ref={formRef}
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(() => {
          startTransition(() => formAction(new FormData(formRef.current!)));
        })(evt);
      }}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nume si Prenume
              </label>
              <div className="mt-2">
                <input
                  {...register("name")}
                  readOnly={!inEdit}
                  defaultValue={fullName}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={`block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${
                    !inEdit ? "bg-gray-300" : "bg-white"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  disabled
                  defaultValue={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`block w-full rounded-md  px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 bg-gray-300 `}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        {inEdit && (
          <div className="flex justify-end gap-x-6">
            <button
              onClick={() => setInEdit(false)}
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button
              disabled={pending}
              type="submit"
              className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 `}
            >
              Save
            </button>
          </div>
        )}

        {!inEdit && (
          <button
            type="button"
            onClick={() => setInEdit(true)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </button>
        )}
        <p aria-live="polite" className="text-red-500">
          {state?.message}
        </p>
      </div>
    </form>
  );
}
