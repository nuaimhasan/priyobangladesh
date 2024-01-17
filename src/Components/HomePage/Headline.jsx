/* eslint-disable react/no-unknown-property */

export default function Headline() {
  return (
    <div className="bg-white">
      <div className="container">
        {/* breaking news */}
        <div className="flex items-center">
          <div className="bg-gray-100 py-1  px-2 font-medium ">
            <p>Headline</p>
          </div>
          <marquee behavior="scroll" direction="left">
            <div className="flex items-center gap-5 text-sm text-black">
              <h1 className="text-primary font-medium">Breaking News :</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla
                esse molestias facere autem minima odit rem obcaecati.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Consequuntur fuga sapiente, ex ab doloremque vel.
              </p>
            </div>
          </marquee>
        </div>
      </div>
    </div>
  );
}
