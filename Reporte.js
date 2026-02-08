import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function Reporte({ onBack, personal, asistencias }) {
  const [fechaFiltro, setFechaFiltro] = useState(new Date().toLocaleDateString('es-PE'));
  const [responsable, setResponsable] = useState('');
  const [dniResponsable, setDniResponsable] = useState('');

  const obtenerReporte = () => {
    const reporteData = [];

    personal.forEach(persona => {
      const asistenciasPersona = asistencias.filter(
        a => a.dni === persona.dni && a.fecha === fechaFiltro
      );

      const entrada = asistenciasPersona.find(a => a.tipo === 'entrada');
      const salida = asistenciasPersona.find(a => a.tipo === 'salida');

      if (entrada || salida) {
        reporteData.push({
          dni: persona.dni,
          nombre: persona.nombre,
          apellido: persona.apellido,
          horaEntrada: entrada ? entrada.hora : '-',
          horaSalida: salida ? salida.hora : '-'
        });
      }
    });

    return reporteData;
  };

  const reporte = obtenerReporte();

  const exportarPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Colores corporativos
    const colorVerde = [0, 128, 0];
    const colorAmarillo = [255, 193, 7];
    
    // Header con logo simulado
    doc.setFillColor(...colorVerde);
    doc.rect(14, 10, 8, 8, 'F');
    doc.setFillColor(...colorAmarillo);
    doc.rect(22, 10, 8, 8, 'F');
    
    // Nombre de la empresa
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...colorVerde);
    doc.text('CORPORACIÓN R&L', 35, 16);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('SERVICE', 35, 21);
    
    // Título del documento
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Corporación R&L SERVICE', pageWidth / 2, 35, { align: 'center' });
    
    doc.setFontSize(11);
    doc.text('HOJA DE CONTROL DE ASISTENCIA', pageWidth / 2, 42, { align: 'center' });
    
    // Línea decorativa
    doc.setDrawColor(...colorVerde);
    doc.setLineWidth(0.5);
    doc.line(14, 48, pageWidth - 14, 48);
    
    // Información del responsable
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Responsable: ${responsable || '_________________'}`, 14, 58);
    doc.text(`DNI: ${dniResponsable || '________'}`, 100, 58);
    doc.text('Firma: _________________', 145, 58);
    
    // Fecha
    doc.text(`Fecha: ${fechaFiltro}`, 14, 68);
    
    // Tabla de asistencias
    const tableData = reporte.map((r, index) => [
      index + 1,
      `${r.apellido}, ${r.nombre}`,
      r.horaEntrada,
      '',  // Firma entrada
      r.horaSalida,
      ''   // Firma salida
    ]);
    
    // Agregar filas vacías para completar 10 filas mínimo
    while (tableData.length < 10) {
      tableData.push([tableData.length + 1, '', '', '', '', '']);
    }
    
    autoTable(doc, {
      startY: 75,
      head: [['N.°', 'Apellidos y Nombres', 'Hora de\nEntrada', 'Firma', 'Hora de\nSalida', 'Firma']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        fontSize: 9,
        halign: 'center',
        valign: 'middle',
        lineColor: [0, 0, 0],
        lineWidth: 0.3
      },
      bodyStyles: {
        fontSize: 9,
        halign: 'center',
        valign: 'middle',
        lineColor: [0, 0, 0],
        lineWidth: 0.2,
        minCellHeight: 14
      },
      columnStyles: {
        0: { cellWidth: 12 },
        1: { cellWidth: 50, halign: 'left' },
        2: { cellWidth: 32 },
        3: { cellWidth: 28 },
        4: { cellWidth: 32 },
        5: { cellWidth: 28 }
      },
      styles: {
        cellPadding: 3
      }
    });
    
    // Pie de página
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Documento generado automáticamente - Sistema de Control de Asistencias', pageWidth / 2, finalY, { align: 'center' });
    
    // Guardar PDF
    doc.save(`Asistencia_${fechaFiltro.replace(/\//g, '-')}.pdf`);
  };

  return (
    <div className="reporte-container">
      <h2>Reporte de Asistencias</h2>
      
      <div className="filtro-fecha">
        <label>Fecha del reporte: </label>
        <input
          type="date"
          value={fechaFiltro.split('/').reverse().join('-')}
          onChange={(e) => {
            const fecha = new Date(e.target.value + 'T00:00:00');
            setFechaFiltro(fecha.toLocaleDateString('es-PE'));
          }}
        />
      </div>

      <div className="campos-pdf">
        <div className="form-group">
          <label>Responsable:</label>
          <input
            type="text"
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
            placeholder="Nombre del responsable"
          />
        </div>
        <div className="form-group">
          <label>DNI Responsable:</label>
          <input
            type="text"
            value={dniResponsable}
            onChange={(e) => setDniResponsable(e.target.value.replace(/\D/g, ''))}
            placeholder="DNI"
            maxLength="8"
          />
        </div>
      </div>

      <div className="tabla-container">
        <table className="tabla-reporte">
          <thead>
            <tr>
              <th>N.°</th>
              <th>Apellidos y Nombres</th>
              <th>Hora Entrada</th>
              <th>Hora Salida</th>
            </tr>
          </thead>
          <tbody>
            {reporte.length > 0 ? (
              reporte.map((r, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="nombre-completo">{r.apellido}, {r.nombre}</td>
                  <td className="hora-entrada">{r.horaEntrada}</td>
                  <td className="hora-salida">{r.horaSalida}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="sin-datos">
                  No hay registros de asistencia para esta fecha
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="resumen">
        <p>Total de registros: <strong>{reporte.length}</strong></p>
      </div>

      <button className="btn-exportar-pdf" onClick={exportarPDF}>
        📄 Exportar a PDF
      </button>

      <button className="btn-volver" onClick={onBack}>← Volver al Menú</button>
    </div>
  );
}

export default Reporte;
