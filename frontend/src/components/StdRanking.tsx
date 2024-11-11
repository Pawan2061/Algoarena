import { person1, person2, person3 } from "../assets";

const StdRanking = () => {
  const contents = [
    {
      id: 1,
      img: person1,
      name: "Harkirat Bhaiya",
      Points: 100000,
      Attended: 200,
    },
    {
      id: 2,
      img: person1,
      name: "Siddhu",
      Points: 10,
      Attended: 200,
    },
    {
      id: 3,
      img: person2,
      name: "Dipen",
      Points: 10,
      Attended: 200,
    },
    {
      id: 4,
      img: person3,
      name: "Pawan",
      Points: 10,
      Attended: 200,
    },
    {
      id: 5,
      img: person3,
      name: "Rohit Sharma",
      Points: 5000,
      Attended: 150,
    },
    {
      id: 6,
      img: person1,
      name: "Ankit Verma",
      Points: 1200,
      Attended: 180,
    },
    {
      id: 7,
      img: person1,
      name: "Meera Singh",
      Points: 800,
      Attended: 50,
    },
    {
      id: 8,
      img: person3,
      name: "Manish Gupta",
      Points: 3000,
      Attended: 220,
    },
    {
      id: 9,
      img: person1,
      name: "Vikram Singh",
      Points: 1500,
      Attended: 75,
    },
    {
      id: 10,
      img: person2,
      name: "Suresh Mehta",
      Points: 700,
      Attended: 90,
    },
  ];

  return (
    <div className="w-full md:w-[80%] lg:w-[27%] mx-auto px-4 md:px-0 hidden md:block">
      <div className="bg-[#0A0B10] p-4 md:p-7 rounded-xl min-h-screen">
        <div className="flex justify-center mb-6">
          <h2 className="bg-[#324CCD] text-white text-center px-4 py-2 rounded text-sm md:text-base">
            Top Students Ranking
          </h2>
        </div>

        <div className="space-y-4 md:space-y-5">
          {contents.map((student) => (
            <div
              key={`${student.id}-${student.name}`}
              className="flex items-center gap-4 md:gap-8 p-2 hover:bg-[#282828] rounded-lg transition-colors"
            >
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                  src={student.img}
                  alt={`${student.name}'s profile`}
                />
              </div>

              <div className="flex-grow min-w-0">
                <h3 className="text-white font-bold text-sm md:text-base truncate">
                  {student.name}
                </h3>
                <div className="flex flex-wrap gap-2 text-[10px] md:text-xs text-gray-300">
                  <p className="flex items-center">
                    <span className="font-medium">Points:</span>
                    <span className="ml-1">
                      {student.Points.toLocaleString()}
                    </span>
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium">Attended:</span>
                    <span className="ml-1">{student.Attended}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StdRanking;
