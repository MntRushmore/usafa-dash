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

  useEffect(() => {
    const loadGrades = async () => {
      const docRef = doc(db, 'progress', 'rushil');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setGrades(docSnap.data());
      }
    };
    loadGrades();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newGrades = { ...grades, [name]: value };
    setGrades(newGrades);
    setDoc(doc(db, 'progress', 'rushil'), newGrades);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          🇺🇸 USAFA Progress Dashboard
        </h1>
        <form className="space-y-4">
          {Object.entries(grades).map(([subject, value]) => (
            <div key={subject} className="flex flex-col">
              <label className="capitalize font-semibold text-blue-700">
                {subject}
              </label>
              <input
                type="text"
                name={subject}
                value={value}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter grade"
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}