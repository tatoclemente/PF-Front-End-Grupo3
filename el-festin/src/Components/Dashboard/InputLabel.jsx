

export const InputLabel = ({name,inputCreate,setInputCreate}) => {
  return (
    <div>
      <label htmlFor="" className="pe-3 pt-3 form-label">
        {name}
      </label>
      <input type="text" className="form-control" name={name} />
    </div>
  );
};
