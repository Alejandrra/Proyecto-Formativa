import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet
} from "@react-pdf/renderer";
import hd from "../assets/header.png";
import ft from "../assets/feat.png";

const styles = StyleSheet.create({
  page: { padding: 30 },
  headerImage: { width: "100%", marginBottom: 10 },
  section: { marginBottom: 15 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  subtitle: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
  text: { fontSize: 12, marginBottom: 5 },

 // Estilos corregidos para alinear FECHA a la izquierda y PERIODO ACADÉMICO a la derecha
 row: { 
  flexDirection: "row", 
  justifyContent: "space-between", // Separa los elementos en los extremos
  alignItems: "center", 
  width: "100%", 
  marginBottom: 5 
},

subtitleLeft: { 
  fontSize: 11, 
  fontWeight: "bold", 
  textAlign: "left",
  flex: 1 // Asegura que ocupe el mismo espacio que el texto derecho
},

subtitleRight: { 
  fontSize: 11, 
  fontWeight: "bold", 
  textAlign: "right",
  flex: 1 // Mantiene la alineación a la derecha y ocupa el mismo espacio
},

// color del  titulo funciones sustantivas



  table: { display: "flex", flexDirection: "column", borderWidth: 1, borderColor: "black", marginBottom: 15 },
  tableRow: { flexDirection: "row" },
  tableCellHeader: { flex: 1, borderWidth: 1, borderColor: "black", padding: 5, fontSize: 10, fontWeight: "bold", backgroundColor: "#f0f0f0" },
  tableCell: { flex: 1, borderWidth: 1, borderColor: "black", padding: 5, fontSize: 10 }
});
// Se añadio los datos de dalist y participants reemplazando el data inicializado en nulo
const MyDocument = ({ dataList, participants}) =>{
  // Obtengo los datos de la lista y los participantes en base a la primera posicion del arreglo
  //let es un identificador que se utiliza para declarar una variable, en este caso se esta declarando una variable dataList y participants pueden ser modificadas,
  //const es un identificador que se utiliza para declarar una variable, en este caso no se declara porque no me permite modificarla 
  //var es un identificador de tipo global y si se puede modificar

   dataList = dataList[0];
    participants = participants[0];
  return  (
    
    <Document>
    <Page size="A4" style={styles.page}>
      <Image src={hd} style={styles.headerImage} />
      <Text style={styles.title}>INFORME DE MOVILIDAD INTERNACIONAL</Text>
      
      <View style={styles.section}>
       
        <View style={styles.table}>
          
          {/* Se reemplazo correctamente el dato padre para obtener los datos de mis variables, con el simbolo de interrogación para evitar un nullify */}
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Código Convenio Internacional</Text><Text style={styles.tableCell}>{dataList?.c_convenio|| ""}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Nombre del Convenio/Eventos Internacionales</Text><Text style={styles.tableCell}>{dataList?.n_convenio || " "}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Contraparte Internacional</Text><Text style={styles.tableCell}>{dataList?.c_internacional || " "}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>País</Text><Text style={styles.tableCell}>{dataList?.pais|| " "}</Text></View>
          
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Tipo de participante</Text><Text style={styles.tableCell}>{participants?.type || "_________________"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Apellido del movilizado</Text><Text style={styles.tableCell}>{participants?.lastName || "_________________"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Nombre del movilizado</Text><Text style={styles.tableCell}>{participants?.firstName || "_________________"}</Text></View>
          
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Actividades</Text><Text style={styles.tableCell}>{dataList?.actividades || " "}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Fecha Inicio</Text><Text style={styles.tableCell}>{dataList?.f_inicio || " "}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Fecha Fin</Text><Text style={styles.tableCell}>{dataList?.f_fin || " "}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Area del Conocimiento</Text><Text style={styles.tableCell}>{dataList?.a_conocimiento || " "}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Financiamiento</Text><Text style={styles.tableCell}>{dataList?.financiamiento || " "}</Text></View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>Indicadores de Internacionalización</Text>
        <View style={styles.row}>
          <Text style={[styles.subtitle,styles.leftText]}>FECHA:</Text><Text style={styles.bold}>{dataList?.fecha || "_________________"}</Text>
        </View>

      <View style={styles.row}>
          <Text style={[styles.subtitle,]}>PERIODO ACADÉMICO:</Text><Text style={styles.bold}>{dataList?.periodo || "_________________"}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>SEDE</Text><Text style={styles.tableCell}>{dataList?.sede || ""}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>CODIGO DE CARRERA</Text><Text style={styles.tableCell}>{dataList?.c_carrera|| " "}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>No. estudiantes en movilidad entrante</Text><Text style={styles.tableCell}>{dataList?.movilidadEntrante || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>No. estudiantes en movilidad Salientes</Text><Text style={styles.tableCell}>{dataList?.movilidadSaliente || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>No. Docentes  movilidad entrantes</Text><Text style={styles.tableCell}>{dataList?.docentesEntrante || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>No. Docentes  movilidad Salientes </Text><Text style={styles.tableCell}>{dataList?.docentesSaliente || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>No. de Administrativos movilidad Salientes</Text><Text style={styles.tableCell}>{dataList?.administrativosSaliente || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>No. de Gira académica entrante </Text><Text style={styles.tableCell}>{dataList?.academicoEntrante || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>No. de Gira académica salientes</Text><Text style={styles.tableCell}>{dataList?.academicoSaliente || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>No. de Intern. currículo (COIL, IDV, TELECOLABORACIÓN)</Text><Text style={styles.tableCell}>{dataList?.internCurriculo || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>No. de producción científica internacional</Text><Text style={styles.tableCell}>{dataList?.cientificaInternacional || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>No. de Internacionalización en casa </Text><Text style={styles.tableCell}>{dataList?.internacionalizacionCasa || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Total países receptores</Text><Text style={styles.tableCell}>{dataList?.totalPaisesReceptores || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Total carreras con algún componente de Internacionalización</Text><Text style={styles.tableCell}>{dataList?.TcomponenteInternacionalizacion || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Listado de carreras con componentes de Internacionalización</Text><Text style={styles.tableCell}>{dataList?.LcomponenteInternacionalizacion || "____"}</Text></View>

        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Indicadores de Funciones Sustantivas</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Total Aporte a función sustantiva. Docencia</Text><Text style={styles.tableCell}>{dataList?.aporteDocencia || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Total Aporte a función sustantiva. Investigación</Text><Text style={styles.tableCell}>{dataList?.aporteInvestigacion || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Total Aporte a función sustantiva. Vinculación</Text><Text style={styles.tableCell}>{dataList?.aporteVinculacion || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Total Aporte a función sustantiva. Desarrollo docente / administrativo</Text><Text style={styles.tableCell}>{dataList?.aporteDesarrollo || "____"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Total Aporte a función sustantiva. Internacionalización</Text><Text style={styles.tableCell}>{dataList?.aporteInternacionalizacion || "____"}</Text></View>
        </View>
      </View>
      
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>Firmas</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Elaborado por</Text><Text style={styles.tableCell}>{dataList?.elaboradoPor || "____________________"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Revisado por</Text><Text style={styles.tableCell}>{dataList?.revisadoPor || "____________________"}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Aprobado por</Text><Text style={styles.tableCell}>{dataList?.aprobadoPor || ""}</Text></View>
        </View>
      </View>
      
      <Text style={"_________________"}></Text>
      <Text style={styles.footer}>Responsable de Internacionalización</Text>
      <Text style={styles.footer}>Fecha del reporte:{dataList?.fechaReporte || "____________________"}</Text>
      
      
      
      <Image src={ft} style={styles.headerImage} />
    </Page>
  </Document>
)
}

export default MyDocument;
