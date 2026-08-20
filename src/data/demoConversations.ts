export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: Source[];
  structured?: StructuredResponse;
}

export interface Source {
  id: string;
  title: string;
  section: string;
  type: 'official' | 'act' | 'guideline';
}

export interface StructuredResponse {
  understanding: string;
  options: string[];
  documents: string[];
  nextSteps: string[];
}

export interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  category: string;
}

export const demoConversations: Conversation[] = [
  { id: 'conv-001', title: 'RTI Request — MCGM', preview: 'I want to know why my road repair request...', timestamp: '2 hours ago', category: 'RTI' },
  { id: 'conv-002', title: 'Landlord deposit issue', preview: 'My landlord hasn\'t returned my security...', timestamp: 'Yesterday', category: 'Rights' },
  { id: 'conv-003', title: 'Government scheme eligibility', preview: 'Which schemes am I eligible for as a...', timestamp: '3 days ago', category: 'Schemes' },
  { id: 'conv-004', title: 'Consumer complaint — electricity', preview: 'My electricity bill has been incorrect...', timestamp: '1 week ago', category: 'Consumer' },
  { id: 'conv-005', title: 'Property registration query', preview: 'I need to understand the process for...', timestamp: '2 weeks ago', category: 'Property' },
];

export const demoMessages: Message[] = [
  {
    id: 'msg-001',
    role: 'user',
    content: 'My landlord hasn\'t returned my security deposit even after 3 months of vacating the flat.',
    timestamp: '10:32 AM',
  },
  {
    id: 'msg-002',
    role: 'assistant',
    content: '',
    timestamp: '10:32 AM',
    sources: [
      { id: 'src-001', title: 'Transfer of Property Act, 1882', section: 'Section 108(q)', type: 'act' },
      { id: 'src-002', title: 'Consumer Protection Act, 2019', section: 'Section 2(7)', type: 'act' },
      { id: 'src-003', title: 'Model Tenancy Act, 2021', section: 'Chapter III, Clause 9', type: 'official' },
    ],
    structured: {
      understanding: 'Your landlord is withholding your security deposit for over 3 months after you vacated the property. Under Indian tenancy law, a landlord is generally required to return the security deposit within a reasonable timeframe (typically 30–60 days) after deducting legitimate expenses for damages, if any, with proper documentation.',
      options: [
        'Send a formal legal notice via registered post demanding return of deposit within 15 days',
        'File a complaint with the Rent Authority or Rent Controller in your district',
        'File a consumer complaint if the landlord is acting as a service provider (paying guest/hostel)',
        'Approach a civil court for recovery of money (for amounts above small claims threshold)',
        'File a complaint with the local police for cheating under IPC Section 420 if there is clear intent to defraud',
      ],
      documents: [
        'Original rent agreement / leave and licence agreement',
        'Proof of deposit payment (receipt, bank transfer record)',
        'Written communication with landlord (WhatsApp, email, letters)',
        'Move-out inspection report or handover acknowledgment',
        'Photographs of the property at time of vacating',
      ],
      nextSteps: [
        'Send a written demand notice via registered post to the landlord today',
        'Keep copies of all communication and receipts',
        'If no response in 15 days, file with Rent Authority',
        'NyayaSahayak can generate a formal demand notice for you',
      ],
    },
  },
];