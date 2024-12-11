const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const os = require('os');

const generarPDFVenta = (venta, idVenta) => {
    const downloadsFolder = path.join(os.homedir(), 'Downloads');
    const outputPath = path.join(downloadsFolder, `reporteVenta_${idVenta}.pdf`);

    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(fs.createWriteStream(outputPath));

    // Título del reporte
    doc.fontSize(18).text('Reporte de Venta', { align: 'center' }).moveDown(2);

    // Información de la venta
    doc.fontSize(12);
    doc.text(`Cliente: ${venta.cliente.nombre}`);
    doc.text(`Correo: ${venta.cliente.correo}`);
    doc.text(`Fecha: ${new Date(venta.fecha).toLocaleString()}`);
    doc.moveDown(1);

    // Encabezados de la tabla
    const tableTop = doc.y;
    const tableWidth = doc.page.width - doc.options.margin * 2; // Ancho total de la tabla
    const columnWidths = [
        tableWidth * 0.3, // Descripción: 30%
        tableWidth * 0.2333, // Cantidad: 23.33%
        tableWidth * 0.2333, // Precio: 23.33%
        tableWidth * 0.2333, // Subtotal: 23.33%
    ];
    const rowHeight = 20;

    // Encabezado de la tabla
    doc.fontSize(10).fillColor('white').rect(50, tableTop, tableWidth, rowHeight).fill('#333');
    doc.fillColor('white').text('Descripción', 55, tableTop + 5, { width: columnWidths[0], align: 'left' });
    doc.text('Cantidad', 20 + columnWidths[0], tableTop + 5, { width: columnWidths[1], align: 'right' });
    doc.text('Precio', 20 + columnWidths[0] + columnWidths[1], tableTop + 5, { width: columnWidths[2], align: 'right' });
    doc.text('Subtotal', 20 + columnWidths[0] + columnWidths[1] + columnWidths[2], tableTop + 5, { width: columnWidths[3], align: 'right' });

    // Detalle de productos
    let y = tableTop + rowHeight;
    venta.detalle.forEach((item, index) => {
        const isEven = index % 2 === 0;
        doc.fillColor(isEven ? '#F9F9F9' : 'white').rect(50, y, tableWidth, rowHeight).fill();
        doc.fillColor('black');
        doc.text(item.producto.descripcion, 55, y + 5, { width: columnWidths[0], align: 'left' });
        doc.text(item.cantidad.toString(), 20 + columnWidths[0], y + 5, { width: columnWidths[1], align: 'right' });
        doc.text(`$${item.producto.precio.toFixed(2)}`, 20 + columnWidths[0] + columnWidths[1], y + 5, { width: columnWidths[2], align: 'right' });
        doc.text(`$${item.subtotal.toFixed(2)}`, 20 + columnWidths[0] + columnWidths[1] + columnWidths[2], y + 5, { width: columnWidths[3], align: 'right' });

        y += rowHeight;
    });

    // Línea total
    doc.strokeColor('#333').moveTo(50, y).lineTo(50 + tableWidth, y).stroke();
    y += 10;
    doc.fontSize(12).text(`Total: $${venta.total.toFixed(2)}`, 50, y, { align: 'right', width: tableWidth });

    // Pie de página
    doc.moveDown(2);
    doc.fontSize(10).text('Reporte generado automáticamente.', { align: 'center' });

    doc.end();

    return outputPath;
};

module.exports = {
    generarPDFVenta,
};
