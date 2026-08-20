export interface Scheme {
  id: string;
  title: string;
  description: string;
  ministry: string;
  matchLevel: 'high' | 'medium' | 'needs_info';
  eligibility: string[];
  documents: string[];
  category: string;
}

export const demoSchemes: Scheme[] = [
  {
    id: 'scheme-001',
    title: 'PM Scholarship Scheme for Central Armed Police Forces',
    description: 'Financial assistance for higher education to wards of Central Armed Police Forces and Railway Protection Force personnel.',
    ministry: 'Ministry of Home Affairs',
    matchLevel: 'high',
    eligibility: ['Age 18–25', 'Student', 'Annual family income below ₹6L'],
    documents: ['Aadhaar card', 'Income certificate', 'Admission letter', 'Bank passbook'],
    category: 'Education',
  },
  {
    id: 'scheme-002',
    title: 'National Scholarship Portal — State Merit Scholarship',
    description: 'Merit-based scholarship for students in Gujarat pursuing undergraduate or postgraduate studies.',
    ministry: 'Ministry of Education / State Govt.',
    matchLevel: 'high',
    eligibility: ['Age 18–30', 'Student in Gujarat', 'Annual family income below ₹4.5L'],
    documents: ['Marksheet', 'Income certificate', 'Bank details', 'Caste certificate (if applicable)'],
    category: 'Education',
  },
  {
    id: 'scheme-003',
    title: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
    description: 'Skill development and certification programme for youth to enhance employability.',
    ministry: 'Ministry of Skill Development',
    matchLevel: 'medium',
    eligibility: ['Age 15–45', 'Indian citizen', 'Unemployed or seeking skill upgrade'],
    documents: ['Aadhaar card', 'Bank account', 'Educational certificates'],
    category: 'Skill Development',
  },
  {
    id: 'scheme-004',
    title: 'Startup India Seed Fund Scheme',
    description: 'Financial support to startups for proof of concept, prototype development, product trials.',
    ministry: 'Department for Promotion of Industry',
    matchLevel: 'needs_info',
    eligibility: ['DPIIT-recognised startup', 'Less than 2 years old', 'Not received Series A funding'],
    documents: ['DPIIT registration', 'Business plan', 'Pitch deck', 'Financial statements'],
    category: 'Entrepreneurship',
  },
];