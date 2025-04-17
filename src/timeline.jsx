import React from "react";

const Timeline = () => {
  const timeline = [
    {
      year: "Freshman Year",
      color: "bg-green-100",
      items: [
        "Maintain GPA above 3.5",
        "Join a sport and a club",
        "Track community service hours",
        "Start a personal development log"
      ],
    },
    {
      year: "Sophomore Year",
      color: "bg-yellow-100",
      items: [
        "Take the PSAT",
        "Begin SAT/ACT prep",
        "Step into leadership roles",
        "Build a volunteering resume"
      ],
    },
    {
      year: "Junior Year",
      color: "bg-blue-100",
      items: [
        "Take SAT/ACT",
        "Apply for USAFA Summer Seminar",
        "Request letters of recommendation",
        "Track CFA progress (pushups, situps, run)"
      ],
    },
    {
      year: "Senior Year",
      color: "bg-purple-100",
      items: [
        "Complete USAFA application",
        "Prepare for nomination interviews",
        "Submit required essays and forms",
        "Keep up with academics and athletics"
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white p-10">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-10">
        🛫 USAFA Application Timeline
      </h1>
      <div className="max-w-4xl mx-auto space-y-10">
        {timeline.map((stage, index) => (
          <div key={index} className={`rounded-xl shadow-lg p-6 ${stage.color}`}>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">{stage.year}</h2>
            <ul className="list-disc pl-5 text-blue-700 space-y-2">
              {stage.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;