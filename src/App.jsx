import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function App() {
  const [grades, setGrades] = useState({
    english: '',
    bio: '',
    history: '',
    spanish: '',
    algebra: '',
  });

  const [goals, setGoals] = useState({
    fitness: false,
    leadership: false,
    volunteering: false,
    academics: false,
  });

  const [quote, setQuote] = useState('');
  const [dailyLog, setDailyLog] = useState('');
  const [weeklyFocus, setWeeklyFocus] = useState('');
  const [logStreak, setLogStreak] = useState(0);
  const [lastLogDate, setLastLogDate] = useState(null);
  const [badges, setBadges] = useState([]);
  const [milestones, setMilestones] = useState('');
  const [visionBoard, setVisionBoard] = useState('');

  const quotes = [
    "Integrity first, service before self, excellence in all we do.",
    "Push yourself, because no one else is going to do it for you.",
    "Dream big, train hard, fly high.",
    "Discipline is the bridge between goals and accomplishment.",
  ];

  useEffect(() => {
    const loadData = async () => {
      const progressRef = doc(db, 'progress', 'rushil');
      const docSnap = await getDoc(progressRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.grades) setGrades(data.grades);
        if (data.goals) setGoals(data.goals);
        if (data.dailyLog) setDailyLog(data.dailyLog);
        if (data.weeklyFocus) setWeeklyFocus(data.weeklyFocus);
        if (data.logStreak) setLogStreak(data.logStreak);
        if (data.lastLogDate) setLastLogDate(data.lastLogDate);
        if (data.badges) setBadges(data.badges);
        if (data.milestones) setMilestones(data.milestones);
        if (data.visionBoard) setVisionBoard(data.visionBoard);
      }
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    };
    loadData();
  }, []);

  const handleGradeChange = (e) => {
    const { name, value } = e.target;
    const newGrades = { ...grades, [name]: value };
    setGrades(newGrades);
    setDoc(doc(db, 'progress', 'rushil'), {
      grades: newGrades,
      goals,
      dailyLog,
      weeklyFocus,
      logStreak,
      lastLogDate,
      badges,
      milestones,
      visionBoard,
    });
  };

  const handleGoalToggle = (e) => {
    const { name, checked } = e.target;
    const newGoals = { ...goals, [name]: checked };
    setGoals(newGoals);
    setDoc(doc(db, 'progress', 'rushil'), {
      grades,
      goals: newGoals,
      dailyLog,
      weeklyFocus,
      logStreak,
      lastLogDate,
      badges,
      milestones,
      visionBoard,
    });
  };

  const handleLogChange = (e) => {
    const newLog = e.target.value;
    const today = new Date().toDateString();
    let newStreak = logStreak;
    if (lastLogDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      newStreak = lastLogDate === yesterday ? logStreak + 1 : 1;
    }
    setLogStreak(newStreak);
    setLastLogDate(today);
    setDailyLog(newLog);
    setDoc(doc(db, 'progress', 'rushil'), {
      grades,
      goals,
      dailyLog: newLog,
      weeklyFocus,
      logStreak: newStreak,
      lastLogDate: today,
      badges,
      milestones,
      visionBoard,
    });
  };

  const handleFocusChange = (e) => {
    const newFocus = e.target.value;
    setWeeklyFocus(newFocus);
    setDoc(doc(db, 'progress', 'rushil'), {
      grades,
      goals,
      dailyLog,
      weeklyFocus: newFocus,
      logStreak,
      lastLogDate,
      badges,
      milestones,
      visionBoard,
    });
  };

  const handleMilestonesChange = (e) => {
    const value = e.target.value;
    setMilestones(value);
    setDoc(doc(db, 'progress', 'rushil'), {
      grades,
      goals,
      dailyLog,
      weeklyFocus,
      logStreak,
      lastLogDate,
      badges,
      milestones: value,
      visionBoard,
    });
  };

  const handleVisionChange = (e) => {
    const value = e.target.value;
    setVisionBoard(value);
    setDoc(doc(db, 'progress', 'rushil'), {
      grades,
      goals,
      dailyLog,
      weeklyFocus,
      logStreak,
      lastLogDate,
      badges,
      milestones,
      visionBoard: value,
    });
  };

  const getCountdown = () => {
    const deadline = new Date('2026-12-31'); // example deadline
    const now = new Date();
    const diff = deadline - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    return `${months} months, ${days % 30} days remaining`;
  };

  const calculateGPA = () => {
    const gradeToPoint = {
      A: 4.0,
      B: 3.0,
      C: 2.0,
      D: 1.0,
      F: 0.0,
    };
    const points = Object.values(grades)
      .map((grade) => gradeToPoint[grade.trim().toUpperCase()] ?? null)
      .filter((point) => point !== null);
    const gpa = points.length ? (points.reduce((a, b) => a + b, 0) / points.length).toFixed(2) : 'N/A';
    return gpa;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <div className="mb-4 text-center">
          <p className="text-blue-800 font-semibold">🎯 Application Countdown: {getCountdown()}</p>
          <p className="text-blue-600">🔥 Log Streak: {logStreak} days</p>
        </div>
        <hr className="my-6 border-t border-blue-200" />
        <div className="bg-blue-100 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-blue-700">📊 Mini Dashboard Summary</p>
          <p className="text-lg font-bold text-blue-900">GPA: {calculateGPA()} | Goals: {Object.values(goals).filter(g => g).length}/{Object.keys(goals).length} | Focus: {weeklyFocus || 'None'}</p>
        </div>
        <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-2">🇺🇸 USAFA Dashboard</h1>
        <p className="text-center text-blue-500 italic mb-4">"{quote}"</p>
        
        <form className="space-y-4">
          <h2 className="text-sm tracking-widest text-blue-500 font-semibold uppercase mb-1">📚 Grades</h2>
          {Object.entries(grades).map(([subject, value]) => (
            <div key={subject} className="flex flex-col">
              <label className="capitalize font-semibold text-blue-700">
                {subject}
              </label>
              <input
                type="text"
                name={subject}
                value={value}
                onChange={handleGradeChange}
                className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter letter grade (A-F)"
              />
            </div>
          ))}
          <p className="text-lg font-medium text-blue-700 mt-4">
            Calculated GPA: <span className="font-bold">{calculateGPA()}</span>
          </p>
        </form>

        <hr className="my-6 border-t border-blue-200" />
        
        <div className="mt-8">
          <h2 className="text-sm tracking-widest text-blue-500 font-semibold uppercase mb-1">🎯 Goal Tracker</h2>
          <div className="space-y-2">
            {Object.entries(goals).map(([goal, completed]) => (
              <div key={goal} className="flex items-center space-x-2">
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
          <div className="mt-8">
            <h2 className="text-sm tracking-widest text-blue-500 font-semibold uppercase mb-1">📈 Goal Progress</h2>
            <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                style={{ width: `${(Object.values(goals).filter(g => g).length / Object.keys(goals).length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-t border-blue-200" />
        
        <div className="mt-8">
          <h2 className="text-sm tracking-widest text-blue-500 font-semibold uppercase mb-1">📝 Daily Log</h2>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={4}
            value={dailyLog}
            onChange={handleLogChange}
            placeholder="What did you accomplish today?"
          ></textarea>
        </div>

        <hr className="my-6 border-t border-blue-200" />
        
        <div className="mt-8">
          <h2 className="text-sm tracking-widest text-blue-500 font-semibold uppercase mb-1">🔍 Weekly Focus</h2>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={weeklyFocus}
            onChange={handleFocusChange}
          >
            <option value="">Select focus</option>
            <option value="Fitness">Fitness</option>
            <option value="Academics">Academics</option>
            <option value="Leadership">Leadership</option>
            <option value="Volunteering">Volunteering</option>
          </select>
        </div>

        <hr className="my-6 border-t border-blue-200" />
        
        <div className="mt-8">
          <h2 className="text-sm tracking-widest text-blue-500 font-semibold uppercase mb-1">🏅 Badges</h2>
          <div className="flex flex-wrap gap-2">
            {badges.length ? badges.map((b, i) => (
              <span key={i} className="px-3 py-1 bg-yellow-300 rounded-full text-sm font-medium">{b}</span>
            )) : <p className="text-blue-500">No badges yet. Earn some by completing goals!</p>}
          </div>
        </div>

        <hr className="my-6 border-t border-blue-200" />
        
        <div className="mt-8">
          <h2 className="text-sm tracking-widest text-blue-500 font-semibold uppercase mb-1">🧭 Weekly Milestones</h2>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={milestones}
            onChange={handleMilestonesChange}
            placeholder="List your weekly milestones..."
          />
        </div>

        <hr className="my-6 border-t border-blue-200" />
        
        <div className="mt-8">
          <h2 className="text-sm tracking-widest text-blue-500 font-semibold uppercase mb-1">🌌 Vision Board</h2>
          <textarea
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
            rows={2}
            value={visionBoard}
            onChange={handleVisionChange}
            placeholder="Your dreams, goals, inspiration..."
          />
        </div>

        <hr className="my-6 border-t border-blue-200" />
        
        <div className="mt-8">
          <h2 className="text-sm tracking-widest text-blue-500 font-semibold uppercase mb-1">📊 Progress Overview (Coming Soon)</h2>
          <p className="text-blue-600">Academics: ★★★★☆ | Fitness: ★★★☆☆ | Leadership: ★★★★☆ | Volunteering: ★★★☆☆</p>
        </div>
      </div>
    </div>
  );
}