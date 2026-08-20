export interface RTIApplication {
  id: string;
  to: string;
  pio: string;
  department: string;
  address: string;
  subject: string;
  informationRequested: string[];
  applicantName: string;
  applicantAddress: string;
  date: string;
  referenceNumber?: string;
}

export const demoRTIApplication: RTIApplication = {
  id: 'rti-demo-001',
  to: 'The Public Information Officer',
  pio: 'Municipal Corporation of Greater Mumbai (MCGM)',
  department: 'Roads and Infrastructure Department',
  address: 'Municipal Head Office, Mahapalika Marg, Mumbai — 400 001',
  subject: 'Request for information regarding rejection of road repair application',
  informationRequested: [
    'Certified copy of the decision/order rejecting the road repair application submitted on [Date] for [Location].',
    'Reasons for rejection of the said application, with reference to applicable rules or guidelines.',
    'Name and designation of the officer who reviewed and rejected the application.',
    'Current status of road repair works planned for the concerned locality.',
  ],
  applicantName: 'Rajesh Kumar Sharma',
  applicantAddress: 'Flat 4B, Shivaji Nagar, Goregaon East, Mumbai — 400 063',
  date: '20 August 2026',
  referenceNumber: 'RTI/MCGM/2026/00142',
};