/*
  # Create Users and 2FA Authentication Tables

  ## Overview
  This migration creates the core authentication and user management tables for the KidSafe application.
  It includes support for multiple user roles (Employee/SCHOOL_ADMIN and Admin/PLATFORM_ADMIN) with 
  Two-Factor Authentication (2FA) for admin accounts.

  ## 1. New Tables

  ### users
  - `id` (uuid, primary key) - Unique user identifier, linked to auth.users
  - `email` (text, unique, not null) - User's email address
  - `name` (text, not null) - User's full name
  - `phone` (text) - User's phone number
  - `role` (text, not null) - User role: PARENT, TEACHER, SCHOOL_ADMIN, PLATFORM_ADMIN, STUDENT
  - `school_id` (uuid) - Reference to school (for school-level users)
  - `profile_photo` (text) - URL to user's profile photo
  - `status` (text, not null, default 'ACTIVE') - User status: ACTIVE or INACTIVE
  - `created_at` (timestamptz, default now()) - Account creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ### two_factor_auth
  - `id` (uuid, primary key) - Unique 2FA record identifier
  - `user_id` (uuid, not null, foreign key) - Reference to users table
  - `otp_code` (text, not null) - One-time password code
  - `otp_expires_at` (timestamptz, not null) - OTP expiration timestamp
  - `verified` (boolean, default false) - Whether OTP has been verified
  - `created_at` (timestamptz, default now()) - OTP generation timestamp

  ## 2. Security

  ### Row Level Security (RLS)
  - Enable RLS on all tables
  - Users can read their own data
  - Users can update their own profile
  - Platform admins can manage all users
  - 2FA codes are only accessible by the user they belong to

  ## 3. Indexes
  - Index on users.email for fast lookups
  - Index on users.role for role-based queries
  - Index on two_factor_auth.user_id for 2FA lookups

  ## 4. Important Notes
  - PLATFORM_ADMIN accounts require 2FA verification
  - SCHOOL_ADMIN (Employee) accounts do not require 2FA
  - OTP codes expire after 10 minutes
  - User passwords are managed by Supabase Auth
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  role text NOT NULL CHECK (role IN ('PARENT', 'TEACHER', 'SCHOOL_ADMIN', 'PLATFORM_ADMIN', 'STUDENT')),
  school_id uuid,
  profile_photo text,
  status text NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create two_factor_auth table
CREATE TABLE IF NOT EXISTS two_factor_auth (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  otp_code text NOT NULL,
  otp_expires_at timestamptz NOT NULL,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_2fa_user_id ON two_factor_auth(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE two_factor_auth ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table

-- Users can read their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Platform admins can view all users
CREATE POLICY "Platform admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'PLATFORM_ADMIN'
    )
  );

-- Allow user creation during signup
CREATE POLICY "Allow user creation during signup"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for two_factor_auth table

-- Users can view their own 2FA codes
CREATE POLICY "Users can view own 2FA codes"
  ON two_factor_auth FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Users can insert their own 2FA codes
CREATE POLICY "Users can create own 2FA codes"
  ON two_factor_auth FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update their own 2FA codes
CREATE POLICY "Users can update own 2FA codes"
  ON two_factor_auth FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();