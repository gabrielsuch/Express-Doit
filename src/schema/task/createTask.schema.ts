import * as yup from "yup"


const createTaskSchema = yup.object().shape({
    title: yup.string().required().max(100),
    description: yup.string().required().max(255)
})



export default createTaskSchema