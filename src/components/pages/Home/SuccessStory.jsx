import React from "react";

const SuccessStory = () => {
  return (
    <section className="bg-gray-100 pb-5">
      <h2 className="text-3xl font-bold text-center mb-6">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Lost Wallet Found</h3>
          <p className="text-gray-600 mt-2">
            "Thanks to this platform, I found my lost wallet in a nearby café!"
            - Hibad.
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Keys Returned</h3>
          <p className="text-gray-600 mt-2">
            "A stranger found my keys and returned them through this app.
            Amazing service!" - Limon.
          </p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Missing Cat Found</h3>
          <p className="text-gray-600 mt-2">
            "I posted about my missing cat, and someone contacted me the next
            day!" - Nisika.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SuccessStory;
