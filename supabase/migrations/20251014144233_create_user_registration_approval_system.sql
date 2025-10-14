/*
  # User Registration Approval System

  ## Overview
  Creates a system for parents and teachers to register, with admin approval required before they can access the system.

  ## Tables Created

  ### 1. schools
  - Stores school information
  - Fields:
    - id (uuid, primary key)
    - name (text)
    - address (text)
    - phone (text)
    - email (text)
    - created_at (timestamp)
    - updated_at (timestamp)

  ### 2. user_registration_requests
  - Stores pending user registration requests
  - Fields:
    - id (uuid, primary key)
    - email (text, unique for pending requests)
    - name (text)
    - phone (text)
    - role (PARENT or TEACHER)
    - school_id (uuid, references schools)
    - status (PENDING, APPROVED, REJECTED)
    - request_reason (text, optional)
    - admin_response (text, optional)
    - reviewed_by (uuid, optional, references users)
    - reviewed_at (timestamp, optional)
    - created_at (timestamp)
    - updated_at (timestamp)

  ## Security
  - Enable RLS on all tables
  - Anyone can create registration requests
  - Only admins can view and manage requests
*/

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  phone text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_registration_requests table
CREATE TABLE IF NOT EXISTS user_registration_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text NOT NULL,
  phone text,
  role text NOT NULL CHECK (role IN ('PARENT', 'TEACHER')),
  school_id uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  status text DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  request_reason text,
  admin_response text,
  reviewed_by uuid REFERENCES users(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(email, status) 
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_schools_name ON schools(name);
CREATE INDEX IF NOT EXISTS idx_user_registration_requests_email ON user_registration_requests(email);
CREATE INDEX IF NOT EXISTS idx_user_registration_requests_school ON user_registration_requests(school_id);
CREATE INDEX IF NOT EXISTS idx_user_registration_requests_status ON user_registration_requests(status);

-- Enable Row Level Security
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_registration_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for schools table
CREATE POLICY "Anyone can read schools"
  ON schools FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage schools"
  ON schools FOR ALL
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

-- RLS Policies for user_registration_requests table
CREATE POLICY "Anyone can create registration requests"
  ON user_registration_requests FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read own pending requests"
  ON user_registration_requests FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can read all requests for their school"
  ON user_registration_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
      AND users.school_id = user_registration_requests.school_id
    )
  );

CREATE POLICY "Admins can update requests"
  ON user_registration_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
      AND users.school_id = user_registration_requests.school_id
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
      AND users.school_id = user_registration_requests.school_id
    )
  );

CREATE POLICY "Admins can delete requests"
  ON user_registration_requests FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('SCHOOL_ADMIN', 'PLATFORM_ADMIN')
      AND users.school_id = user_registration_requests.school_id
    )
  );

-- Insert sample schools
INSERT INTO schools (id, name, address, phone, email)
VALUES 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Greenwood Elementary School', '123 Main St, Springfield', '+1-555-0100', 'info@greenwood.edu'),
  (gen_random_uuid(), 'Oakridge High School', '456 Oak Avenue, Riverside', '+1-555-0200', 'admin@oakridge.edu'),
  (gen_random_uuid(), 'Sunshine Kindergarten', '789 Sunny Lane, Brookville', '+1-555-0300', 'contact@sunshine-kg.edu')
ON CONFLICT DO NOTHING;

-- Insert sample registration requests
DO $$
DECLARE
  school_uuid uuid := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
  admin_uuid uuid;
BEGIN
  -- Get admin uuid
  SELECT id INTO admin_uuid FROM users WHERE email = 'admin@schooldemo.com' LIMIT 1;

  -- Pending parent request
  INSERT INTO user_registration_requests (email, name, phone, role, school_id, status, request_reason)
  VALUES (
    'newparent@example.com',
    'Jennifer Williams',
    '+1-555-1001',
    'PARENT',
    school_uuid,
    'PENDING',
    'I am enrolling my child in Grade 3. I would like access to the parent portal to track their progress.'
  )
  ON CONFLICT DO NOTHING;

  -- Pending teacher request
  INSERT INTO user_registration_requests (email, name, phone, role, school_id, status, request_reason)
  VALUES (
    'newteacher@example.com',
    'Michael Anderson',
    '+1-555-1002',
    'TEACHER',
    school_uuid,
    'PENDING',
    'I am a new teacher joining the Math department. I need access to manage my classes and students.'
  )
  ON CONFLICT DO NOTHING;

  -- Approved request
  IF admin_uuid IS NOT NULL THEN
    INSERT INTO user_registration_requests (email, name, phone, role, school_id, status, admin_response, reviewed_by, reviewed_at)
    VALUES (
      'approved@example.com',
      'Lisa Martinez',
      '+1-555-1003',
      'PARENT',
      school_uuid,
      'APPROVED',
      'Registration approved. Welcome to our school community!',
      admin_uuid,
      now() - interval '1 day'
    )
    ON CONFLICT DO NOTHING;
  END IF;

  -- Rejected request
  IF admin_uuid IS NOT NULL THEN
    INSERT INTO user_registration_requests (email, name, phone, role, school_id, status, request_reason, admin_response, reviewed_by, reviewed_at)
    VALUES (
      'rejected@example.com',
      'John Doe',
      '+1-555-1004',
      'PARENT',
      school_uuid,
      'REJECTED',
      'I want to register.',
      'Please visit the school office with proper identification and enrollment documents.',
      admin_uuid,
      now() - interval '2 hours'
    )
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
