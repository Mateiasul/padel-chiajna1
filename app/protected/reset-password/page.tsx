import { FormMessage, Message } from "../../components/form-message";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <div>
        <label
          htmlFor="new password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Email
        </label>
        <div className="mt-2">
          <input
            required
            id="new password"
            name="new password"
            type="password"
            placeholder="New password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <label
          htmlFor="confirm password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Email
        </label>
        <div className="mt-2">
          <input
            required
            id="confirm password"
            name="confirm password"
            type="password"
            placeholder="Confirm password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
      <button
        formAction={"/"}
        type="button"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Reset password
      </button>

      <FormMessage message={searchParams} />
    </form>
  );
}
