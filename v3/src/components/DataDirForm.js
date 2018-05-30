import React from "react";
import { Field, reduxForm } from "redux-form";

const DataDirForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>New Data Directory</label>
        <div>
          <Field
            name="dataDir"
            component="input"
            type="text"
            placeholder="data4"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "simple" // a unique identifier for this form
})(DataDirForm);
