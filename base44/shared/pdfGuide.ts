import { jsPDF } from 'npm:jspdf@4.0.0';

const ink = [26, 29, 35];
const verdigris = [46, 74, 63];
const copper = [184, 115, 51];
const parchment = [249, 247, 242];
const lead = [140, 140, 140];

export async function fetchImageAsDataUrl(url, format = 'png') {
  const resp = await fetch(url);
  const buf = await resp.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let b64 = '';
  for (let i = 0; i < bytes.length; i += 8192) {
    b64 += String.fromCharCode(...bytes.slice(i, i + 8192));
  }
  b64 = btoa(b64);
  return `data:image/${format};base64,${b64}`;
}

export function createPdfGuide(options) {
  const {
    title,
    subtitle,
    imageUrl,
    imageFormat = 'PNG',
    imageSize = 64,
    imageTop = 36,
    imageGap = 24,
    titleGap = 8,
  } = options;

  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const PW = doc.internal.pageSize.getWidth();
  const PH = doc.internal.pageSize.getHeight();
  const M = 56;
  const CW = PW - M * 2;
  let y = M;

  function bg() {
    doc.setFillColor(parchment[0], parchment[1], parchment[2]);
    doc.rect(0, 0, PW, PH, 'F');
  }
  bg();

  if (imageUrl) {
    doc.addImage(imageUrl, imageFormat, (PW - imageSize) / 2, imageTop, imageSize, imageSize);
    y = imageTop + imageSize + imageGap;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(ink[0], ink[1], ink[2]);
  const tl = doc.splitTextToSize(title, CW);
  doc.text(tl, PW / 2, y, { align: 'center' });
  y += tl.length * 26 + (subtitle ? 8 : titleGap);

  if (subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(lead[0], lead[1], lead[2]);
    doc.text(subtitle, PW / 2, y, { align: 'center' });
    y += 28;
  }

  function space(n) {
    if (y + n > PH - M) {
      doc.addPage();
      bg();
      y = M;
    }
  }

  function heading(text) {
    space(50);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(verdigris[0], verdigris[1], verdigris[2]);
    const lines = doc.splitTextToSize(text, CW);
    space(lines.length * 18 + 16);
    doc.text(lines, M, y);
    y += lines.length * 18 + 6;
    doc.setDrawColor(copper[0], copper[1], copper[2]);
    doc.setLineWidth(0.6);
    doc.line(M, y, M + 36, y);
    y += 18;
  }

  function subheading(text) {
    space(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(ink[0], ink[1], ink[2]);
    const lines = doc.splitTextToSize(text, CW);
    space(lines.length * 16 + 10);
    doc.text(lines, M, y);
    y += lines.length * 16 + 4;
  }

  function para(text) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(ink[0], ink[1], ink[2]);
    const lines = doc.splitTextToSize(text, CW);
    for (const line of lines) {
      space(15);
      doc.text(line, M, y);
      y += 15;
    }
    y += 8;
  }

  function bullet(text, indent) {
    const ind = indent || 14;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(ink[0], ink[1], ink[2]);
    const lines = doc.splitTextToSize(text, CW - ind);
    space(15);
    doc.text('\u2022', M + (ind === 14 ? 0 : 14), y);
    for (const line of lines) {
      space(15);
      doc.text(line, M + ind, y);
      y += 15;
    }
    y += 6;
  }

  function labeledBullet(label, text) {
    const indent = 14;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(ink[0], ink[1], ink[2]);
    space(15);
    doc.text('- ' + label, M, y);
    y += 15;
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, CW - indent);
    for (const line of lines) {
      space(15);
      doc.text(line, M + indent, y);
      y += 15;
    }
    y += 6;
  }

  function numberedBullet(num, text, indent) {
    const ind = indent || 20;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(verdigris[0], verdigris[1], verdigris[2]);
    space(15);
    doc.text(String(num) + '.', M, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(ink[0], ink[1], ink[2]);
    const lines = doc.splitTextToSize(text, CW - ind);
    for (const line of lines) {
      space(15);
      doc.text(line, M + ind, y);
      y += 15;
    }
    y += 6;
  }

  function addPageNumbers() {
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }
    return totalPages;
  }

  return {
    doc,
    space,
    heading,
    subheading,
    para,
    bullet,
    labeledBullet,
    numberedBullet,
    addPageNumbers,
  };
}