// PDF Generation Utility
// This will use jsPDF and html2canvas for PDF generation

export interface PDFOptions {
  filename?: string;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
}

export const generatePDF = async (
  elementId: string,
  options: PDFOptions = {}
): Promise<void> => {
  const {
    filename = 'medical-report.pdf',
    format = 'a4',
    orientation = 'portrait'
  } = options;

  try {
    // Dynamic import to reduce bundle size
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions
    const imgWidth = format === 'a4' ? 210 : 216; // mm
    const pageHeight = format === 'a4' ? 297 : 279; // mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Create PDF
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format
    });

    let position = 0;

    // Add image to PDF (handle multiple pages if needed)
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const printReport = (): void => {
  window.print();
};

// Generate report filename based on report data
export const generateFilename = (
  reportType: string,
  patientName: string,
  date: string
): string => {
  const sanitizedName = patientName.replace(/\s+/g, '-').toLowerCase();
  const sanitizedType = reportType.replace(/\s+/g, '-').toLowerCase();
  const dateStr = new Date(date).toISOString().split('T')[0];
  
  return `${sanitizedType}-${sanitizedName}-${dateStr}.pdf`;
};
