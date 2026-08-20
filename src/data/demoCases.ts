export type CaseStatus = 'draft' | 'in_progress' | 'review' | 'completed' | 'needs_attention';
export type CaseCategory = 'RTI' | 'Consumer' | 'Tenant' | 'Schemes' | 'Civic' | 'Documents' | 'Rights';

export interface CaseDocument {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'ready' | 'submitted';
  createdAt: string;
}

export interface CaseTimelineEvent {
  id: string;
  label: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface Case {
  id: string;
  title: string;
  category: CaseCategory;
  status: CaseStatus;
  summary: string;
  createdAt: string;
  updatedAt: string;
  documents: CaseDocument[];
  timeline: CaseTimelineEvent[];
  nextStep?: string;
}

export const demoCases: Case[] = [
  {
    id: 'case-001',
    title: 'RTI Application — Road Repair Rejection',
    category: 'RTI',
    status: 'draft',
    summary: 'RTI application to Municipal Corporation seeking reasons for rejection of road repair request submitted on 15 July 2026.',
    createdAt: '18 Aug 2026',
    updatedAt: '2 hours ago',
    nextStep: 'Complete RTI form and generate application',
    documents: [
      { id: 'doc-001', title: 'RTI Application Draft', type: 'RTI Application', status: 'draft', createdAt: '18 Aug 2026' },
    ],
    timeline: [
      { id: 'tl-001', label: 'Case created', description: 'You described the problem to NyayaSahayak', date: '18 Aug 2026', completed: true },
      { id: 'tl-002', label: 'Information gathered', description: 'Relevant RTI provisions identified', date: '18 Aug 2026', completed: true },
      { id: 'tl-003', label: 'Draft prepared', description: 'RTI application draft created', date: '18 Aug 2026', completed: true },
      { id: 'tl-004', label: 'Review', description: 'Review and finalise the application', date: 'Pending', completed: false },
      { id: 'tl-005', label: 'Ready to submit', description: 'Application ready for submission', date: 'Pending', completed: false },
    ],
  },
  {
    id: 'case-002',
    title: 'Security Deposit Recovery — Landlord Issue',
    category: 'Tenant',
    status: 'in_progress',
    summary: 'Landlord has not returned security deposit of ₹50,000 after 3 months of vacating the flat in Goregaon East.',
    createdAt: '15 Aug 2026',
    updatedAt: 'Yesterday',
    nextStep: 'Send formal demand notice via registered post',
    documents: [
      { id: 'doc-002', title: 'Legal Demand Notice', type: 'Legal Notice', status: 'ready', createdAt: '15 Aug 2026' },
    ],
    timeline: [
      { id: 'tl-006', label: 'Case created', description: 'Situation described and understood', date: '15 Aug 2026', completed: true },
      { id: 'tl-007', label: 'Information gathered', description: 'Tenancy laws and options identified', date: '15 Aug 2026', completed: true },
      { id: 'tl-008', label: 'Draft prepared', description: 'Demand notice drafted', date: '16 Aug 2026', completed: true },
      { id: 'tl-009', label: 'Review', description: 'Notice reviewed and ready', date: '17 Aug 2026', completed: true },
      { id: 'tl-010', label: 'Ready to submit', description: 'Send via registered post', date: 'Pending', completed: false },
    ],
  },
  {
    id: 'case-003',
    title: 'Consumer Complaint — Incorrect Electricity Bill',
    category: 'Consumer',
    status: 'needs_attention',
    summary: 'Electricity bill for July 2026 shows ₹8,400 against usual ₹1,200. Complaint filed with MSEDCL but no response received.',
    createdAt: '10 Aug 2026',
    updatedAt: '3 days ago',
    nextStep: 'Escalate to Consumer Forum if no response in 7 days',
    documents: [
      { id: 'doc-003', title: 'Consumer Complaint Draft', type: 'Consumer Complaint', status: 'draft', createdAt: '10 Aug 2026' },
    ],
    timeline: [
      { id: 'tl-011', label: 'Case created', description: 'Billing issue described', date: '10 Aug 2026', completed: true },
      { id: 'tl-012', label: 'Information gathered', description: 'Consumer Protection Act provisions identified', date: '10 Aug 2026', completed: true },
      { id: 'tl-013', label: 'Draft prepared', description: 'Complaint letter drafted', date: '11 Aug 2026', completed: true },
      { id: 'tl-014', label: 'Review', description: 'Awaiting your review', date: 'Pending', completed: false },
      { id: 'tl-015', label: 'Ready to submit', description: 'Submit to Consumer Forum', date: 'Pending', completed: false },
    ],
  },
  {
    id: 'case-004',
    title: 'Scheme Eligibility — Education Support',
    category: 'Schemes',
    status: 'completed',
    summary: 'Identified 2 high-match and 1 medium-match scholarship schemes for undergraduate student in Gujarat with income below ₹3L.',
    createdAt: '5 Aug 2026',
    updatedAt: '1 week ago',
    nextStep: 'Applications submitted successfully',
    documents: [
      { id: 'doc-004', title: 'Scheme Eligibility Report', type: 'Report', status: 'ready', createdAt: '5 Aug 2026' },
    ],
    timeline: [
      { id: 'tl-016', label: 'Case created', description: 'Profile submitted for scheme matching', date: '5 Aug 2026', completed: true },
      { id: 'tl-017', label: 'Information gathered', description: 'Matching schemes identified', date: '5 Aug 2026', completed: true },
      { id: 'tl-018', label: 'Draft prepared', description: 'Application documents prepared', date: '6 Aug 2026', completed: true },
      { id: 'tl-019', label: 'Review', description: 'Documents reviewed', date: '7 Aug 2026', completed: true },
      { id: 'tl-020', label: 'Completed', description: 'Applications submitted', date: '8 Aug 2026', completed: true },
    ],
  },
];
