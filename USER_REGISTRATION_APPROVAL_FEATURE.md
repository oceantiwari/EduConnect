# User Registration Approval System

## Overview
A comprehensive admin approval system for parents and teachers to register for accounts. All new user registrations must be reviewed and approved by school administrators before users can access the system.

## Key Changes

### 1. Removed Employee/Admin Signup
- **OLD**: Users could sign up as "Employee" (School Admin) or "Admin" (Platform Admin)
- **NEW**: Users can only sign up as "Parent" or "Teacher"
- **Reason**: Admin accounts should not be self-service. They should be created by existing admins or through a separate secure process.

### 2. School Selection
- Users must select their school during registration
- Schools are loaded dynamically from the database
- Pre-populated with sample schools (can be managed by admins)

### 3. Admin Approval Workflow
- All new registrations create a pending request
- Admin reviews the request with all user details
- Admin can approve (creates user account) or reject (with reason)
- Users are notified of the decision

## Features

### For Parents & Teachers (Registration)
- **Role Selection**: Choose between Parent or Teacher
- **School Selection**: Select from list of available schools
- **User Information**:
  - Full name (required)
  - Email address (required)
  - Phone number (optional)
  - Request reason (optional - helps admins)
  - Password (required, min 6 characters)
- **Form Validation**: Real-time validation with helpful error messages
- **Success Confirmation**: Clear feedback when request is submitted
- **Duplicate Prevention**: Can't submit multiple pending requests with same email

### For School Admins
- **Registration Requests Manager**: Dedicated interface to review all requests
- **Real-time Metrics**: Dashboard shows count of pending registrations
- **Advanced Filtering**: Filter by status (Pending, Approved, Rejected, All)
- **Search Functionality**: Search by name or email
- **Request Review**:
  - View all applicant details
  - See request reason if provided
  - Add admin response/feedback
  - Approve request (automatically creates user account)
  - Reject request (with required reason)
- **Status Tracking**: Full history with timestamps and reviewer information
- **Role Indicators**: Visual badges showing Parent/Teacher roles
- **Error Handling**: Prevents creating duplicate accounts

## Database Structure

### New Tables

#### schools
Stores school information
- id (uuid, primary key)
- name (text)
- address (text)
- phone (text)
- email (text)
- created_at, updated_at (timestamps)

#### user_registration_requests
Tracks all registration requests
- id (uuid, primary key)
- email (text)
- name (text)
- phone (text)
- role (PARENT or TEACHER)
- school_id (uuid, references schools)
- status (PENDING, APPROVED, REJECTED)
- request_reason (text, optional)
- admin_response (text, optional)
- reviewed_by (uuid, references users)
- reviewed_at (timestamp, optional)
- created_at, updated_at (timestamps)
- Unique constraint: (email, status) to prevent duplicate pending requests

### Security (Row Level Security)
- Anyone can create registration requests (public access)
- Anyone can read schools (public access for registration form)
- Admins can read requests for their school only
- Admins can update/delete requests for their school only
- Automatic isolation by school_id

## Technical Implementation

### Service Layer
**userRegistrationService.ts**: Complete business logic
- `getRequestsByStatus()`: Fetch requests filtered by status
- `getPendingRequestsCount()`: Get count for dashboard metrics
- `approveRequest()`: Create user account and update request status
- `rejectRequest()`: Update request status with admin feedback

### Components

#### SignUpPage.tsx (Refactored)
- Removed admin/employee signup options
- Added school selection dropdown
- Added request reason field
- Success screen after submission
- Submits to user_registration_requests table instead of creating users directly

#### UserRegistrationsManager.tsx (New)
- Full-featured admin interface
- Filter and search capabilities
- Request approval/rejection workflow
- Real-time status updates
- Responsive design

### Workflow

#### User Registration Flow
1. User visits signup page
2. Selects role (Parent or Teacher)
3. Fills out registration form
4. Selects their school from dropdown
5. Optionally provides reason for registration
6. Creates password (stored for when account is approved)
7. Submits request
8. Sees success confirmation
9. Waits for admin review

#### Admin Approval Flow
1. Admin logs into dashboard
2. Sees pending registrations count in quick actions
3. Navigates to User Registrations section
4. Reviews pending requests with all details
5. For each request:
   - Reads applicant information
   - Reviews request reason if provided
   - Optionally adds response message
   - Either approves (creates account) or rejects (with reason)
6. System automatically:
   - Creates user account in users table (if approved)
   - Updates request status
   - Records reviewer and timestamp

## Edge Cases Handled
- Duplicate email prevention (can't have multiple pending requests)
- Duplicate account prevention (checks if user already exists before approval)
- Missing school selection
- Form validation
- Network errors
- Concurrent request processing

## Testing Data
Seed data includes:
- 3 sample schools
- 2 pending requests (1 parent, 1 teacher)
- 1 approved request
- 1 rejected request

### Test Accounts for Registration
Try registering with:
- Role: Parent or Teacher
- School: Greenwood Elementary School
- Any valid email and information

### Test Admin Account
- Email: `admin@schooldemo.com`
- Can review and approve/reject requests

## File Structure
```
src/
├── lib/
│   └── supabase.ts                      # Supabase client
├── services/
│   └── userRegistrationService.ts       # Registration business logic
├── components/
│   ├── Auth/
│   │   └── SignUpPage.tsx               # Updated registration form
│   └── Admin/
│       └── UserRegistrationsManager.tsx # Admin approval interface

supabase/
└── migrations/
    └── create_user_registration_approval_system.sql
```

## Key Design Decisions

### 1. Separate Request Table
- Registration requests stored separately from users
- Allows tracking of denied requests
- Maintains audit trail
- Request history preserved

### 2. School-Based Isolation
- Each admin can only see requests for their school
- Automatic filtering by school_id
- Prevents cross-school data access
- Multi-tenancy support

### 3. No Self-Service Admin Creation
- Admin accounts must be created by existing admins
- Prevents unauthorized admin access
- Maintains security boundaries
- Follows principle of least privilege

### 4. Optional Request Reason
- Helps admins make informed decisions
- Not required (reduces friction)
- Shows in admin review interface
- Can speed up approval process

## Benefits

### For Schools
- Control over who accesses the system
- Verify legitimacy of registrations
- Prevent spam/fake accounts
- Maintain data security
- Comply with privacy requirements

### For Users
- Clear registration process
- Know their request status
- Understand next steps
- Professional onboarding experience

### For Admins
- Easy-to-use approval interface
- Complete applicant information
- Ability to communicate with applicants
- Audit trail of all decisions

## Future Enhancements
- Email notifications when requests are reviewed
- Bulk approve/reject functionality
- Admin notes separate from user-visible response
- Registration request analytics
- Automatic approval based on criteria (e.g., verified email domains)
- Integration with external identity verification services
- Document upload support for identity verification
- Parent verification through student records
- Teacher verification through employment records

## Security Considerations
- Passwords not stored in registration requests (would be handled by Supabase Auth)
- Row Level Security enforced at database level
- School-based data isolation
- Admin-only access to approval functions
- Audit trail of all approvals/rejections
- Prevention of duplicate accounts
- Input validation and sanitization

## Migration Notes
- Existing users unaffected
- New signups go through approval process
- Admins can still create users directly if needed
- Old admin signup flow completely removed
- Compatible with existing authentication system
