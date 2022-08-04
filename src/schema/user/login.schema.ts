import * as yup from "yup"


const loginSchema = yup.object().shape({
    email: yup.string().required().email().max(100),
    password: yup.string().required()
})


export default loginSchema