const GenderCheckbox = ({ handleCheckboxChange, selectGender }) => {
  return (
    <div className="flex p-2">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-700"
            onChange={() => handleCheckboxChange("male")}
            checked={selectGender === "male"}
          />
        </label>
      </div>
      <div className="form-control ms-2">
        <label
          className={`label gap-2 cursor-pointer ${
            selectGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-700"
            onChange={() => handleCheckboxChange("female")}
            checked={selectGender === "female"}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
