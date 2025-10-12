/*
  # School Management System Schema

  ## Overview
  Creates the core database schema for a school management system with support for parent child linking requests.

  ## Tables Created

  ### 1. users
  - Stores all user accounts (parents, teachers, admins, students)
  - Fields:
    - id (uuid, primary key)
    - email (text, unique)
    - name (text)
    - phone (text)
    - role (enum: PARENT, TEACHER, SCHOOL_ADMIN, PLATFORM_ADMIN, STUDENT)
    - school_id (uuid)
    - profile_photo (text, optional)
    - status (text, default: ACTIVE)
    - created_at (timestamp)
    - updated_at (timestamp)

  ### 2. students
  - Stores student records
  - Fields:
    - id (uuid, primary key)
    - first_name (text)
    - last_name (text)
    - admission_no (text, unique)
    - class_id (text)
    - section (text)
    - roll_no (text)
    - school_id (uuid)
    - profile_photo (text, optional)
    - created_at (timestamp)
    - updated_at (timestamp)

  ### 3. parent_student_links
  - Manages the many-to-many relationship between parents and students
  - Fields:
    - id (uuid, primary key)
    - parent_id (uuid, references users)
    - student_id (uuid, references students)
    - created_at (timestamp)

  ### 4. child_requests
  - Stores requests from parents to link their account to a student
  - Fields:
    - id (uuid, primary key)
    - parent_id (uuid, references users)
    - student_admission_no (text)
    - student_name (text)
    - status (enum: PENDING, APPROVED, REJECTED)
    - request_reason (text, optional)
    - admin_response (text, optional)
    - reviewed_by (uuid, optional, references users)
    - reviewed_at (timestamp, optional)
    - created_at (timestamp)
    - updated_at (timestamp)

  ## Security
  - Enable RLS on all tables
  - Users can read their own data
  - Parents can read their linked students
  - Teachers and admins have appropriate access
  - Child requests are restricted to parents and admins
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  role text NOT NULL CHECK (role IN ('PARENT', 'TEACHER', 'SCHOOL_ADMIN', 'PLATFORM_ADMIN', 'STUDENT')),
  school_id uuid,
  profile_photo text,
  status text DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  admission_no text UNIQUE NOT NULL,
  class_id text NOT NULL,
  section text NOT NULL,
  roll_no text NOT NULL,
  school_id uuid NOT NULL,
  profile_photo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create parent_student_links table
CREATE TABLE IF NOT EXISTS parent_student_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(parent_id, student_id)
);

-- Create child_requests table
CREATE TABLE IF NOT EXISTS child_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_admission_no text NOT NULL,
  student_name text NOT NULL,
  status text DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  request_reason text,
  admin_response text,
  reviewed_by uuid REFERENCES users(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_school_id ON users(school_id);
CREATE INDEX IF NOT EXISTS idx_students_admission_no ON students(admission_no);
CREATE INDEX IF NOT EXISTS idx_students_school_id ON students(school_id);
CREATE INDEX IF NOT EXISTS idx_parent_student_links_parent ON parent_student_links(parent_id);
CREATE INDEX IF NOT EXISTS idx_parent_student_links_student ON parent_student_links(student_id);
CREATE INDEX IF NOT EXISTS idx_child_requests_parent ON child_requests(parent_id);
CREATE INDEX IF NOT EXISTS idx_child_requests_status ON child_requests(status);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_student_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
    )
  );

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for students table
CREATE POLICY "Parents can read linked students"
  ON students FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM parent_student_links
      WHERE parent_student_links.student_id = students.id
      AND parent_student_links.parent_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can read students in their school"
  ON students FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'TEACHER'
      AND users.school_id = students.school_id
    )
  );

CREATE POLICY "Admins can read all students in their school"
  ON students FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
      AND users.school_id = students.school_id
    )
  );

CREATE POLICY "Admins can insert students"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
    )
  );

CREATE POLICY "Admins can update students"
  ON students FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
      AND users.school_id = students.school_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
      AND users.school_id = students.school_id
    )
  );

-- RLS Policies for parent_student_links table
CREATE POLICY "Parents can read their own links"
  ON parent_student_links FOR SELECT
  TO authenticated
  USING (parent_id = auth.uid());

CREATE POLICY "Admins can read all links"
  ON parent_student_links FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
    )
  );

CREATE POLICY "Admins can insert links"
  ON parent_student_links FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
    )
  );

CREATE POLICY "Admins can delete links"
  ON parent_student_links FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
    )
  );

-- RLS Policies for child_requests table
CREATE POLICY "Parents can read own requests"
  ON child_requests FOR SELECT
  TO authenticated
  USING (parent_id = auth.uid());

CREATE POLICY "Admins can read all requests in their school"
  ON child_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
    )
  );

CREATE POLICY "Parents can insert requests"
  ON child_requests FOR INSERT
  TO authenticated
  WITH CHECK (parent_id = auth.uid());

CREATE POLICY "Parents can update own pending requests"
  ON child_requests FOR UPDATE
  TO authenticated
  USING (parent_id = auth.uid() AND status = 'PENDING')
  WITH CHECK (parent_id = auth.uid() AND status = 'PENDING');

CREATE POLICY "Admins can update requests"
  ON child_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
    )
  );

CREATE POLICY "Admins can delete requests"
  ON child_requests FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
    )
  );