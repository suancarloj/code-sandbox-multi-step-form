import * as React from "react";
import { useField, Field } from "react-final-form";
import cx from "classnames";

type PageProps = {
  onSubmit?: () => Promise<any>;
  path: string;
};

export function SummaryPage(props: PageProps) {
  const { input, meta } = useField("zip");

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto"
      onSubmit={props.onSubmit}
    >
      <div>
        <div className="mb-6">
          <label
            htmlFor="zip"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Summary
          </label>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            submit
          </button>
        </div>
      </div>
    </form>
  );
}

SummaryPage.validateForm = function(form: any) {
  console.log("validate Page 1 form", form);
  const errors: { [key: string]: string } = {};
  if (!form.zip) {
    errors.agreedTermsAndCondition = "required";
  }
  return errors;
};

export default SummaryPage;
