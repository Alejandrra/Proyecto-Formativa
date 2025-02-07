import React, { useState } from "react";
import {
  CButton,
  CCol,
  CContainer,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import FormLogins from "./FormLogins";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Pa() {
  const [visible, setVisible] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [setParticipants] = useState([]);

  const handleDataSubmit = ({
    dataList: newDataList,
    participants: newParticipants,
  }) => {
    setDataList([...newDataList]);
    setParticipants([...newParticipants]);
  };

  return (
    <>
      <CContainer>
        <CRow className="mt-5">
          <h1>INTERNACIONALIZACIÓN</h1>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol>
            <h3>Usuario Actual</h3>
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol>
            <input
              disabled
              value={"Formativa.ti@pucese.edu.ec"}
              style={{ width: "25%" }}
            />
          </CCol>
        </CRow>
        <CRow className="mt-2 mb-2">
          <CCol>
            <CButton style={{color:"white", backgroundColor:"#48a259"}} onClick={() => setVisible(!visible)}>
              +
            </CButton>
          </CCol>
        </CRow>
      </CContainer>

      <CModal
        scrollable
        size="xl"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="ScrollingLongContentExampleLabel2"
      >
        <CModalHeader>
          <CModalTitle id="ScrollingLongContentExampleLabel2">
            Documento
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <FormLogins onDataSubmit={handleDataSubmit} dataList={dataList} />
        </CModalBody>
      </CModal>
    </>
  );
}
