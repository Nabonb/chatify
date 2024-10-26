const GenderCheckbox = () => {
  return (
    <div className="flex p-2">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox border-slate-700"
          />
        </label>
      </div>
      <div className="form-control ms-2">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox border-slate-700"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
