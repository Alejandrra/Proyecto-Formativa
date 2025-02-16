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
 
  // Se verifica si el arreglo de participantes está vacío, en caso de estarlo se asigna el arreglo de participantes que se recibe como parámetro
  if (dataCSV.participants === undefined) {
    dataCSV.participants = participants;
  }
  const AuxDataParticipants = [];
  // si tengo dato en dataCSV debo ver todos sus participantes, si tiene 1 se ejecuta ahi mismo, si tiene 2 se debe agregar justo despues del que se habia hecho otro arreglo
  // si tiene 3 se debe agregar justo despues del que se habia hecho otro arreglo y asi sucesivamente
  
  dataCSV.forEach((row) => {

    const dataParts = row.participants || [];

    if (dataParts.length ===0) {
      AuxDataParticipants.push({
        c_tParticipante: "",
        c_ApellidosMo: "",
        c_NombresMovi: "",
      });
    }else{
      dataParts.forEach((part) => {
        AuxDataParticipants.push({
          ...row,
          c_tParticipante: part.type,
          c_ApellidosMo: part.lastName,
          c_NombresMovi: part.firstName,
        });
      });
    }
  });



  // cambiar mis checks a X
  const dataAExportar = AuxDataParticipants.map((row) => {
    return {
      ...row,
      docencia: row.docencia === true ? "X" : "",
      investigacion: row.investigacion === true ? "X" : "",
      vinculacion: row.vinculacion === true ? "X" : "",
      desarrollo_docente: row.desarrollo_docente === true ? "X" : "",
      internacionalizacion: row.internacionalizacion === true ? "X" : "",
      m_est_entr: row.m_est_entr === true ? "X" : "",
      m_est_salien: row.m_est_salien === true ? "X" : "",
      g_acad_entr: row.g_acad_entr === true ? "X" : "",
      g_acad_salien: row.g_acad_sal === true ? "X" : "",
      m_doc_entr: row.m_doc_entr === true ? "X" : "",
      m_doc_salien: row.m_doc_sal === true ? "X" : "",
      m_adm_salien: row.m_adm_sal === true ? "X" : "",
      convenio_efect: row.convenio_efect === true ? "X" : "",
      prod_cientic: row.prod_cientic === true ? "X" : "",
      intern_curriculo: row.intern_curriculo === true ? "X" : "",
      intern_casa: row.intern_casa === true ? "X" : "",
    };
  });
  

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

    { label: "APORTE A FUNCIÓN SUSTANTIVA. DOCENCIA", key: "docencia" },
    {
      label: "APORTE A FUNCIÓN SUSTANTIVA. INVESTIGACIÓN",
      key: "investigacion",
    },
    { label: "APORTE A FUNCIÓN SUSTANTIVA. VINCULACIÓN", key: "vinculacion" },
    {
      label: "APORTE A FUNCIÓN SUSTANTIVA. DESARROLLO DOCENTE / ADMINISTRATIVO",
      key: "desarrollo_docente",
    },
    {
      label: "APORTE A FUNCIÓN SUSTANTIVA. INTERNACIONALIZACIÓN",
      key: "internacionalizacion",
    },

    { label: "INDICADOR OPCIÓN 1 MOV. EST. ENTR.", key: "m_est_entr" },
    { label: "INDICADOR OPCIÓN 2 MOV. EST. SALIEN.", key: "m_est_salien" },
    { label: "INDICADOR OPCIÓN 3 GIRA ACAD. ENTR", key: "g_acad_entr" },
    { label: "INDICADOR OPCIÓN 4 GIRA. ACAD. SALIEN.", key: "g_acad_salien" },
    { label: "INDICADOR OPCIÓN 5 MOV. DOC. ENTR.", key: "m_doc_entr" },
    { label: "INDICADOR OPCIÓN 6 MOV. DOC. SALIEN.", key: "m_doc_salien" },
    { label: "INDICADOR OPCIÓN 7 MOV. ADM. SALIEN.", key: "m_adm_salien" },

    { label: "INDICADOR OPCIÓN 8 CONVENIO EFECT.", key: "convenio_efect" },
    { label: "INDICADOR OPCIÓN 9 PROD. CIENTÍFIC.", key: "prod_cientic" },
    {
      label:
        "INDICADOR OPCIÓN 10 INTER. CURRICULO (COIL, IDV, TELECOLABORACIÓN)",
      key: "intern_curriculo",
    },
    {
      label:
        "INDICADOR OPCIÓN 11 INTER EN CASA (INTERCULTURALIDAD EN EL CAMPUS)",
      key: "intern_casa",
    },
  ];

  const exportToExcel = () => {
    console.log("dataCSV", dataAExportar);
    // Crear celdas de título y subtítulo
    const titleCell = {
      v: "PONTIFICIA UNIVERSIDAD CATÓLICA DEL ECUADOR",
      t: "s",
      s: { font: { bold: true, sz: 11 } }, // Negrita
    };

    const subtitle = {
      v: "COORDINACIÓN DE INFORMACIÓN Y ESTADÍSTICA",
      t: "s",
      s: { font: { bold: true, sz: 11 } }, // Negrita
    };
    const subtitle2 = {
      v: "INTERNACIONALIZACIÓN",
      t: "s",
      s: { font: { bold: true, sz: 22 } }, // Negrita
    };

    // agregar headers
    const sheetData = [columns.map((c) => c.label)];

    // agregar datos
    dataAExportar.forEach((row) => {
      sheetData.push(columns.map((c) => row[c.key] || ""));
    });

    //añadir vacio la primera columna para el titulo

    sheetData.unshift([" ", subtitle2]);

    sheetData.unshift([" ", subtitle]);

    sheetData.unshift([" ", titleCell]);
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // Ajustar anchos de columnas
    ws["!cols"] = [...Array(columns.length)].map(
      () => ({ wch: 20 }, { wch: 30 })
    );

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

    function columnLetterToNumber(letters) {
      // Convierte letras de columna (A, B, ... Z, AA, AB, ...) a número (1, 2, ... 26, 27, ...)
      let sum = 0;
      for (let i = 0; i < letters.length; i++) {
        sum *= 26;
        // 'A' -> 65, por eso restamos 64 para que A sea 1, B sea 2, etc.
        sum += letters.charCodeAt(i) - 64;
      }
      return sum;
    }

    Object.keys(ws).forEach((cellKey) => {
      if (cellKey[0] === "!") return;

      const colLetters = cellKey.match(/[A-Z]+/)[0];
      const rowNumber = parseInt(cellKey.match(/\d+/)[0]);
      const colNumber = columnLetterToNumber(colLetters);

      if (rowNumber === 4) { 
        if (colNumber >= 20 && colNumber <= 30) {
          ws[cellKey].s = {
            fill: { fgColor: { rgb: "ffdb8a" }, patternType: "solid" },
            font: { sz: 11 },
            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: true, //quiebre de texto
            },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
            },
          };
        } else if (colNumber >= 15 && colNumber <= 19) {
          ws[cellKey].s = {
            fill: { fgColor: { rgb: "3f92ff" }, patternType: "solid" },
            font: { sz: 11 },
            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: true,
            },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
            },
          };
        } else {
          ws[cellKey].s = {
            fill: { fgColor: { rgb: "D9E1F2" }, patternType: "solid" },
            font: { sz: 11 },
            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: true,
            },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
            },
          };
        }
      } else if (rowNumber > 4) {
        ws[cellKey].s = {
          font: { sz: 11 },
          alignment: {
            horizontal: "center",
            vertical: "center",
            wrapText: true,
          },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
          },
        };
      }
    });
    // Para asegurar que la fila 4 (índice 3) tenga altura suficiente para 4 líneas, haz:
    if (!ws["!rows"]) ws["!rows"] = [];
    ws["!rows"][3] = { hpx: 60 }; // Ajusta la altura (hpx) a lo que necesites para ~4 líneas
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
