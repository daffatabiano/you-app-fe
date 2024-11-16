export default function EditForm({
  handleCreateProfile,
  handleChange,
  horoscope,
  zodiac,
}: any) {
  return (
    <form
      onSubmit={handleCreateProfile}
      className="flex flex-col gap-8 h-full pb-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-md">About</h1>
        <button
          type="submit"
          className="text-sm capitalize text-[#efd5aa] bg-transparent">
          save & update
        </button>
      </div>

      <div className="gap-4 flex flex-col">
        <div className="w-full flex gap-4 items-center">
          <div className="relative rounded-3xl w-16 h-16 bg-white/10 flex justify-center items-center">
            <p className="text-2xl text-extralight  text-[#efd5aa]">+</p>
            <input type="file" className="absolute w-full h-full opacity-0" />
          </div>
          <p className="text-extralight">add image</p>
        </div>

        <div className="flex flex-col gap-2">
          <InputEdit
            placeholder="Enter Name"
            onChange={handleChange}
            label="Display Name"
            name="displayName"
            type="text"
          />
          <div className="flex justify-between w-full items-center">
            <label className="text-extralight w-[100px] text-white/30">
              Gender :
            </label>

            <select
              name="gender"
              id="gender"
              className=" text-end w-52 border border-white/20 p-2 placeholder:text-white/30 bg-white/5 backdrop-blur-md rounded-lg text-white focus:outline-none focus:bg-white/10">
              <option value="default" defaultChecked className="text-gray-800">
                Select Gender
              </option>
              <option value="male" className="text-gray-800">
                Male
              </option>
              <option value="female" className="text-gray-800">
                Female
              </option>
            </select>
          </div>
          <InputEdit
            onChange={handleChange}
            label="Birthday"
            name="birthday"
            type="date"
          />
          <InputEdit
            placeholder="--"
            label="Horoscope"
            name="horoscope"
            type="text"
            value={horoscope}
            className="text-white/30 capitalize"
            disabled
          />
          <InputEdit
            placeholder="--"
            label="Zodiac"
            name="zodiac"
            type="text"
            value={zodiac}
            className="text-white/30 capitalize"
            disabled
          />
          <InputEdit
            placeholder="Add height"
            label="Height"
            name="height"
            onChange={handleChange}
            type="number"
          />
          <InputEdit
            placeholder="Add weight"
            label="Weight"
            name="weight"
            onChange={handleChange}
            type="number"
          />
        </div>
      </div>
    </form>
  );
}

function InputEdit(props: InputType) {
  const {
    label,
    name,
    type,
    placeholder,
    disabled,
    onChange,
    value,
    className,
  } = props;
  return (
    <div className="flex justify-between w-full items-center">
      <label className="text-extralight w-[150px] text-white/30">
        {label} :
      </label>
      <input
        onChange={onChange}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        className={`${className} text-end w-52 border border-white/20 p-2 placeholder:text-white/30 bg-white/5 backdrop-blur-md rounded-lg text-white focus:outline-none focus:bg-white/10`}
      />
    </div>
  );
}
