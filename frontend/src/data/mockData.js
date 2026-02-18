export const tickets = [
  {
    id: 1001,
    title: "Unable to login to dashboard after password reset",
    description: "I recently reset my password using the forgot password link, but now I'm unable to login to the dashboard. The system keeps saying 'Invalid credentials' even though I'm using the new password that was sent to my email. I've tried multiple times and cleared my browser cache, but the issue persists.",
    category: "technical",
    priority: "high",
    status: "open",
    email: "john.smith@example.com",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    assignedTo: null,
    comments: []
  },
  {
    id: 1002,
    title: "Billing discrepancy in last month's invoice",
    description: "I noticed that my invoice for December shows charges for premium features that I downgraded from in November. The invoice amount is $150 more than what I expected based on my current plan. Could you please review this and provide a corrected invoice?",
    category: "billing",
    priority: "medium",
    status: "in-progress",
    email: "sarah.johnson@company.com",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
    assignedTo: "support-team",
    comments: []
  },
  {
    id: 1003,
    title: "Feature request: Dark mode for mobile app",
    description: "Would love to see a dark mode option added to the mobile application. Many users, including myself, prefer using apps in dark mode especially during evening hours. This would greatly improve the user experience and reduce eye strain. The web version already has this feature, so it would be great to have parity across platforms.",
    category: "feature",
    priority: "low",
    status: "open",
    email: "mike.chen@email.com",
    createdAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-13T16:45:00Z",
    assignedTo: null,
    comments: []
  },
  {
    id: 1004,
    title: "Critical: Data export function returns empty file",
    description: "The data export feature is completely broken. When I try to export my data in CSV format, the system generates a file but it's completely empty. This is blocking our monthly reporting process. We have a deadline tomorrow and need this fixed urgently. This issue started appearing after yesterday's system update.",
    category: "bug",
    priority: "critical",
    status: "in-progress",
    email: "emma.wilson@corporation.com",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T11:30:00Z",
    assignedTo: "dev-team",
    comments: []
  },
  {
    id: 1005,
    title: "Cannot update profile picture",
    description: "I'm trying to update my profile picture but every time I upload a new image, I get an error message saying 'Upload failed'. I've tried different image formats (JPG, PNG) and different file sizes, but nothing works. The image requirements state files up to 5MB are supported, and I'm well within that limit.",
    category: "account",
    priority: "low",
    status: "open",
    email: "alex.brown@mail.com",
    createdAt: "2024-01-12T11:20:00Z",
    updatedAt: "2024-01-12T11:20:00Z",
    assignedTo: null,
    comments: []
  },
  {
    id: 1006,
    title: "Integration with Slack not working",
    description: "The Slack integration that was working fine last week has suddenly stopped functioning. Notifications are no longer being sent to our Slack channel, and the connection status shows as 'disconnected' in the integrations page. I've tried reconnecting multiple times but it fails during the OAuth process.",
    category: "technical",
    priority: "high",
    status: "resolved",
    email: "lisa.martinez@startup.io",
    createdAt: "2024-01-10T09:30:00Z",
    updatedAt: "2024-01-14T15:45:00Z",
    assignedTo: "integration-team",
    comments: []
  },
  {
    id: 1007,
    title: "Request for API rate limit increase",
    description: "Our application has grown significantly and we're now hitting the API rate limits frequently during peak hours. This is affecting our service quality. We would like to request an increase in our rate limit from 1000 to 5000 requests per hour. We're on the Business plan and can upgrade if needed.",
    category: "other",
    priority: "medium",
    status: "open",
    email: "dev@techcompany.com",
    createdAt: "2024-01-11T13:15:00Z",
    updatedAt: "2024-01-11T13:15:00Z",
    assignedTo: null,
    comments: []
  },
  {
    id: 1008,
    title: "Mobile app crashes on Android 14",
    description: "The mobile app consistently crashes on startup on devices running Android 14. I've tested on both Samsung Galaxy S23 and Pixel 8, and the behavior is the same. The app worked fine on Android 13. Crash occurs immediately after the splash screen. I've uninstalled and reinstalled but the issue persists.",
    category: "bug",
    priority: "critical",
    status: "in-progress",
    email: "robert.taylor@gmail.com",
    createdAt: "2024-01-15T07:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    assignedTo: "mobile-team",
    comments: []
  },
  {
    id: 1009,
    title: "Duplicate charges on credit card",
    description: "I've been charged twice for this month's subscription. My credit card statement shows two charges of $49.99 on January 1st. I should only be charged once per month. Please refund the duplicate charge and ensure this doesn't happen again. Transaction IDs: TXN-2024-001234 and TXN-2024-001235.",
    category: "billing",
    priority: "high",
    status: "resolved",
    email: "jennifer.lee@outlook.com",
    createdAt: "2024-01-05T14:30:00Z",
    updatedAt: "2024-01-08T16:20:00Z",
    assignedTo: "billing-team",
    comments: []
  },
  {
    id: 1010,
    title: "Feature request: Two-factor authentication",
    description: "For security purposes, I would like to request the addition of two-factor authentication (2FA) to the platform. Given the sensitive nature of the data we store, having an additional layer of security would be very beneficial. SMS-based or authenticator app-based 2FA would both be acceptable.",
    category: "feature",
    priority: "medium",
    status: "open",
    email: "security@enterprise.com",
    createdAt: "2024-01-09T10:00:00Z",
    updatedAt: "2024-01-09T10:00:00Z",
    assignedTo: null,
    comments: []
  },
  {
    id: 1011,
    title: "Cannot delete old projects",
    description: "I'm trying to clean up my workspace by deleting old projects that are no longer needed, but the delete button doesn't seem to work. When I click it, nothing happens - no confirmation dialog, no error message, nothing. I've tried on both Chrome and Firefox with the same result.",
    category: "bug",
    priority: "low",
    status: "open",
    email: "david.kim@freelancer.com",
    createdAt: "2024-01-14T12:00:00Z",
    updatedAt: "2024-01-14T12:00:00Z",
    assignedTo: null,
    comments: []
  },
  {
    id: 1012,
    title: "Email notifications not being received",
    description: "I haven't been receiving any email notifications for the past week. I've checked my spam folder and email settings in the app, and everything appears to be configured correctly. My email address is correct and I've tested it by requesting a password reset email, which I did receive. Only the regular notification emails aren't coming through.",
    category: "technical",
    priority: "medium",
    status: "in-progress",
    email: "maria.garcia@yahoo.com",
    createdAt: "2024-01-13T09:30:00Z",
    updatedAt: "2024-01-15T08:45:00Z",
    assignedTo: "support-team",
    comments: []
  }
]

export const categories = [
  { id: 1, name: 'technical', label: 'Technical Issue', count: 4 },
  { id: 2, name: 'billing', label: 'Billing', count: 3 },
  { id: 3, name: 'feature', label: 'Feature Request', count: 2 },
  { id: 4, name: 'bug', label: 'Bug Report', count: 3 },
  { id: 5, name: 'account', label: 'Account', count: 1 },
  { id: 6, name: 'other', label: 'Other', count: 1 }
]

export const priorities = [
  { id: 1, name: 'low', label: 'Low', color: 'green' },
  { id: 2, name: 'medium', label: 'Medium', color: 'blue' },
  { id: 3, name: 'high', label: 'High', color: 'orange' },
  { id: 4, name: 'critical', label: 'Critical', color: 'red' }
]

export const statuses = [
  { id: 1, name: 'open', label: 'Open', color: 'blue' },
  { id: 2, name: 'in-progress', label: 'In Progress', color: 'yellow' },
  { id: 3, name: 'resolved', label: 'Resolved', color: 'green' },
  { id: 4, name: 'closed', label: 'Closed', color: 'gray' }
]
