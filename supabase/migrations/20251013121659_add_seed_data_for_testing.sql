/*
  # Seed Data for Testing

  ## Overview
  Adds sample data for testing the school management system including users, students, and child requests.

  ## Data Added

  ### Users
  - 1 School Admin (admin@demo.com)
  - 2 Parents (parent1@demo.com, parent2@demo.com)
  - 2 Teachers (teacher1@demo.com, teacher2@demo.com)
  - 3 Students (student1@demo.com, student2@demo.com, student3@demo.com)

  ### Students
  - Emma Johnson (STU2025001)
  - Michael Smith (STU2025002)
  - Sarah Davis (STU2025003)
  - James Wilson (STU2025004)
  - Olivia Brown (STU2025005)

  ### Parent-Student Links
  - Parent 1 linked to Emma Johnson
  - Parent 2 linked to Michael Smith

  ### Child Requests
  - 2 pending requests
  - 1 approved request
  - 1 rejected request
*/

-- Insert sample school first (we'll use a fixed UUID)
DO $$
DECLARE
  school_uuid uuid := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
  admin_uuid uuid;
  parent1_uuid uuid;
  parent2_uuid uuid;
  teacher1_uuid uuid;
  teacher2_uuid uuid;
  student1_uuid uuid;
  student2_uuid uuid;
  student3_uuid uuid;
  student4_uuid uuid;
  student5_uuid uuid;
BEGIN
  -- Insert admin user
  INSERT INTO users (id, email, name, phone, role, school_id, status)
  VALUES (
    gen_random_uuid(),
    'admin@schooldemo.com',
    'Dr. Emily Clark',
    '+1234567890',
    'SCHOOL_ADMIN',
    school_uuid,
    'ACTIVE'
  )
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO admin_uuid;

  -- Get admin_uuid if it already exists
  IF admin_uuid IS NULL THEN
    SELECT id INTO admin_uuid FROM users WHERE email = 'admin@schooldemo.com';
  END IF;

  -- Insert parent users
  INSERT INTO users (id, email, name, phone, role, school_id, status)
  VALUES (
    gen_random_uuid(),
    'parent1@schooldemo.com',
    'Sarah Johnson',
    '+1234567891',
    'PARENT',
    school_uuid,
    'ACTIVE'
  )
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO parent1_uuid;

  IF parent1_uuid IS NULL THEN
    SELECT id INTO parent1_uuid FROM users WHERE email = 'parent1@schooldemo.com';
  END IF;

  INSERT INTO users (id, email, name, phone, role, school_id, status)
  VALUES (
    gen_random_uuid(),
    'parent2@schooldemo.com',
    'Robert Smith',
    '+1234567892',
    'PARENT',
    school_uuid,
    'ACTIVE'
  )
  ON CONFLICT (email) DO NOTHING
  RETURNING id INTO parent2_uuid;

  IF parent2_uuid IS NULL THEN
    SELECT id INTO parent2_uuid FROM users WHERE email = 'parent2@schooldemo.com';
  END IF;

  -- Insert teacher users
  INSERT INTO users (id, email, name, phone, role, school_id, status)
  VALUES (
    gen_random_uuid(),
    'teacher1@schooldemo.com',
    'Mr. David Wilson',
    '+1234567893',
    'TEACHER',
    school_uuid,
    'ACTIVE'
  )
  ON CONFLICT (email) DO NOTHING;

  INSERT INTO users (id, email, name, phone, role, school_id, status)
  VALUES (
    gen_random_uuid(),
    'teacher2@schooldemo.com',
    'Ms. Jennifer Martinez',
    '+1234567894',
    'TEACHER',
    school_uuid,
    'ACTIVE'
  )
  ON CONFLICT (email) DO NOTHING;

  -- Insert students
  INSERT INTO students (id, first_name, last_name, admission_no, class_id, section, roll_no, school_id, profile_photo)
  VALUES (
    gen_random_uuid(),
    'Emma',
    'Johnson',
    'STU2025001',
    'Grade-5',
    'A',
    '01',
    school_uuid,
    'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=400'
  )
  ON CONFLICT (admission_no) DO NOTHING
  RETURNING id INTO student1_uuid;

  IF student1_uuid IS NULL THEN
    SELECT id INTO student1_uuid FROM students WHERE admission_no = 'STU2025001';
  END IF;

  INSERT INTO students (id, first_name, last_name, admission_no, class_id, section, roll_no, school_id, profile_photo)
  VALUES (
    gen_random_uuid(),
    'Michael',
    'Smith',
    'STU2025002',
    'Grade-6',
    'B',
    '02',
    school_uuid,
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  )
  ON CONFLICT (admission_no) DO NOTHING
  RETURNING id INTO student2_uuid;

  IF student2_uuid IS NULL THEN
    SELECT id INTO student2_uuid FROM students WHERE admission_no = 'STU2025002';
  END IF;

  INSERT INTO students (id, first_name, last_name, admission_no, class_id, section, roll_no, school_id, profile_photo)
  VALUES (
    gen_random_uuid(),
    'Sarah',
    'Davis',
    'STU2025003',
    'Grade-5',
    'A',
    '03',
    school_uuid,
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
  )
  ON CONFLICT (admission_no) DO NOTHING
  RETURNING id INTO student3_uuid;

  IF student3_uuid IS NULL THEN
    SELECT id INTO student3_uuid FROM students WHERE admission_no = 'STU2025003';
  END IF;

  INSERT INTO students (id, first_name, last_name, admission_no, class_id, section, roll_no, school_id, profile_photo)
  VALUES (
    gen_random_uuid(),
    'James',
    'Wilson',
    'STU2025004',
    'Grade-7',
    'C',
    '04',
    school_uuid,
    NULL
  )
  ON CONFLICT (admission_no) DO NOTHING
  RETURNING id INTO student4_uuid;

  IF student4_uuid IS NULL THEN
    SELECT id INTO student4_uuid FROM students WHERE admission_no = 'STU2025004';
  END IF;

  INSERT INTO students (id, first_name, last_name, admission_no, class_id, section, roll_no, school_id, profile_photo)
  VALUES (
    gen_random_uuid(),
    'Olivia',
    'Brown',
    'STU2025005',
    'Grade-8',
    'A',
    '05',
    school_uuid,
    NULL
  )
  ON CONFLICT (admission_no) DO NOTHING
  RETURNING id INTO student5_uuid;

  IF student5_uuid IS NULL THEN
    SELECT id INTO student5_uuid FROM students WHERE admission_no = 'STU2025005';
  END IF;

  -- Link parent1 to student1 (Emma Johnson)
  INSERT INTO parent_student_links (parent_id, student_id)
  VALUES (parent1_uuid, student1_uuid)
  ON CONFLICT (parent_id, student_id) DO NOTHING;

  -- Link parent2 to student2 (Michael Smith)
  INSERT INTO parent_student_links (parent_id, student_id)
  VALUES (parent2_uuid, student2_uuid)
  ON CONFLICT (parent_id, student_id) DO NOTHING;

  -- Insert sample child requests
  -- Pending request from parent1 for Sarah Davis
  INSERT INTO child_requests (parent_id, student_admission_no, student_name, status, request_reason)
  VALUES (
    parent1_uuid,
    'STU2025003',
    'Sarah Davis',
    'PENDING',
    'Sarah is my daughter. I would like to link her account to monitor her progress.'
  )
  ON CONFLICT DO NOTHING;

  -- Pending request from parent2 for James Wilson
  INSERT INTO child_requests (parent_id, student_admission_no, student_name, status, request_reason)
  VALUES (
    parent2_uuid,
    'STU2025004',
    'James Wilson',
    'PENDING',
    'James is my son. Please link his account to my parent portal.'
  )
  ON CONFLICT DO NOTHING;

  -- Approved request from parent1 for Emma Johnson (already linked)
  INSERT INTO child_requests (parent_id, student_admission_no, student_name, status, request_reason, admin_response, reviewed_by, reviewed_at)
  VALUES (
    parent1_uuid,
    'STU2025001',
    'Emma Johnson',
    'APPROVED',
    'This is my daughter Emma. I need access to her academic information.',
    'Request approved. Child successfully linked to your account.',
    admin_uuid,
    now() - interval '2 days'
  )
  ON CONFLICT DO NOTHING;

  -- Rejected request from parent2 for Olivia Brown
  INSERT INTO child_requests (parent_id, student_admission_no, student_name, status, request_reason, admin_response, reviewed_by, reviewed_at)
  VALUES (
    parent2_uuid,
    'STU2025005',
    'Olivia Brown',
    'REJECTED',
    'I believe Olivia is in my care now.',
    'Unable to verify relationship. Please contact the school office with proper documentation.',
    admin_uuid,
    now() - interval '1 day'
  )
  ON CONFLICT DO NOTHING;

END $$;
