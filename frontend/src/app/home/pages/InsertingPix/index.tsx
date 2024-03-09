import styles from "./index.module.css";
import Pichu from "../../components/logo";
import Message from "../../components/mensage";
import SubmitButton from "../../components/SubmitButton";
import Form from "../../components/Form";
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import axios from "axios";

const InsertingPix = () => {

    const [nome, setNomeCompleto] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate(); 

    const insertBoletoHandler = (event) => {

        event.preventDefault();

        axios.post("http://127.0.0.1:8000/backend/api/payment/inserting/pix", 
        {
            "nome_completo": nome,
            "cpf": cpf
        })
        .then(res => {if (res.data.message == "metodo de pagamento cadastrado com sucesso") {

            navigate("/paymentMethod/inserting")
            alert(res.data.message)
        }else if (res.data.message == "Já existe um pix cadastrado no sistema"){

            alert(res.data.message)

        }else {

            alert("Informações inválidas")

        } } )

    }

    return (
        <div>
            <Pichu></Pichu>
            <Message value="preencha com as suas informações"></Message>
            <form className={styles.forms}>
            <div>
            <Form placeholder= "Digite aqui o seu nome completo"  onChange={event => 
            setNomeCompleto(event.target.value)}></Form>  
            </div>
            <div>
            <Form placeholder= "Digite aqui o seu CPF"  onChange={event => 
            setCpf(event.target.value)}></Form>
            </div>
            <SubmitButton onClick = {event => insertBoletoHandler(event)} value = "Inserir pix"></SubmitButton>
            </form>
        </div>
    )

}

export default InsertingPix
