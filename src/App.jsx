return (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 p-10 flex justify-center items-center">
    <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10 transform transition-all duration-500 hover:scale-105">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">🇺🇸 USAFA Dashboard</h1>
        <p className="text-lg text-gray-400 italic mb-6">"{quote}"</p>
        <p className="text-xl font-semibold text-blue-800">🎯 Application Countdown: {getCountdown()}</p>
        <p className="text-xl font-semibold text-blue-600">🔥 Log Streak: {logStreak} days</p>
      </div>

      <hr className="my-8 border-t border-blue-300" />

      <div className="bg-blue-100 p-6 rounded-3xl mb-8 text-center">
        <p className="text-xl text-blue-700">📊 Mini Dashboard Summary</p>
        <p className="text-2xl font-extrabold text-blue-900">GPA: {calculateGPA()} | Goals: {Object.values(goals).filter(g => g).length}/{Object.keys(goals).length} | Focus: {weeklyFocus || 'None'}</p>
      </div>

      <Pie data={gpaChartData} />

      <form className="space-y-6 mt-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">📚 Grades</h2>
          {Object.entries(grades).map(([subject, value]) => (
            <div key={subject} className="flex flex-col mb-4">
              <label className="capitalize font-semibold text-blue-700">{subject}</label>
              <input
                type="text"
                name={subject}
                value={value}
                onChange={handleGradeChange}
                className="border border-gray-300 rounded-xl px-4 py-3 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter grade (A-F)"
              />
            </div>
          ))}
          <p className="text-lg font-medium text-blue-700 mt-4">Calculated GPA: <span className="font-extrabold">{calculateGPA()}</span></p>
        </div>

        <hr className="my-8 border-t border-blue-300" />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">🎯 Goal Tracker</h2>
          {Object.entries(goals).map(([goal, completed]) => (
            <div key={goal} className="flex items-center space-x-3 mb-4">
              <input
                type="checkbox"
                name={goal}
                checked={completed}
                onChange={handleGoalToggle}
                className="accent-blue-500"
              />
              <label className="capitalize text-blue-700">{goal}</label>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">📈 Goal Progress</h2>
          <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
              style={{ width: `${(Object.values(goals).filter(g => g).length / Object.keys(goals).length) * 100}%` }}
            ></div>
          </div>
        </div>

        <hr className="my-8 border-t border-blue-300" />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">📝 Daily Log</h2>
          <textarea
            className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={4}
            value={dailyLog}
            onChange={(e) => setDailyLog(e.target.value)}
            placeholder="What did you accomplish today?"
          />
        </div>

        <hr className="my-8 border-t border-blue-300" />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">🔍 Weekly Focus</h2>
          <select
            className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={weeklyFocus}
            onChange={(e) => setWeeklyFocus(e.target.value)}
          >
            <option value="">Select focus</option>
            <option value="Fitness">Fitness</option>
            <option value="Academics">Academics</option>
            <option value="Leadership">Leadership</option>
            <option value="Volunteering">Volunteering</option>
          </select>
        </div>

        <hr className="my-8 border-t border-blue-300" />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">🏅 Badges</h2>
          <div className="flex flex-wrap gap-4">
            {badges.length ? badges.map((b, i) => (
              <span key={i} className="px-4 py-2 bg-yellow-300 rounded-full text-sm font-medium">{b}</span>
            )) : <p className="text-blue-500">No badges yet. Earn some by completing goals!</p>}
          </div>
        </div>

        <hr className="my-8 border-t border-blue-300" />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">🧭 Weekly Milestones</h2>
          <textarea
            className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-md focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={milestones}
            onChange={handleMilestonesChange}
            placeholder="List your weekly milestones..."
          />
        </div>

        <hr className="my-8 border-t border-blue-300" />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">🌌 Vision Board</h2>
          <textarea
            className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-md focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={visionBoard}
            onChange={handleVisionChange}
            placeholder="Your dreams, goals, inspiration..."
          />
        </div>
      </form>
    </div>
  </div>
);