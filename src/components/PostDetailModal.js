import React from 'react';
import { format } from 'date-fns';

function PostDetailModal({ open, onClose, post }) {
  if (!open || !post) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Post Details</h2>
        <div style={{ marginBottom: 16 }}>
          <strong>Platform:</strong> {post.platform}
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>Status:</strong> {post.status}
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>Date:</strong> {format(new Date(post.scheduledDate), 'dd-MM-yyyy')}
        </div>
        <div style={{ marginBottom: 16 }}>
          <strong>Time:</strong> {format(new Date(post.scheduledDate), 'HH:mm')}
        </div>
        {post.title && (
          <div style={{ marginBottom: 16 }}>
            <strong>Title:</strong> {post.title}
          </div>
        )}
        {post.content && (
          <div style={{ marginBottom: 16 }}>
            <strong>Content:</strong> {post.content}
          </div>
        )}
        {typeof post.views === 'number' && (
          <div style={{ marginBottom: 8 }}>
            <strong>Views:</strong> {post.views}
          </div>
        )}
        {typeof post.comments === 'number' && (
          <div style={{ marginBottom: 8 }}>
            <strong>Comments:</strong> {post.comments}
          </div>
        )}
        {typeof post.likes === 'number' && (
          <div style={{ marginBottom: 8 }}>
            <strong>Likes:</strong> {post.likes}
          </div>
        )}
        <button onClick={onClose} style={styles.closeBtn}>Close</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    borderRadius: 8,
    padding: 32,
    minWidth: 320,
    maxWidth: 400,
    boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
    position: 'relative',
  },
  closeBtn: {
    marginTop: 16,
    padding: '8px 20px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 16,
  },
};

export default PostDetailModal; 