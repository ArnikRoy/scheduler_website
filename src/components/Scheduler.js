import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { format } from 'date-fns';
import './Scheduler.css';

// Platform icon mapping
const platformIcons = {
  Twitter: '🐦',
  Facebook: '📘',
  LinkedIn: '💼',
  Instagram: '📸',
  Email: '✉️',
};

// Status color mapping
const statusColors = {
  approved: '#d4edda', // green
  cancelled: '#f8d7da', // red
  pending: '#fff3cd', // yellow
};

function Scheduler({ user }) {
  const [scheduledItems, setScheduledItems] = useState([]);
  const calendarRef = useRef(null);

  // Dummy data for scheduled posts
  const dummyScheduledItems = [
    {
      id: 1,
      title: "Weekly Product Update",
      content: "Share the latest features and improvements to our platform",
      scheduledDate: new Date(2024, 11, 15, 10, 0),
      status: 'pending',
      platform: 'LinkedIn',
    },
    {
      id: 2,
      title: "Holiday Promotion Campaign",
      content: "Launch our special holiday discount offers for customers",
      scheduledDate: new Date(2024, 11, 20, 14, 30),
      status: 'pending',
      platform: 'Twitter',
    },
    {
      id: 3,
      title: "Customer Success Story",
      content: "Highlight how our solution helped a client achieve their goals",
      scheduledDate: new Date(2024, 11, 18, 9, 0),
      status: 'approved',
      platform: 'Facebook',
    },
    {
      id: 4,
      title: "Industry Insights Blog",
      content: "Share our thoughts on the latest trends in the industry",
      scheduledDate: new Date(2024, 11, 22, 16, 0),
      status: 'pending',
      platform: 'LinkedIn',
    },
    {
      id: 5,
      title: "Team Behind the Scenes",
      content: "Showcase our amazing team and company culture",
      scheduledDate: new Date(2024, 11, 25, 11, 0),
      status: 'cancelled',
      platform: 'Instagram',
    },
  ];

  useEffect(() => {
    setScheduledItems(dummyScheduledItems);
  }, []);

  // Convert scheduledItems to FullCalendar events
  const events = scheduledItems.map((item) => ({
    id: String(item.id),
    title: item.title,
    start: item.scheduledDate,
    extendedProps: { ...item },
    backgroundColor: statusColors[item.status],
    borderColor: statusColors[item.status],
    display: 'block',
  }));

  // Approve event
  const handleApprove = (id) => {
    setScheduledItems((prev) =>
      prev.map((item) =>
        item.id === Number(id) ? { ...item, status: 'approved' } : item
      )
    );
  };

  // Cancel event
  const handleCancel = (id) => {
    setScheduledItems((prev) =>
      prev.map((item) =>
        item.id === Number(id) ? { ...item, status: 'cancelled' } : item
      )
    );
  };

  // Custom event rendering
  function renderEventContent(arg) {
    const item = arg.event.extendedProps;
    return (
      <div
        className="fc-custom-event"
        style={{
          background: statusColors[item.status],
          borderRadius: 8,
          padding: 8,
          marginBottom: 4,
          boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
          border: `1px solid ${statusColors[item.status]}`,
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          <span style={{ fontSize: 18, marginRight: 6 }}>
            {platformIcons[item.platform] || '📝'}
          </span>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</span>
        </div>
        <div style={{ fontSize: 12, color: '#555', marginBottom: 4 }}>
          {item.content}
        </div>
        <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>
          {format(new Date(item.scheduledDate), 'h:mm a')} &bull; {item.platform}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {item.status === 'pending' && (
            <>
              <button
                className="action-btn tick-btn"
                style={{ fontSize: 14, padding: '2px 8px' }}
                title="Approve"
                onClick={() => handleApprove(item.id)}
              >
                ✅
              </button>
              <button
                className="action-btn cross-btn"
                style={{ fontSize: 14, padding: '2px 8px' }}
                title="Cancel"
                onClick={() => handleCancel(item.id)}
              >
                ❌
              </button>
            </>
          )}
          {item.status === 'approved' && (
            <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: 13 }}>
              ✓ Approved
            </span>
          )}
          {item.status === 'cancelled' && (
            <span style={{ color: '#dc3545', fontWeight: 'bold', fontSize: 13 }}>
              ✗ Cancelled
            </span>
          )}
        </div>
      </div>
    );
  }

  // Summary section
  const summary = [
    { label: 'Total Posts', value: scheduledItems.length, color: '#007bff' },
    { label: 'Approved', value: scheduledItems.filter(i => i.status === 'approved').length, color: '#28a745' },
    { label: 'Pending', value: scheduledItems.filter(i => i.status === 'pending').length, color: '#ffc107' },
    { label: 'Cancelled', value: scheduledItems.filter(i => i.status === 'cancelled').length, color: '#dc3545' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <h1>Scheduler Dashboard</h1>
        <p>Welcome back, {user?.name}! Manage your scheduled posts below.</p>
      </div>
      <div className="calendar-container">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={renderEventContent}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          dayMaxEventRows={4}
        />
      </div>
      <div className="card" style={{ marginTop: 30 }}>
        <h3>Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginTop: 15 }}>
          {summary.map((item) => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: item.color, fontWeight: 'bold' }}>{item.value}</div>
              <div style={{ color: '#666' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Scheduler; 