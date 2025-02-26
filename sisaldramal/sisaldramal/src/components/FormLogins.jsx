import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import BotonExcel from "./BotonExcel";
import axios from 'axios';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CFormCheck,
  CFormText,
} from "@coreui/react";
import MyDocument from "./MyDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";

// importa la libreria toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://api.pucese.edu.ec:25419/api/juridico/getListas?codprincipal=018-internac-sedes
`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.persons
            .map(person =>
              <li key={person.id}>{person.name}</li>
            )
        }
      </ul>
    )
  }
}


export default function FormLogins({ onDataSubmit, dataList }) {
  const [participants, setParticipants] = useState([
    { type: "", lastName: "", firstName: "" },
  ]);

  const [checks, setChecks] = useState({
    docencia: false,
    investigacion: false,
    vinculacion: false,
    desarrollo_docente: false,
    internacionalizacion: false,
    m_est_entr: false,
    m_est_salien: false,
    g_acad_entr: false,
    g_acad_salien: false,
    m_doc_entr: false,
    m_doc_salien: false,
    m_adm_salien: false,
    convenio_efect: false,
    prod_cientic: false,
    intern_curriculo: false,
    intern_casa: false,
  });

  useEffect(()=>{
    console.log('participantes:',participants);
    console.log('checks:',checks);

  },[participants,checks]);

  const [datos, setDatos] = useState([]);

  const handleCheckboxChange = (e) => {
    setChecks({ ...checks, [e.target.name]: e.target.checked });
  };

  const handleAddParticipant = () => {
    setParticipants([
      ...participants,
      { type: "", lastName: "", firstName: "" },
    ]);
  };

  const handleRemoveParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  };

  const handleSubmit = (values, { resetForm }) => {
    //anidar participantes a los valore
    //Se añaden los participantes al objeto values

    values.participants = participants;

    //check de los valores
    values.docencia = checks.docencia;
    values.investigacion = checks.investigacion;
    values.vinculacion = checks.vinculacion;
    values.desarrollo_docente = checks.desarrollo_docente;
    values.internacionalizacion = checks.internacionalizacion;
    values.m_est_entr = checks.m_est_entr;
    values.m_est_salien = checks.m_est_salien;
    values.g_acad_entr = checks.g_acad_entr;
    values.g_acad_salien = checks.g_acad_salien;
    values.m_doc_entr = checks.m_doc_entr;
    values.m_doc_salien = checks.m_doc_salien;
    values.m_adm_salien = checks.m_adm_salien;
    values.convenio_efect = checks.convenio_efect;
    values.prod_cientic = checks.prod_cientic;
    values.intern_curriculo = checks.intern_curriculo;
    values.intern_casa = checks.intern_casa;

    setDatos([...datos, values]);

    setTimeout(() => {
      console.log(datos);
    }, 500);

    //agregamos la alerta
    toast.success("Los datos se han guardado correctamente", {
      position: "top-right",
      autoClose: 3000,
    });

    /*resetForm();
    // poner todos los checks en false
    setChecks({
      docencia: false,
      investigacion: false,
      vinculacion: false,
      desarrollo_docente: false,
      internacionalizacion: false,
      m_est_entr: false,
      m_est_salien: false,
      g_acad_entr: false,
      g_acad_salien: false,
      m_doc_entr: false,
      m_doc_salien: false,
      m_adm_salien: false,
      convenio_efect: false,
      prod_cientic: false,
      intern_curriculo: false,
      intern_casa: false,
    });*/

    //limpiar los participantes
   //setParticipants([{ type: "", lastName: "", firstName: "" }]);

   console.log();
  };

  

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10">
        {/* Agrega el ToastContainer aquí */}
        <ToastContainer />
        <Formik
          initialValues={{
            carrera: "",
            sede: "",
            c_carrera: "",
            c_convenio: "",
            n_convenio: "",
            c_internacional: "",
            pais: "",
            actividades: "",
            f_inicio: "",
            f_fin: "",
            a_conocimiento: "",
            financiamiento: "",
            c_tParticipante: "",
            c_ApellidosMo: "",
            c_NombresMovi: "",

            // nuevos campos

            a_funciones_sustantivas: "",
            docencia: "",
            investigacion: "",
            vinculacion: "",
            desarrollo_docente: "",
            internacionalizacion: "",

            indicadores: "",
            m_est_entr: "",
            m_est_salien: "",
            g_acad_entr: "",
            g_acad_salien: "",
            m_doc_entr: "",
            m_doc_salien: "",
            m_adm_salien: "",
            convenio_efect: "",
            prod_cientic: "",
            intern_curriculo: "",
            intern_casa: "",
          }}
          validate={(valores) => {
            let errores = {};
            if (!valores.sede) {
              errores.sede = "Escriba el nombre de la SEDE";
            }
            if (!valores.c_carrera) {
              errores.c_carrera = "Escriba el Código de la Carrera";
            }
            if (!valores.c_convenio) {
              errores.c_convenio = "Escriba el Código del Convenio";
            }
            if (!valores.n_convenio) {
              errores.n_convenio = "Escriba el Nombre del Convenio";
            }
            if (!valores.c_internacional) {
              errores.c_internacional = "Escriba la Contraparte Internacional";
            }
            if (!valores.pais) {
              errores.pais = "Escriba el País";
            }
            if (!valores.actividades) {
              errores.actividades = "Escriba las actividades";
            }
            if (!valores.f_inicio) {
              errores.f_inicio = "Escriba la Fecha de Inicio";
            }
            if (!valores.f_fin) {
              errores.f_fin = "Escriba la Fecha de Fin";
            }
            if (!valores.a_conocimiento) {
              errores.a_conocimiento = "Escriba el Área de Conocimiento";
            }
            if (!valores.financiamiento) {
              errores.financiamiento = "Escriba el nombre del Financiamiento";
            }
            return errores;
          }}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
            <form className="formulario" onSubmit={handleSubmit}>
              <div className="border border-info mt-3 mb-3 rounded p-4">
                <div className="row mb-3">
                  <div className="col-lg-4">
                    <label htmlFor="sede" className="form-label">
                      Sede
                    </label>
                    <input
                      type="text"
                      id="sede"
                      name="sede"
                      placeholder="Escriba la Sede"
                      value={values.sede}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control form-control-sm"
                    />
                    {errors.sede && (
                      <div className="text-warning">{errors.sede}</div>
                    )}
                  </div>

                  <div className="col-lg-4">
                    <label htmlFor="c_carrera" className="form-label">
                      Código de Carrera
                    </label>
                    <input
                      type="text"
                      id="c_carrera"
                      name="c_carrera"
                      placeholder="Escriba el Código de Carrera"
                      value={values.c_carrera}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control form-control-sm"
                    />
                    {errors.c_carrera && (
                      <div className="text-warning">{errors.c_carrera}</div>
                    )}
                  </div>
                  <div className="col-lg-4">
                    <label htmlFor="c_convenio" className="form-label">
                      Código de Convenio
                    </label>
                    <input
                      type="text"
                      id="c_convenio"
                      name="c_convenio"
                      placeholder="Escriba el Código de Convenio"
                      value={values.c_convenio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control form-control-sm"
                    />
                    {errors.c_convenio && (
                      <div className="text-warning">{errors.c_convenio}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-4">
                    <label htmlFor="n_convenio">Nombre del Convenio</label>
                    <input
                      type="text"
                      id="n_convenio"
                      name="n_convenio"
                      placeholder="Escriba el Nombre del Convenio"
                      value={values.n_convenio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {errors.n_convenio && (
                      <div className="text-warning">{errors.n_convenio}</div>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="c_internacional">
                      Contraparte Internacional
                    </label>
                    <input
                      type="text"
                      id="c_internacional"
                      name="c_internacional"
                      placeholder="Escriba la Contraparte Internacional"
                      value={values.c_internacional}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {errors.c_internacional && (
                      <div className="text-warning">
                        {errors.c_internacional}
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="pais">País</label>
                    <input
                      type="text"
                      id="pais"
                      name="pais"
                      placeholder="Escriba el País"
                      value={values.pais}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {errors.pais && (
                      <div className="text-warning">{errors.pais}</div>
                    )}
                  </div>
                </div>
                <CCard>
                  <CCardHeader>Participantes</CCardHeader>
                  <CCardBody>
                    {participants.map((participant, index) => (
                      <div key={index} className="row mb-3">
                        <div className="col-lg-4">
                          <label
                            htmlFor="c_tParticipante"
                            className="form-label"
                          >
                            Tipo de Participante
                          </label>
                          <select
                            value={participant.type}
                            id="c_tParticipante"
                            name="c_tParticipante"
                            className="form-select form-select"
                            onChange={(e) =>
                              handleParticipantChange(
                                index,
                                "type",
                                e.target.value
                              )
                            }
                          >
                            <option value="" disabled>
                              Seleccione el tipo movilizado
                            </option>
                            <option value="ESTUDIANTE">ESTUDIANTE</option>
                            <option value="DOCENTE">DOCENTE</option>
                            <option value="ADMINISTRATIVO">
                              ADMINISTRATIVO
                            </option>
                            <option value="INVESTIGADOR">INVESTIGADOR</option>
                            <option value="VOLUNTARIO">VOLUNTARIO</option>
                            <option value="INDEPENDIENTE">INDEPENDIENTE</option>
                          </select>
                          {errors.tparticipante && (
                            <div className="text-warning">
                              {errors.tparticipante}
                            </div>
                          )}
                        </div>
                        <div className="col-lg-4">
                          <label
                            htmlFor="c_ApellidosMovi"
                            className="form-label"
                          >
                            Apellido (s) del movilizado
                          </label>
                          <input
                            type="text"
                            name="c_ApellidosMovi"
                            id="c_ApellidosMovi"
                            placeholder="Apellidos del Movilizado"
                            value={participant.lastName}
                            className="form-control"
                            onChange={(e) =>
                              handleParticipantChange(
                                index,
                                "lastName",
                                e.target.value
                              )
                            }
                          />
                          {errors.Aparticipante && (
                            <div className="text-warning">
                              {errors.Aparticipante}
                            </div>
                          )}
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="c_NombresMovi" className="form-label">
                            Nombre (s) del movilizado
                          </label>
                          <input
                            type="text"
                            name="c_NombresMovi"
                            id="c_NombresMovi"
                            placeholder="Nombre del Participante"
                            value={participant.firstName}
                            className="form-control"
                            onChange={(e) =>
                              handleParticipantChange(
                                index,
                                "firstName",
                                e.target.value
                              )
                            }
                          />
                          {errors.Nparticipante && (
                            <div className="text-warning">
                              {errors.Nparticipante}
                            </div>
                          )}
                        </div>
                        <div className="col">
                          <CButton
                            color="danger"
                            onClick={() => handleRemoveParticipant(index)}
                            style={{
                              width: "40px",
                              height: "40px",
                              marginTop: "8px",
                              color: "white",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                          </CButton>
                        </div>
                      </div>
                    ))}

                    <button
                      color="primary"
                      onClick={handleAddParticipant}
                      style={{
                        width: "40px",
                        height: "40px",
                        padding: 0,
                        backgroundColor: "#48a259",
                        border: "0px",
                        borderRadius: "5px",
                        color: "white",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="27"
                        fill="currentColor"
                        className="bi bi-plus"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                      </svg>
                    </button>
                  </CCardBody>
                </CCard>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="actividades">Actividades</label>
                    <input
                      type="text"
                      id="actividades"
                      name="actividades"
                      placeholder="Actividades"
                      value={values.actividades}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {errors.actividades && (
                      <div className="text-warning">{errors.actividades}</div>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="f_inicio">Fecha de Inicio</label>
                    <input
                      type="date"
                      id="f_inicio"
                      name="f_inicio"
                      value={values.f_inicio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {errors.f_inicio && (
                      <div className="text-warning">{errors.f_inicio}</div>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="f_fin">Fecha de Fin</label>
                    <input
                      type="date"
                      id="f_fin"
                      name="f_fin"
                      value={values.f_fin}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {errors.f_fin && (
                      <div className="text-warning">{errors.f_fin}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="a_conocimiento">Área de Conocimiento</label>
                    <input
                      type="text"
                      id="a_conocimiento"
                      name="a_conocimiento"
                      placeholder="Escriba el Área de Conocimiento"
                      value={values.a_conocimiento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {errors.a_conocimiento && (
                      <div className="text-warning">
                        {errors.a_conocimiento}
                      </div>
                    )}
                  </div>
                  <div className="col">
                    <label htmlFor="financiamiento">Financiamiento</label>
                    <input
                      type="text"
                      id="financiamiento"
                      name="financiamiento"
                      placeholder="Escriba el Financiamiento"
                      value={values.financiamiento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {errors.financiamiento && (
                      <div className="text-warning">
                        {errors.financiamiento}
                      </div>
                    )}
                  </div>

                  <div></div>

                  <CCard>
                    <CCardHeader>Aporte a Función Sustantiva</CCardHeader>
                    <CCardBody>
                      <CFormCheck
                        id="docencia"
                        name="docencia"
                        label="Docencia"
                        checked={checks.docencia}
                        onChange={handleCheckboxChange}
                      />
                      <CFormCheck
                        id="investigacion"
                        label="Investigacion"
                        checked={checks.investigacion}
                        onChange={handleCheckboxChange}
                        name="investigacion"
                      />
                      <CFormCheck
                        id="vinculacion"
                        label="Vinculación"
                        name="vinculacion"
                        checked={checks.vinculacion}
                        onChange={handleCheckboxChange}
                      />
                      <CFormCheck
                        id="desarrollo_docente"
                        label="Desarrollo Docente/Administrativo"
                        name="desarrollo_docente"
                        checked={checks.desarrollo_docente}
                        onChange={handleCheckboxChange}
                      />
                      <CFormCheck
                        id="internacionalizacion"
                        label="Internacionalización"
                        name="internacionalizacion"
                        checked={checks.internacionalizacion}
                        onChange={handleCheckboxChange}
                      />
                    </CCardBody>
                  </CCard>

                  <CCardHeader>Indicadores</CCardHeader>
                  <CCardBody>
                    <CFormCheck
                      id="m_est_entr"
                      label="Opción 1 MOV.EST.ENTR."
                      name="m_est_entr"
                      checked={checks.m_est_entr}
                      onChange={handleCheckboxChange}
                    />
                    <CFormCheck
                      id="m_est_salien"
                      label="Opción 2 MOV.EST.SALIEN."
                      name="m_est_salien"
                      checked={checks.m_est_salien}
                      onChange={handleCheckboxChange}
                    />
                    <CFormCheck
                      id="g_acad_entr"
                      label="Opción 3 GIRA ACAD.ENTR."
                      name="g_acad_entr"
                      checked={checks.g_acad_entr}
                      onChange={handleCheckboxChange}
                    />
                    <CFormCheck
                      id="g_acad_salien"
                      label="Opción 4 GIRA ACAD.SALIEN."
                      name="g_acad_salien"
                      checked={checks.g_acad_salien}
                      onChange={handleCheckboxChange}
                    />
                    <CFormCheck
                      id="m_doc_entr"
                      label="Opción 5 MOV.DOC.ENTR."
                      name="m_doc_entr"
                      checked={checks.m_doc_entr}
                      onChange={handleCheckboxChange}
                    />
                    <CFormCheck
                      id="m_doc_salien"
                      label="Opción 6 MOV.DOC.SALIE."
                      name="m_doc_salien"
                      checked={checks.m_doc_salien}
                      onChange={handleCheckboxChange}
                    />
                    <CFormCheck
                      id="m_adm_salien"
                      label="Opción 7 MOV.ADM.SALIE."
                      name="m_adm_salien"
                      checked={checks.m_adm_salien}
                      onChange={handleCheckboxChange}
                    />
                    <CFormCheck
                      id="convenio_efect"
                      label="Opción 8 CONVENIO EFECT."
                      name="convenio_efect"
                      checked={checks.convenio_efect}
                      onChange={handleCheckboxChange}
                    />
                    <CFormText
                      id="prod_cientic"
                      label="Opción 9 PROD.CIENTÍFIC."
                      name="prod_cientic"
                      checked={checks.prod_cientic}
                      onChange={handleCheckboxChange}
                    />
                    <CFormCheck
                      id="intern_curriculo"
                      label="Opción 10 INTERN.CURRÍCULO."
                      name="intern_curriculo"
                      checked={checks.intern_curriculo}
                      onChange={handleCheckboxChange}
                    />
                    <CFormCheck
                      id="intern_casa"
                      label="Opción 11 INTERN.EN CASA"
                      name="intern_casa"
                      checked={checks.intern_casa}
                      onChange={handleCheckboxChange}
                    />
                  </CCardBody>
                  <CCard></CCard>
                </div>

                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PDFDownloadLink
          document={
            <MyDocument dataList={dataList} participants={participants} />
          }
          fileName="DOCUMENTO_INICIALIZADO.pdf"
        >
          {({ loading }) =>
            loading ? (
              <button className="btn btn-primary">Cargando...</button>
            ) : (
              <button className="btn btn-primary">Descargar</button>
            )
          }
        </PDFDownloadLink>
        <BotonExcel dataCSV={datos} participants={participants} />
      </div>
    </div>
  );
}
