export const sampleMetrics = {
  workflowsExecuted: 12847,
  notificationsDelivered: 34521,
  tasksAutomated: 8934,
  estimatedTimeSaved: '2,450 hrs'
};

export const dashboardStats = {
  totalWorkflows: 24,
  activeAutomations: 18,
  pendingTasks: 7,
  completionRate: 94
};

export const recentAutomations = [
  { id: 1, name: 'Exam Notice Generation', status: 'completed', time: '2 min ago', type: 'notice' },
  { id: 2, name: 'Assignment Deadline Reminders', status: 'active', time: '15 min ago', type: 'reminder' },
  { id: 3, name: 'Attendance Report Email', status: 'completed', time: '1 hr ago', type: 'email' },
  { id: 4, name: 'Lab Schedule Distribution', status: 'processing', time: '2 hrs ago', type: 'document' },
  { id: 5, name: 'Fee Payment Reminder', status: 'completed', time: '3 hrs ago', type: 'reminder' },
];

export const upcomingReminders = [
  { id: 1, title: 'Submit Project Proposal', date: 'Tomorrow, 11:00 AM', priority: 'high' },
  { id: 2, title: 'Faculty Meeting', date: 'Nov 24, 2:00 PM', priority: 'medium' },
  { id: 3, title: 'Lab Report Deadline', date: 'Nov 25, 5:00 PM', priority: 'high' },
  { id: 4, title: 'Department Review', date: 'Nov 28, 10:00 AM', priority: 'low' },
];

export const workflowChartData = [
  { day: 'Mon', completed: 12, failed: 1 },
  { day: 'Tue', completed: 18, failed: 2 },
  { day: 'Wed', completed: 15, failed: 0 },
  { day: 'Thu', completed: 22, failed: 1 },
  { day: 'Fri', completed: 20, failed: 3 },
  { day: 'Sat', completed: 8, failed: 0 },
  { day: 'Sun', completed: 5, failed: 1 },
];
