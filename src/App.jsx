import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Timeline from './Timeline';

const App = () => {
  const [grades, setGrades] = useState({ english: '', bio: '', history: '', spanish: '', algebra: '' });
  const [goals, setGoals] = useState({ fitness: false, leadership: false, volunteering: false, academics: false });
  const [quote, setQuote] = useState('');
  const [dailyLog, setDailyLog] = useState('');
  const [weeklyFocus, setWeeklyFocus] = useState('');
  const [logStreak, setLogStreak] = useState(0);
  const [lastLogDate, setLastLogDate] = useState(null);
  const [badges, setBadges] = useState([]);
  const [milestones, setMilestones] = useState('');
  const [visionBoard, setVisionBoard] = useState('');
  const [scheduler, setScheduler] = useState([]);
  const [xp, setXp] = useState(0); 
  const [level, setLevel] = useState(1); 
  const [completedTasks, setCompletedTasks] = useState(0); 
  const [pomodoroTimer, setPomodoroTimer] = useState(false); 
  const [visionBoardImage, setVisionBoardImage] = useState(null); 
  const [milestonesCompleted, setMilestonesCompleted] = useState(0); 
  const [learningResources, setLearningResources] = useState([]); 
  const [leaderboard, setLeaderboard] = useState([]); 
  const [notifications, setNotifications] = useState([]);

  const handleGradeChange = (e) => {
    const { name, value } = e.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [name]: value,
    }));
  };
  
  const handleGoalToggle = (e) => {
    const { name, checked } = e.target;
    setGoals((prevGoals) => ({
      ...prevGoals,
      [name]: checked,
    }));
  };
  const quotes = [
    "Integrity first, service before self, excellence in all we do.",
    "Push yourself, because no one else is going to do it for you.",
    "Dream big, train hard, fly high.",
    "Discipline is the bridge between goals and accomplishment.",
  ];

  useEffect(() => {
    const loadData = async () => {
    };
    loadData();
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const getCountdown = () => {
    const deadline = new Date('2026-12-31');
    const now = new Date();
    const diff = deadline - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    return `${months} months, ${days % 30} days remaining`;
  };

  const calculateGPA = () => {
    const gradeToPoint = {
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      D: 1.0,
      F: 0.0,
    };

    const points = Object.values(grades)
      .map((grade) => gradeToPoint[grade.trim()] ?? null)
      .filter((point) => point !== null);
    return points.length ? (points.reduce((a, b) => a + b, 0) / points.length).toFixed(2) : 'N/A';
  };

  const gpaChartData = {
    labels: ['A', 'B', 'C', 'D', 'F'],
    datasets: [
      {
        label: 'GPA Breakdown',
        data: Object.values(grades).map((grade) => {
          switch (grade) {
            case 'A': return 1;
            case 'B': return 1;
            case 'C': return 1;
            default: return 0;
          }
        }),
        backgroundColor: ['#4CAF50', '#FFC107', '#FF5722', '#D32F2F'],
      },
    ],
  };

  // Function to calculate XP based on completed tasks
  const calculateXP = (completedTasks) => {
    return completedTasks * 10; // 10 XP per task completed
  };

  const startPomodoro = () => {
    setPomodoroTimer(true);
    setTimeout(() => {
      alert('Pomodoro session completed! Take a break.');
      setPomodoroTimer(false);
    }, 25 * 60 * 1000); // 25-minute timer
  };

  const completeMilestone = () => {
    setMilestonesCompleted(milestonesCompleted + 1);
    setXp(xp + 50); 
  };

  return (
  <Router>
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-700">USAFA Dash</h1>
      <div className="space-x-6">
        <a href="/" className="text-blue-600 font-medium hover:text-blue-800 transition-all">Dashboard</a>
        <a href="/timeline" className="text-blue-600 font-medium hover:text-blue-800 transition-all">Timeline</a>
      </div>
    </nav>
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 p-10 flex justify-center items-center">
          <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-10 transform transition-all duration-500 hover:scale-105">
            <div className="text-center mb-8">
              <h1 className="text-5xl font-extrabold text-blue-900 mb-4 tracking-tight">🇺🇸 USAFA Dashboard</h1>
              <p className="text-lg text-gray-400 italic mb-6">"{quote || "Stay focused and work hard!"}"</p>
              <p className="text-xl font-semibold text-blue-800">🎯 Application Countdown: {getCountdown()}</p>
              <p className="text-xl font-semibold text-blue-600">🔥 Log Streak: {logStreak} days</p>

              {/* Pomodoro Timer Button */}
              <button 
                onClick={startPomodoro} 
                className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-blue-600 transition-all"
              >
                {pomodoroTimer ? "Pomodoro in Progress..." : "Start Pomodoro Timer"}
              </button>
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

              {/* Weekly Milestones */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">🧭 Weekly Milestones</h2>
                <button 
                  onClick={completeMilestone} 
                  className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-all"
                >
                  Complete Milestone (+50 XP)
                </button>
                <p className="text-lg text-blue-600">Milestones Completed: {milestonesCompleted}</p>
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
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">📚 Learning Resources</h2>
                <ul>
                  {learningResources.length > 0 ? learningResources.map((resource, i) => (
                    <li key={i} className="text-blue-500">
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.title}</a>
                    </li>
                  )) : <p>No learning resources available yet.</p>}
                </ul>
              </div>

              <hr className="my-8 border-t border-blue-300" />

              {/* Leaderboard Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">🏆 Leaderboard</h2>
                <ul>
                  {leaderboard.length > 0 ? leaderboard.map((user, i) => (
                    <li key={i} className="text-blue-600">
                      {user.name}: {user.xp} XP
                    </li>
                  )) : <p>No leaderboard data available yet.</p>}
                </ul>
              </div>

              {/* Vision Board */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">🌌 Vision Board</h2>
                <textarea
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 shadow-md focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={visionBoard}
                  onChange={(e) => setVisionBoard(e.target.value)}
                  placeholder="Your dreams, goals, inspiration..."
                />
                <input
                  type="file"
                  onChange={(e) => setVisionBoardImage(URL.createObjectURL(e.target.files[0]))}
                  className="mt-4"
                />
                {visionBoardImage && <img src={visionBoardImage} alt="Vision Board" className="w-32 h-32 mt-4" />}
              </div>

              <hr className="my-8 border-t border-blue-300" />

              {/* Notifications */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">🔔 Notifications</h2>
                <ul>
                  {notifications.length > 0 ? notifications.map((notification, i) => (
                    <li key={i} className="text-blue-600">
                      {notification}
                    </li>
                  )) : <p>No new notifications.</p>}
                </ul>
              </div>

              {/* XP */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-blue-700 mb-4">🎯 Task Tracker</h2>
                <button
                  onClick={() => {
                    setCompletedTasks(completedTasks + 1);
                    setXp(xp + 10);
                  }}
                  className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all"
                >
                  Complete Task (+10 XP)
                </button>
                <p className="text-lg text-blue-600">Completed Tasks: {completedTasks}</p>
                <p className="text-lg text-blue-600">Total XP: {xp}</p>
              </div>
            </form>
          </div>
        </div>
      } />
      <Route path="/timeline" element={<Timeline />} />
    </Routes>
  </Router>
);

export default App;