import React from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function GenerateReportButton({ hoursData }) {
  const generateReport = () => {
    const docDefinition = {
      content: [
        'Monthly Report',
        {
          table: {
            body: [
              ['Date', 'Hours'],
              ...hoursData.map(({ date, hours }) => [date, hours]),
            ],
          },
        },
      ],
    };

    pdfMake.createPdf(docDefinition).download();
  };

  return <button onClick={generateReport}>Generate Report</button>;
}

export default GenerateReportButton;
