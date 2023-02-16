import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import axios from 'axios';
import { useState } from "react";


const Form = () => {

    const [
        dni, setDNI
    ] = useState("")

    const [
        names, setNames
    ] = useState("")

    const [
        lastnames, setLastnames
    ] = useState("")

    const isNonMobile = useMediaQuery("min-width:600px")

    // async function insertData(url, datos) {
    //     const response = await fetch(url,{
    //         method:'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(datos)
    //     });
    //     return response.json();
    // }

    const handleFormSubmit = (values) => {
        
        const formData = {
            "clientDocumentNumber": dni,
            "clientName": names,
            "clientLastname": lastnames,
            "clientAddress": null,
            "clientPhone": null
        }

        axios.post('https://backendgailgir.azurewebsites.net/api/client', formData)
        .then((response) => {
            setDNI("")
            setNames("")
            setLastnames("")
        })
        .catch((error) => {
            console.log(error);
        })

        console.log(formData)
    }

    const consultarDNI = () => {
        axios.get('https://backendgailgir.azurewebsites.net/api/client/consultDocument/' + dni,)
        .then((response) => {
            setNames(response.data.objModel.clientName)
            setLastnames(response.data.objModel.clientLastname)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <Box m="20px">
            <Header title="Crear nuevo cliente" subtitle="Formulario para crear nuevo cliente" />
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    //validationSchema={userSchema}
                >
                    {({ 
                        values, 
                        errors, 
                        touched, 
                        handleBlur, 
                        handleChange, 
                        handleSubmit 
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                m="40px 0 0 0"
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Numero de Documento"
                                    onBlur={handleBlur}
                                    onChange={(e) => {setDNI(e.target.value)}}
                                    value={dni}
                                    name="clientDocumentNumber"
                                    error={!!touched.clientDocumentNumber && !!errors.clientDocumentNumber}
                                    helperText={touched.clientDocumentNumber && errors.clientDocumentNumber}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <Button onClick={consultarDNI} color="secondary" variant="contained">
                                    Consultar numero de Documento
                                </Button>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Nombres"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={names}
                                    name="clientName"
                                    error={!!touched.clientName && !!errors.clientName}
                                    helperText={touched.clientName && errors.clientName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Apellidos"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={lastnames}
                                    name="clientLastname"
                                    error={!!touched.clientLastname && !!errors.clientLastname}
                                    helperText={touched.clientLastname && errors.clientLastname}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Dirección"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.clientAddress}
                                    name="clientAddress"
                                    error={!!touched.clientAddress && !!errors.clientAddress}
                                    helperText={touched.clientAddress && errors.clientAddress}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Número de teléfono"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.clientPhone}
                                    name="clientPhone"
                                    error={!!touched.clientPhone && !!errors.clientPhone}
                                    helperText={touched.clientPhone && errors.clientPhone}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Crear
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
        </Box>
    );
};

const initialValues = {
    clientDocumentNumber: ""
}

const userSchema = yup.object().shape({
    clientDocumentNumber: yup.string().required("required")
})

export default Form;