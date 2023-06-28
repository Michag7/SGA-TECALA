import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import Colegio from "../../assets/colegio.png";
import CodigoQR from "../../assets/qr_ejemplo.png";
import { Font } from "@react-pdf/renderer";

const CarnetPDF = ({ avatar, user }) => {
  Font.register({
    family: "Poppins",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2",
        fontWeight: "normal",
        fontStyle: "normal",
      },
    ],
  });
  return (
    <Document>
      <Page>
        <View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "500px",
              position: "fixed",
              marginLeft: "150px",
            }}
          >
            <View
              style={{
                display: "flex",
                width: "620px",
                top: "50%",
                left: "50%",
              }}
            >
              <View
                style={{
                  flexShrink: 0,
                  width: "13%",
                  height: "450px",
                  backgroundColor: "#1877f2",
                  borderLeft: "1px solid black",
                  border: "1px solid darkgray",
                  borderRight: "none",
                  borderRadius: "20px 0 0 20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    transform: "rotate(-90deg)",
                    color: "white",
                    fontSize: "40px",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                  }}
                >
                  {(user.rol).toUpperCase()}
                </Text>
              </View>
              <View
                style={{
                  flexShrink: 0,
                  width: "45%",
                  backgroundColor: "white",
                  border: "1px solid darkgray",
                  borderLeft: "none",
                  borderRadius: "0 20px 20px 0px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  position: "relative",
                  flexDirection: "column",
                }}
              >
                <Image
                  src={Colegio}
                  alt="icono"
                  style={{
                    width: "80px",
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    margin: "0",
                  }}
                />
                <Text
                  style={{
                    margin: "40px 45px 0",
                    textAlign: "left",
                    fontFamily: "Poppins",
                    lineHeight: "0",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  TERESA CALDERÓN
                </Text>
                <Text
                  style={{
                    margin: "23px 0px 0",
                    textAlign: "left",
                    fontFamily: "Poppins",
                    lineHeight: "0",
                    fontSize: "40px",
                    fontWeight: "bold",
                    color: "#1877f2",
                  }}
                >
                  DE LASSO
                </Text>
                <Image
                  src={`data:image/png;base64,${avatar}`}
                  alt="perfil-foto"
                  style={{
                    width: "100px",
                    height: "90px",
                    marginTop: "42px",
                    marginBottom: "20px",
                    alignSelf: "center",
                    borderRadius: "100%",
                  }}
                />
                <View
                  style={{
                    backgroundColor: "#1877f2",
                    padding: "10px",
                    textAlign: "center",
                    position: "relative",
                    left: "0",
                    right: "0",
                    marginTop: "2px",
                    bottom: "3px",
                    width: "250px",
                    height: "35px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "18px",
                      fontWeight: "normal",
                      color: "white",
                      margin: "0",
                      fontFamily: "Poppins",
                      position: "absolute",
                    }}
                  >
                    {user.nombre} {user.apellido}
                  </Text>
                </View>
                <Text
                  style={{
                    margin: "0 125px 0",
                    bottom: "178px",
                    fontFamily: "Poppins",
                  }}
                >
                  C.C:{user.id}
                </Text>
                <Image
                  src={CodigoQR}
                  alt="perfil-foto"
                  style={{
                    width: "100px",
                    height: "90px",
                    marginTop: "42px",
                    marginBottom: "20px",
                    alignSelf: "center",
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CarnetPDF;
