import * as yup from "yup"


const createUserSchema = yup.object().shape({
    name: yup.string().required().max(50),
    email: yup.string().required().email().max(100),
    password: yup.string().required()
})


export default createUserSchema