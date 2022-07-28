import React from "react";

// form component with a destructed object
export default function Form({
  cancel,
  errors,
  submit,
  submitButtonText,
  elements,
}) {
  // create the handleSubmit function
  function handleSubmit(e) {
    e.preventDefault();
    submit();
  }
  // create the handleCancel
  function handleCancel(e) {
    e.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div>
          <button type="submit" className="button">
            {submitButtonText}
          </button>
          <button onClick={handleCancel} className="button button-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function ErrorDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation errors</h3>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }
  return errorsDisplay;
}
