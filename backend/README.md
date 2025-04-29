# Streak Reminder Push Notification System (GCP + Firebase)

This document outlines how to implement a **Streak Reminder Push Notification System** to help users maintain their activity streaks using **Google Cloud Platform (GCP)** and **Firebase Cloud Messaging (FCM)**.

> **Note:** For now, the backend is currently using **SQLite** for development and seeding. Future migrations to PostgreSQL or Firestore can be considered based on scalability needs.

---

## 📌 Goal
Alert users when they are **at risk of losing their activity streak**, ideally **24 hours after their last activity** if no new action is taken.

---

## 🧱 System Architecture

### 🔧 Backend (NestJS)
- Expose an endpoint `/streaks` to provide streak data.
- Mark a day as `AT_RISK` if it follows a `COMPLETED` day without a new activity.
- Store activity logs in SQLite (for now).

### ☁️ Cloud Scheduler (GCP)
- Runs **hourly or daily** to check which users are `AT_RISK`.
- Triggers a Cloud Function that queries the backend or Firestore (future) for user activity states.

### 🔁 Cloud Function (Node.js / TypeScript)
- Fetches users with `AT_RISK` status.
- Verifies if 24 hours have passed since the last `COMPLETED` activity.
- Sends push notifications to eligible users.

### 🔔 Firebase Cloud Messaging (FCM)
- Used to deliver push notifications to client devices (iOS, Android, Web).
- Devices must register and save their `fcmToken` with the backend.

---

## ✅ Implementation Steps

### 1. Save User Activity
- Activity saved per user per date (e.g., `2024-04-27: 2 activities`).
- SQLite schema:
  ```ts
  user_id | date       | activity_count
  --------|------------|----------------
  abc123  | 2024-04-27 | 2
  ```

### 2. Mark Streak Status
- Evaluate streak status in backend:
  - `COMPLETED`: ≥1 activity
  - `AT_RISK`: 0 activity the next day

### 3. Identify At-Risk Users (Cloud Function)
- Query streaks API for all users.
- Filter for users with `AT_RISK` status AND last completed activity > 24 hours ago.

### 4. Send Push Notifications
- Use FCM SDK to send personalized alerts:
  ```ts
  admin.messaging().sendToDevice(fcmToken, {
    notification: {
      title: 'You’re at risk of losing your streak!',
      body: 'Add an activity today to keep your streak alive!'
    }
  });
  ```

---

## 🧪 Edge Cases & Challenges

| Case | Handling |
|------|----------|
| User logs activity just before notification | Add debounce (30 min) before sending |
| App uninstalled / FCM token expired | Use `messaging().send()` response to remove invalid tokens |
| Users in different time zones | Normalize time using user’s stored timezone or UTC offset |

---

## 🛡️ Security Considerations
- Authenticate Cloud Function using GCP IAM roles.
- Validate `fcmToken` ownership when registering devices.
- Rate-limit push notifications to avoid spam.

---

## 🗺️ Future Improvements
- Switch SQLite to **PostgreSQL** or **Firestore**.
- Add in-app reminders (local notifications).
- Provide streak recovery suggestions based on history.
- Support silent push for background streak updates.

---

## 🔚 Summary
This streak reminder system combines **NestJS**, **GCP Cloud Functions**, and **Firebase Cloud Messaging** to motivate users to maintain streaks and drive engagement.

Let us know if you'd like code templates or deployment pipelines to go with this!

