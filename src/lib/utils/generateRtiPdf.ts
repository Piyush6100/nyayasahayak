import { jsPDF } from 'jspdf';
import { type RTIFormData } from '@/app/rti-assistant/components/RTIWizard';

export function downloadRtiPdf(formData: RTIFormData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 22;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  // 1. Header & Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text('FORM - A [See Rule 3(1)]', pageWidth / 2, y, { align: 'center' });
  y += 5;

  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text('APPLICATION FOR INFORMATION UNDER SECTION 6(1)', pageWidth / 2, y, { align: 'center' });
  y += 6;
  doc.text('OF THE RIGHT TO INFORMATION ACT, 2005', pageWidth / 2, y, { align: 'center' });
  y += 4;

  // Horizontal divider
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // 2. Addressee (PIO)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  doc.text('To,', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.text('The Public Information Officer (PIO),', margin, y);
  y += 5;

  if (formData.department) {
    doc.setFont('helvetica', 'bold');
    const deptLines = doc.splitTextToSize(formData.department, contentWidth);
    doc.text(deptLines, margin, y);
    y += deptLines.length * 4.5;
  }

  if (formData.officeAddress) {
    doc.setFont('helvetica', 'normal');
    const addrLines = doc.splitTextToSize(formData.officeAddress, contentWidth);
    doc.text(addrLines, margin, y);
    y += addrLines.length * 4.5;
  }

  if (formData.city || formData.state) {
    doc.setFont('helvetica', 'normal');
    const loc = [formData.city, formData.state].filter(Boolean).join(', ');
    doc.text(loc, margin, y);
    y += 5;
  }

  y += 3;

  // 3. Subject line
  doc.setFont('helvetica', 'bold');
  const subjectPrefix = 'Subject: ';
  const subjectText = `Request for Information under Section 6(1) of the Right to Information Act, 2005 — regarding ${formData.informationNeeded ? formData.informationNeeded.substring(0, 100) + (formData.informationNeeded.length > 100 ? '...' : '') : 'Information Request'}.`;
  
  const fullSubjectLines = doc.splitTextToSize(subjectPrefix + subjectText, contentWidth);
  doc.text(fullSubjectLines, margin, y);
  y += fullSubjectLines.length * 4.5 + 4;

  // 4. Salutation & Opening
  doc.setFont('helvetica', 'normal');
  doc.text('Respected Sir / Madam,', margin, y);
  y += 5;

  const applicantName = formData.applicantName || 'The Applicant';
  const openingText = `I, ${applicantName}, a citizen of India, hereby submit this application under Section 6(1) of the Right to Information Act, 2005, requesting you to kindly provide the following information from your records:`;
  const openingLines = doc.splitTextToSize(openingText, contentWidth);
  doc.text(openingLines, margin, y);
  y += openingLines.length * 4.5 + 4;

  // 5. Numbered Information Items
  doc.setFont('helvetica', 'bold');
  doc.text('PARTICULARS OF INFORMATION SOUGHT:', margin, y);
  y += 6;

  const infoItems: string[] = [
    formData.informationNeeded || 'Information regarding the subject cited above.',
  ];

  if (formData.additionalContext && formData.additionalContext.trim()) {
    infoItems.push(`Additional Background: ${formData.additionalContext.trim()}`);
  }

  infoItems.push('Certified copies of all file notings, decisions, orders, correspondence, and inquiry reports pertaining to this subject matter.');
  infoItems.push('Name, designation, and official contact details of the official(s) responsible for dealing with and taking actions on this matter.');
  infoItems.push('Current stage/status of the file and expected timeline for resolution.');

  doc.setFont('helvetica', 'normal');
  infoItems.forEach((item, index) => {
    const itemNum = `${index + 1}. `;
    const itemLines = doc.splitTextToSize(item, contentWidth - 8);
    checkPageBreak(itemLines.length * 4.5 + 3);

    doc.setFont('helvetica', 'bold');
    doc.text(itemNum, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.text(itemLines, margin + 8, y);
    y += itemLines.length * 4.5 + 2.5;
  });

  y += 3;
  checkPageBreak(25);

  // 6. Application Fee
  doc.setFont('helvetica', 'bold');
  doc.text('APPLICATION FEE DETAILS:', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  let feeText = '';
  if (formData.feeMode === 'BPL') {
    feeText = 'The applicant is a Below Poverty Line (BPL) cardholder and is exempt from paying the application fee under the proviso to Section 7(5) of the RTI Act, 2005. Self-attested copy of BPL Certificate is enclosed herewith.';
  } else {
    const feeModeStr = formData.feeMode || 'Indian Postal Order (IPO)';
    feeText = `The prescribed application fee of Rs. 10/- (Rupees Ten only) is attached herewith in the form of ${feeModeStr}.`;
  }
  const feeLines = doc.splitTextToSize(feeText, contentWidth);
  doc.text(feeLines, margin, y);
  y += feeLines.length * 4.5 + 4;

  checkPageBreak(30);

  // 7. Applicant Particulars Box
  doc.setFont('helvetica', 'bold');
  doc.text('APPLICANT DETAILS:', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  const details = [
    `Name: ${formData.applicantName || 'Not specified'}`,
    `Address: ${formData.applicantAddress || 'Not specified'}`,
    formData.applicantPhone ? `Phone / Mobile: ${formData.applicantPhone}` : null,
    formData.applicantEmail ? `Email ID: ${formData.applicantEmail}` : null,
    formData.city || formData.state ? `City / State: ${[formData.city, formData.state].filter(Boolean).join(', ')}` : null,
  ].filter(Boolean) as string[];

  details.forEach((d) => {
    const dLines = doc.splitTextToSize(d, contentWidth);
    checkPageBreak(dLines.length * 4.5 + 2);
    doc.text(dLines, margin, y);
    y += dLines.length * 4.5 + 1.5;
  });

  y += 5;
  checkPageBreak(25);

  // 8. Place, Date, Signature
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  doc.text(`Date: ${today}`, margin, y);
  doc.text(`Place: ${formData.city || formData.state || 'India'}`, margin, y + 5);

  const sigX = pageWidth - margin - 45;
  doc.line(sigX, y, pageWidth - margin, y);
  doc.setFont('helvetica', 'bold');
  doc.text('Signature of Applicant', sigX + 5, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`(${formData.applicantName || 'Applicant'})`, sigX + 5, y + 9);

  // Download trigger
  const sanitizedName = (formData.applicantName || 'Applicant').replace(/[^a-zA-Z0-9]/g, '_');
  const dateStr = new Date().toISOString().slice(0, 10);
  doc.save(`RTI_Application_${sanitizedName}_${dateStr}.pdf`);
}
