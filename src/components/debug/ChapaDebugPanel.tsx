import React, { useState, useEffect } from 'react';
import { getChapaPaymentLogs, getPendingPayments, completeChapaPayment, debugAllPayments, removePayment, clearAllPayments } from '../../api/chapa';

const ChapaDebugPanel: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [pendingPayments, setPendingPayments] = useState<any[]>([]);

  const refreshData = () => {
    setPayments(getChapaPaymentLogs());
    setPendingPayments(getPendingPayments());
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleCompletePayment = (tx_ref: string) => {
    if (completeChapaPayment(tx_ref)) {
      alert('Payment completed successfully!');
      refreshData();
    } else {
      alert('Failed to complete payment');
    }
  };

  const handleRemovePayment = (tx_ref: string) => {
    if (removePayment(tx_ref)) {
      alert('Payment removed successfully!');
      refreshData();
    } else {
      alert('Failed to remove payment');
    }
  };

  const handleClearAllPayments = () => {
    if (window.confirm('Are you sure you want to clear ALL payments? This cannot be undone!')) {
      const count = clearAllPayments();
      alert(`Cleared ${count} payments successfully!`);
      refreshData();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'white',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '400px',
      maxHeight: '500px',
      overflow: 'auto',
      zIndex: 9999,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
        🔧 Chapa Debug Panel
      </h3>
      
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={refreshData}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          🔄 Refresh
        </button>
        <button
          onClick={() => {
            debugAllPayments();
            alert('Check console for detailed payment information');
          }}
          style={{
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          🔍 Debug All
        </button>
        <button
          onClick={handleClearAllPayments}
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          🗑️ Clear All
        </button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#ef4444' }}>
          ⏳ Pending Payments ({pendingPayments.length})
        </h4>
        {pendingPayments.length === 0 ? (
          <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>No pending payments</p>
        ) : (
          pendingPayments.map((payment, index) => (
            <div key={index} style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '4px',
              padding: '8px',
              marginBottom: '8px'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                {payment.platform} - {payment.amount} {payment.currency}
              </div>
              <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>
                {payment.email}
              </div>
              <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '8px' }}>
                {payment.tx_ref}
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  onClick={() => handleCompletePayment(payment.tx_ref)}
                  style={{
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '10px'
                  }}
                >
                  ✅ Complete
                </button>
                <button
                  onClick={() => handleRemovePayment(payment.tx_ref)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '10px'
                  }}
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#059669' }}>
          📊 All Payments ({payments.length})
        </h4>
        {payments.length === 0 ? (
          <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>No payments yet</p>
        ) : (
          payments.slice(0, 5).map((payment, index) => (
            <div key={index} style={{
              background: payment.status === 'successful' ? '#f0fdf4' : '#f9fafb',
              border: `1px solid ${payment.status === 'successful' ? '#bbf7d0' : '#e5e7eb'}`,
              borderRadius: '4px',
              padding: '8px',
              marginBottom: '8px'
            }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                {payment.platform} - {payment.amount} {payment.currency}
              </div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>
                Status: <span style={{ 
                  color: payment.status === 'successful' ? '#059669' : '#f59e0b',
                  fontWeight: 'bold'
                }}>
                  {payment.status}
                </span>
              </div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>
                {payment.email}
              </div>
              <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '8px' }}>
                {payment.tx_ref}
              </div>
              <button
                onClick={() => handleRemovePayment(payment.tx_ref)}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '10px'
                }}
              >
                🗑️ Remove
              </button>
            </div>
          ))
        )}
        {payments.length > 5 && (
          <p style={{ margin: 0, fontSize: '10px', color: '#6b7280' }}>
            ... and {payments.length - 5} more
          </p>
        )}
      </div>
    </div>
  );
};

export default ChapaDebugPanel;
