import * as React from "react";
import { useField, Field } from "react-final-form";
import cx from "classnames";

type PageProps = {
  onSubmit?: () => Promise<any>;
  path: string;
};

function StreetPage(props: PageProps) {
  const { input, meta } = useField("street");

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto"
      onSubmit={props.onSubmit}
    >
      <div>
        <div className="mb-6">
          <label
            htmlFor="street"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Street
          </label>
          <Field
            component="input"
            type="text"
            name="street"
            className={cx(
              "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",
              {
                "border-red-500": meta.touched && meta.error
              }
            )}
          />
          {meta.touched && meta.error && (
            <p className="text-red-500 text-xs italic">{meta.error}</p>
          )}
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

StreetPage.validateForm = function(form: any) {
  console.log("validate Street form", form);
  const errors: { [key: string]: string } = {};
  if (!form.street) {
    errors.street = "required";
  }
  return errors;
};

export default StreetPage;
