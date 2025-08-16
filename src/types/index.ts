export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'PARENT' | 'TEACHER' | 'SCHOOL_ADMIN' | 'PLATFORM_ADMIN';
  schoolId: string;
  profilePhoto?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  admissionNo: string;
  classId: string;
  section: string;
  rollNo: string;
  parentIds: string[];
  profilePhoto?: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  date: string;
  parentMarked: 'LEFT' | 'NOT_LEFT' | null;
  teacherMarked: 'PRESENT' | 'ABSENT' | 'OL' | 'TL' | null;
  markedAt?: string;
  submittedAt?: string;
}

export interface Praise {
  id: string;
  studentId: string;
  fromUserId: string;
  fromUserName: string;
  title: string;
  body: string;
  createdAt: string;
  replies: Reply[];
}

export interface Complaint {
  id: string;
  studentId: string;
  raisedBy: 'PARENT' | 'STAFF';
  raisedByUserId: string;
  raisedByUserName: string;
  title: string;
  body: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
}

export interface Reply {
  id: string;
  userId: string;
  userName: string;
  message: string;
  createdAt: string;
}

export interface StoreItem {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  parentId: string;
  studentId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'APPROVED' | 'FULFILLED' | 'CANCELLED';
  createdAt: string;
}

export interface OrderItem {
  itemId: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Announcement {
  id: string;
  schoolId: string;
  createdBy: string;
  createdByName: string;
  title: string;
  body: string;
  audience: 'ALL' | 'CLASS' | 'STUDENT';
  targetId?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  schoolId: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  createdAt: string;
}

export interface Test {
  id: string;
  classId: string;
  subject: string;
  scheduledOn: string;
  syllabus: string;
  totalMarks: number;
  status: 'DRAFT' | 'SCHEDULED' | 'DONE' | 'PUBLISHED';
  createdBy: string;
}

export interface TestResult {
  id: string;
  testId: string;
  studentId: string;
  obtainedMarks: number;
  rankInClass: number;
  updatedBy: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'ATTENDANCE' | 'PRAISE' | 'COMPLAINT' | 'ANNOUNCEMENT' | 'EVENT' | 'TEST';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}