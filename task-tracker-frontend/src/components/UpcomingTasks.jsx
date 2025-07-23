import "cally";
function UpcomingTasks({ Tasks }) {
  return (
    <div className="p-6 mx-auto w-full max-w-7xl bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-2">
        <h2 className="flex gap-2 items-center text-xl font-bold text-purple-700">
          Upcoming Tasks
        </h2>
      </div>
      <p className="text-sm text-gray-500">active tasks, 0 completed</p>
      <calendar-date class="mt-4 mr-5 ml-8 border shadow-lg w- cally bg-base-200 border-base-400 rounded-box">
        <svg
          aria-label="Previous"
          class="fill-current size-4"
          slot="previous"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
        </svg>
        <svg
          aria-label="Next"
          class="fill-current size-4"
          slot="next"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
        </svg>
        <calendar-month></calendar-month>
      </calendar-date>
      {Tasks}
    </div>
  );
}
export default UpcomingTasks;
