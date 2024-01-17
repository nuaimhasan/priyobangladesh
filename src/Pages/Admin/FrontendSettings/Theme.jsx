import BreadCrumb from "../../../Components/UI/BreadCrumb";

export default function Theme() {
  return (
    <div>
      <div className="lg:hidden flex">
        <BreadCrumb maxSegmentsToShow={3} />
      </div>

      <div className="bg-white rounded-md shadow-lg">
        <div className="p-5">
          <h1 className="text-xl font-semibold text-center">Theme Info</h1>

          <form action="" className="my-10">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">

              <div className="flex flex-col gap-1">
                <label htmlFor="primary">Primary</label>
                <input
                  type="text"
                  id="primary"
                  name="primary"
                  placeholder="Enter Primary Color"
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="secondary">Secondary</label>
                <input
                  type="text"
                  id="secondary"
                  name="secondary"
                  placeholder="Enter Secondary Color"
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="accent">Accent</label>
                <input
                  type="text"
                  id="accent"
                  name="accent"
                  placeholder="Enter Accent Color"
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="neutral">Neutral</label>
                <input
                  type="text"
                  id="neutral"
                  name="neutral"
                  placeholder="Enter Neutral Color"
                  className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-primary placeholder:text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-5">
              <button
                type="submit"
                className="bg-primary text-white px-3 py-2 rounded-md uppercase sm:w-1/4"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
