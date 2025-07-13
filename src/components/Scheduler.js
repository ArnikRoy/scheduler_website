import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { format } from 'date-fns';
import './Scheduler.css';
import dummyScheduledItems from '../data/scheduledPosts';
import PostDetailModal from './PostDetailModal';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

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
        onClick={e => {
          e.stopPropagation();
          setSelectedPost(item);
          setModalOpen(true);
        }}
      >
        {/* Removed platform icon */}
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
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
                onClick={e => { e.stopPropagation(); handleApprove(item.id); }}
              >
                ✅
              </button>
              <button
                className="action-btn cross-btn"
                style={{ fontSize: 14, padding: '2px 8px' }}
                title="Cancel"
                onClick={e => { e.stopPropagation(); handleCancel(item.id); }}
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
      <PostDetailModal open={modalOpen} onClose={() => setModalOpen(false)} post={selectedPost} />
    </div>
  );
}

export default Scheduler; 