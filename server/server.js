import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Database (Pre-seeded with realistic institutional records)
let users = [
  {
    id: 1,
    name: 'Dr. Arthur Vance',
    email: 'dean@campusflow.ai',
    role: 'admin',
    institution: 'CampusFlow University',
    onboarded: true,
    createdAt: new Date().toISOString()
  }
];

let workflows = [
  {
    id: 1,
    name: 'Mid-Semester Exam Notice Pipeline',
    description: 'Auto-extract exam dates from academic calendar and dispatch notices to students & invigilators.',
    trigger: 'Calendar Event: 14 Days Before Exam',
    status: 'active',
    runs: 48,
    lastRun: 'Yesterday at 4:30 PM',
    type: 'notice'
  },
  {
    id: 2,
    name: 'Assignment Cutoff Warning Sequence',
    description: 'Broadcast reminders at 48h, 24h, and 2h before LMS submission portal closes.',
    trigger: 'Deadline Proximity',
    status: 'active',
    runs: 142,
    lastRun: 'Today at 9:00 AM',
    type: 'reminder'
  },
  {
    id: 3,
    name: 'Attendance Shortage Escalate Protocol',
    description: 'Flags students below 75% attendance at the end of each month and alerts advisors.',
    trigger: 'Monthly Schedule (Last Day)',
    status: 'paused',
    runs: 12,
    lastRun: 'Oct 31, 2024',
    type: 'attendance'
  }
];

let notices = [
  {
    id: 1,
    refNo: 'CF/ACAD/2024/089',
    title: 'Final Examination Schedule - Autumn Semester 2024',
    date: 'Nov 20, 2024',
    audience: 'All Undergraduate Students',
    status: 'Published',
    institution: 'CampusFlow Academic Institute',
    body: 'This is an official communication regarding final examinations. Students are instructed to verify seating allocations.'
  },
  {
    id: 2,
    refNo: 'CF/FAC/2024/044',
    title: 'Mandatory Submission of Mid-Term Continuous Assessment Marks',
    date: 'Nov 18, 2024',
    audience: 'All Teaching Faculty',
    status: 'Published',
    institution: 'CampusFlow Academic Institute',
    body: 'Faculty are requested to input continuous evaluation grades before the LMS portal lock on Friday.'
  }
];

let reminders = [
  { id: 1, title: 'Submit Project Proposal', date: 'Tomorrow, 11:00 AM', priority: 'high' },
  { id: 2, title: 'Faculty Meeting', date: 'Nov 24, 2:00 PM', priority: 'medium' },
  { id: 3, title: 'Lab Report Deadline', date: 'Nov 25, 5:00 PM', priority: 'high' }
];

let attendanceRecords = [
  { id: 1, name: 'Liam Davies', roll: 'CS-2022-041', course: 'Algorithms (CS301)', attendance: '68%', status: 'Deficit', parentContact: 'davies.p@domain.com' },
  { id: 2, name: 'Sophia Chen', roll: 'CS-2022-088', course: 'Computer Networks', attendance: '92%', status: 'Satisfactory', parentContact: 'chen.fam@domain.com' },
  { id: 3, name: 'Aarav Sharma', roll: 'CS-2022-019', course: 'Operating Systems', attendance: '71%', status: 'Deficit', parentContact: 'sharma.a@domain.com' },
  { id: 4, name: 'Chloe Dubois', roll: 'CS-2022-104', course: 'Database Engineering', attendance: '85%', status: 'Satisfactory', parentContact: 'dubois.c@domain.com' },
  { id: 5, name: 'Marcus Johnson', roll: 'CS-2022-067', course: 'Algorithms (CS301)', attendance: '64%', status: 'Critical Deficit', parentContact: 'mjohnson.p@domain.com' }
];

let documents = [
  { id: 1, name: 'Faculty_Council_Minutes_Nov2024.pdf', size: '2.4 MB', parsedDate: 'Today', extractedTasks: 4, status: 'Processed' },
  { id: 2, name: 'CS_Autumn_Exam_Timetable_Draft.pdf', size: '1.1 MB', parsedDate: 'Yesterday', extractedTasks: 18, status: 'Processed' }
];

