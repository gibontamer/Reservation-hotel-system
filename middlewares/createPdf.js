const pdfkit = require('pdfkit');
PDFDocument = require('pdfkit');
const fs = require('fs');


const createPdf = async (data) => {
    const doc = new PDFDocument();



    doc.fontSize(25).text('Invoice', {
        align: 'center',
        underline: true
    });
    doc.fontSize(15).text('Hotel System', {
        underline: true,

    });
    doc.fontSize(15).text('Address: 123 Street, City, Country');
    doc.fontSize(15).text('Phone: +123456789');
    doc.fontSize(15).text('Email: hotel.system.project@gmail.com');
    doc.moveDown();

    doc.fontSize(15).text('Customer Details', {
        underline: true,

    });


    doc.fontSize(15).text('Name: ' + data.fullname);
    doc.fontSize(15).text('Email: ' + data.email);
    doc.fontSize(15).text('Phone: ' + data.phone);
    doc.moveDown();
    doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();
    doc.fontSize(15).text('Reservation Details', {
        underline: true,
    });
    const checkin = data.checkin.toISOString().slice(0, 10);
    const checkout = data.checkout.toISOString().slice(0, 10);
    doc.fontSize(15).text('Reservation Number: ' + data.id);
    doc.fontSize(15).text('Check-in: ' + checkin);
    doc.fontSize(15).text('Check-out: ' + checkout);
    doc.fontSize(15).text('Adults: ' + data.adults);
    doc.fontSize(15).text('Children: ' + data.children);
    doc.fontSize(15).text('Room Number: ' + data.roomNumber);
    doc.moveDown();

    doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    doc.fontSize(15).text(`Room Price: ${data.price}$`);

    doc.fontSize(15).text(`Penalty: ${data.penalty}$`);
    doc.moveDown();

    doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();
    const totalPrice = data.price + data.penalty;
    doc.fontSize(15).text(`Total: ${totalPrice}$`);
    doc.end();




    doc.pipe(fs.createWriteStream('invoice.pdf'));




}


module.exports = createPdf;

