import React from "react";
import report from "../../../assets/report.png"
import recoverd from "../../../assets/recovered.png"
import connect from "../../../assets/connect.png"
const HowItWorks = () => {
  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={recoverd}
            alt="Step 1"
            className="w-16 h-16 mb-4"
          />
          <h3 className="font-semibold">Step 1: Report</h3>
          <p className="text-gray-600">
            Post details about the lost or found item.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img
            src={connect}
            alt="Step 2"
            className="w-16 h-16 mb-4"
          />
          <h3 className="font-semibold">Step 2: Connect</h3>
          <p className="text-gray-600">
            Connect with the person who reported it.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img
            src={recoverd}
            alt="Step 3"
            className="w-16 h-16 mb-4"
          />
          <h3 className="font-semibold">Step 3: Recover</h3>
          <p className="text-gray-600">Safely recover or return the item.</p>
        </div>
      </div>
      <div className="text-center mt-6">
        <button className="btn btn-neutral">Learn More</button>
      </div>
    </section>
  );
};

export default HowItWorks;