// --- API ROUTES ---

// Health & Info
app.get('/api', (req, res) => {
  res.json({
    status: 'online',
    platform: 'CampusFlow AI Backend API',
    version: '2.4.0',
    documentation: 'https://campusflow.ai',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/api/health',
      '/api/auth/register',
      '/api/auth/login',
      '/api/workflows',
      '/api/notices',
      '/api/notices/generate',
      '/api/reminders',
      '/api/attendance',
      '/api/documents'
    ]
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    uptime: process.uptime(),
    status: 'healthy',
    environment: process.env.NODE_ENV || 'production',
    activeConnections: workflows.length + notices.length,
    timestamp: new Date().toISOString()
  });
});

// Authentication
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role, institution } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
  }

  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ success: false, error: 'An account with this email already exists.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email,
    hashedPassword,
    role: role || 'educator',
    institution: institution || 'CampusFlow Academic Institute',
    onboarded: false,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  const { hashedPassword: _, ...safeUser } = newUser;
  res.status(201).json({ success: true, user: safeUser });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(401).json({ success: false, error: 'Invalid email or credentials.' });
  }

  if (user.hashedPassword && !bcrypt.compareSync(password, user.hashedPassword)) {
    return res.status(401).json({ success: false, error: 'Invalid password.' });
  }

  const { hashedPassword: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser, token: 'cf_jwt_' + Date.now() });
});

// Workflows
app.get('/api/workflows', (req, res) => {
  res.json({ success: true, count: workflows.length, workflows });
});

app.post('/api/workflows', (req, res) => {
  const { name, description, trigger, type } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, error: 'Workflow name is required.' });
  }

  const newWf = {
    id: Date.now(),
    name,
    description: description || 'Autonomous workflow',
    trigger: trigger || 'Manual Trigger',
    type: type || 'notice',
    status: 'active',
    runs: 0,
    lastRun: 'Never'
  };

  workflows.unshift(newWf);
  res.status(201).json({ success: true, workflow: newWf });
});

// Notices
app.get('/api/notices', (req, res) => {
  res.json({ success: true, count: notices.length, notices });
});

app.post('/api/notices/generate', (req, res) => {
  const { prompt, institution, signatory } = req.body;
  if (!prompt) {
    return res.status(400).json({ success: false, error: 'Notice prompt or memo text is required.' });
  }

  const generated = {
    id: Date.now(),
    refNo: `CF/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
    title: prompt.length > 60 ? prompt.slice(0, 60) + '...' : prompt,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    institution: institution || 'CampusFlow Academic Institute',
    body: `This is an official communication regarding: "${prompt}". All concerned students and faculty members are hereby instructed to review guidelines and maintain institutional compliance.`,
    signatory: signatory || 'Office of Academic Affairs'
  };

  res.json({ success: true, notice: generated });
});

// Reminders
app.get('/api/reminders', (req, res) => {
  res.json({ success: true, count: reminders.length, reminders });
});

app.post('/api/reminders', (req, res) => {
  const { title, date, priority } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, error: 'Title is required.' });
  }

  const newRem = {
    id: Date.now(),
    title,
    date: date || 'Tomorrow, 5:00 PM',
    priority: priority || 'medium'
  };

  reminders.unshift(newRem);
  res.status(201).json({ success: true, reminder: newRem });
});

// Attendance
app.get('/api/attendance', (req, res) => {
  res.json({ success: true, count: attendanceRecords.length, records: attendanceRecords });
});

app.post('/api/attendance/alert', (req, res) => {
  const deficits = attendanceRecords.filter((r) => r.status.includes('Deficit'));
  res.json({
    success: true,
    message: `Dispatched automated warning letters to ${deficits.length} students and parent contacts.`,
    recipients: deficits.map((d) => ({ name: d.name, contact: d.parentContact }))
  });
});

// Documents
app.get('/api/documents', (req, res) => {
  res.json({ success: true, count: documents.length, documents });
});

export default app;

// Standalone Server Execution
if (process.env.NODE_ENV !== 'production' || process.argv[1]?.endsWith('server.js')) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`[CampusFlow AI API] Backend Server running on port ${PORT}`);
  });
}
