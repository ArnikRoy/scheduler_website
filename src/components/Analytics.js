import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dummyScheduledItems from '../data/scheduledPosts';
import { format } from 'date-fns';

const platforms = [
  { name: 'Facebook', icon: '📘' },
  { name: 'Instagram', icon: '📸' },
  { name: 'Twitter', icon: '🐦' },
  { name: 'LinkedIn', icon: '💼' },
];

function Analytics({ user }) {
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  // Prepare weekly data for the selected platform
  let chartData = [];
  if (selectedPlatform) {
    // Filter posts for the selected platform
    const filtered = dummyScheduledItems.filter(
      (item) => item.platform === selectedPlatform
    );
    // Sort by date
    filtered.sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate));
    // Map to chart data format
    chartData = filtered.map((item) => ({
      date: format(new Date(item.scheduledDate), 'dd-MM-yyyy HH:mm'),
      views: item.views,
      comments: item.comments,
      likes: item.likes,
    }));
  }

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <p>Welcome, {user?.name}! Select a platform to view analytics.</p>
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        {platforms.map((p) => (
          <button
            key={p.name}
            onClick={() => setSelectedPlatform(p.name)}
            style={{
              padding: '10px 20px',
              fontSize: 18,
              borderRadius: 8,
              border: selectedPlatform === p.name ? '2px solid #007bff' : '1px solid #ccc',
              background: selectedPlatform === p.name ? '#e6f0ff' : '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>{p.icon}</span> {p.name}
          </button>
        ))}
      </div>
      {selectedPlatform ? (
        <div style={{ marginTop: 40 }}>
          <h2>{selectedPlatform} Weekly Analytics</h2>
          {chartData.length > 0 ? (
            <>
              <div style={{ marginBottom: 40 }}>
                <h3>Views</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" angle={-30} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#007bff" name="Views" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginBottom: 40 }}>
                <h3>Comments</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" angle={-30} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="comments" fill="#28a745" name="Comments" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginBottom: 40 }}>
                <h3>Likes</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" angle={-30} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="likes" fill="#dc3545" name="Likes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div style={{ height: 350, border: '1px dashed #aaa', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
              No data for {selectedPlatform} this week.
            </div>
          )}
        </div>
      ) : (
        <div style={{ color: '#888', marginTop: 40 }}>Select a platform to view analytics.</div>
      )}
    </div>
  );
}

export default Analytics; 