import React from 'react';
import { Card, Tag } from 'antd';

const ViewCard = (props) => {
  return (
    <Card
      title={props.title}  // Display task title
      variant="borderless"
      style={{
        backgroundColor: '#c2eadc',
        borderRadius: '4px',  // Rounded corners for the card
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        display: 'flex',
        flexDirection: 'column',  // Flex direction column to stack elements
        justifyContent: 'center',  // Center content vertically
        alignItems: 'center',  // Center content horizontally
        padding: '40px',  // Added padding for spacing
        height: 'auto',  // Allow height to adjust based on content
        width: '100%',  // Full width by default
        maxWidth: '800px', // Optional: Set a max width for large screens
        margin: '0 auto', // Center the card horizontally
      }}
      headStyle={{
        color: '#161179',
        borderBottom: '2px solid #A5A5A5', // Slightly thicker bottom border for title
        textAlign: 'center',
        fontSize: '24px',  // Slightly larger font size for title
        fontFamily: "Georgia, serif",
        paddingBottom: '10px', // Added padding to separate title from details
        width: '100%',  // Ensure header spans the width of the card
      }}
    >
      {/* Show updated status */}
      <p className='update' style={{ textAlign: 'center' }}>
        {props.updatedAt === props.createdAt ? "" : <Tag color="geekblue">UPDATED</Tag>}
      </p>

      {/* Task Details without using table */}
      <div style={{ width: '100%', padding: '20px 0' }}>
        

        <div style={styles.infoRow}>
          <span style={styles.label}>Title:</span>
          <span style={styles.value}>{props.title || 'N/A'}</span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Description:</span>
          <span style={styles.value}>{props.description || 'N/A'}</span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Status:</span>
          <span style={styles.value}>{props.status || 'N/A'}</span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Assigned To:</span>
          <span style={styles.value}>{props.AssignedTo || 'N/A'}</span>
        </div>

        <div style={styles.infoRow}>
          <span style={styles.label}>Created at:</span>
          <span style={styles.value}>{props.createdAt || 'N/A'}</span>
        </div>
      </div>
    </Card>
  );
};

const styles = {
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',  // Space between label and value
    padding: '5px 0',
    fontSize: '16px',
    width: '100%',  // Ensure rows take full width
    textAlign: 'left',  // Align text to the left
  },
  label: {
    fontWeight: 'bold',
    color: '#161179',
    width: '150px',
    textAlign: 'left',
  },
  value: {
    color: '#333',
    textAlign: 'left',
    flexGrow: 1,
  },
};

export default ViewCard;
