import React from "react";
//import { useFormState } from "react-dom";
// OJO: Se requiere instalar "xlsx-js-style" para que funcione el formateo de celdas.
// en caso de manejar base de datos, se debe hacer un join de las tablas para que se pueda exportar a excel
//tabla participantes

  //tabla de convenios

  //tabla participantes_convenios
// npm install xlsx-js-style
import * as XLSX from "xlsx-js-style";

const ButtonExcel = ({ dataCSV, participants }) => {
  //se necesita que participans tras que un arreglo, este se una a la dataCSV, esto en base a que datacsv es un arreglo que se recorrera y se le añadira un campo mas a la tabla excel
  /*
  participantes tiene la siguiente estructura
  participants = [
  {
    type: "Estudiante",
    lastName: "Perez",
    firstName: "Juan", 
  }
 ]
  */
  // Necesito que participants tenga la misma estructura que dataCSV

  participants = participants.map((participant) => {
    return {
      c_tParticipante: participant.type,
      c_ApellidosMo: participant.lastName,
      c_NombresMovi: participant.firstName,
    };
  });

  // Caso a editar: El datacvs y el particpants ya van relacionados como tal, por lo que no se necesita hacer un join, solo se necesita recorrer el datacsv y añadir los campos de participantes
  //unir los dos arreglos pero que el partipante se una a la posicion 0, mas no que se convierta en la posocion 1
  dataCSV[0] = participants.reduce((acc, obj) => ({ ...acc, ...obj }), dataCSV[0]);

  // Si doy en guardar, solo me aparece el ultimo registro
  // Función para formatear la fecha
  const formattedDate = (date) => {
    const dateObj = new Date(date);
    // Formato: dd/MM/yyyy_HH:mm:ss

    //0
    return `${dateObj.getDate()}/${
      dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}_${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`;
  };

  const columns = [
    { label: "SEDE", key: "sede" },
    { label: "CÓDIGO CARRERA", key: "c_carrera" },
    { label: "CÓDIGO CONVENIO", key: "c_convenio" },
    { label: "NOMBRE DEL CONVENIO", key: "n_convenio" },
    { label: "CONTRAPARTE INTERNACIONAL", key: "c_internacional" },
    { label: "PAÍS", key: "pais" },

    { label: "TIPO DE PARTICIPANTE", key: "c_tParticipante" },
    { label: "APELLIDO DEL MOVILIZADO", key: "c_ApellidosMo" },
    { label: "NOMBRE DEL MOVILIZADO", key: "c_NombresMovi" },

    { label: "ACTIVIDADES", key: "actividades" },
    { label: "FECHA INICIO", key: "f_inicio" },
    { label: "FECHA FIN", key: "f_fin" },
    { label: "ÁREA DE CONOCIMIENTO", key: "a_conocimiento" },
    { label: "FINANCIAMIENTO", key: "financiamiento" },
  ];

  const exportToExcel = () => {
    // Crear celdas de título y subtítulo
    const titleCell = {
      v: "PONTIFICIA UNIVERSIDAD CATÓLICA DEL ECUADOR",
      t: "s",
      s: { font: { bold: true, sz:11 } }, // Negrita
    };

    const subtitle = {
      v: "COORDINACIÓN DE INFORMACIÓN Y ESTADÍSTICA",
      t: "s",
      s: { font: { bold: true, sz:11 } }, // Negrita
    };
    const subtitle2 = {
      v: "INTERNACIONALIZACIÓN",
      t: "s",
      s: { font: { bold: true, sz:22 } }, // Negrita
    };

    // agregar headers
    const sheetData = [columns.map((c) => c.label)];

    // agregar datos
    dataCSV.forEach((row) => {
      sheetData.push(columns.map((c) => row[c.key] || ""));
    });

    //añadir vacio la primera columna para el titulo

    sheetData.unshift([" ", subtitle2]);

    sheetData.unshift([" ", subtitle]);

    sheetData.unshift([" ", titleCell]);
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // Ajustar anchos de columnas
    ws["!cols"] = [...Array(columns.length)].map(() => ({ wch: 20 },{ wch: 30 }));
    

    // Ajustar altos de filas

    ws["!rows"] = Array(sheetData.length)
      .fill({})
      .map(() => ({ hpt: 30 }));

    // Combinar celdas
    ws["!merges"] = [
      { s: { r: 0, c: 1 }, e: { r: 0, c: 3 } },
      { s: { r: 1, c: 1 }, e: { r: 1, c: 3 } },
      { s: { r: 2, c: 1 }, e: { r: 2, c: 3 } },
    ];

    // Agregar color a las celdas de fila 4
    Object.keys(ws).forEach((key) => {
      if (key[0] !== "!") {
        // Verificar que la celda esté en la fila 4
        if (parseInt(key.slice(1)) === 4) {
          ws[key].s = {
            fill: {
              fgColor: { rgb: "d9e1f2", patternType: "solid" }, // Color de fondo
            },
            font: {
             // bold: true, // Negrita
              sz: 11, // Tamaño de fuente 14
            },
            alignment: {
              horizontal: "center", // Centrado horizontal
              vertical: "center", // Centrado vertical
            },
            //bordes
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
            },
          };
        }
      }
    });
    
    // Crear el workbook y añadir la hoja
    const wb = XLSX.utils.book_new();
    // Se define el nombre de la hoja
    XLSX.utils.book_append_sheet(wb, ws, "Matriz");
    let newDate = new Date();
    newDate = formattedDate(newDate);
    // Guardar el archivo
    XLSX.writeFile(wb, "MATRIZ_HORIZONTAL_" + newDate + ".xlsx");
  };

  return (
    <button onClick={exportToExcel} style={{ padding: 10 }}>
      Exportar a Excel
    </button>
  );
};

export default ButtonExcel;