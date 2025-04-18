import { useEffect, useState } from 'react'
import api from '../../../services/api';
import Table from './Table/Table'
import BackButton from '../../GlobalComponents/BackButton/BackButton';
import ModalCreateUser from '../../RegisterUser/ModalCreateUser';
import './styleHome.css'
// import { useNavigate } from 'react-router-dom';


//Fazer linha e coluna assim como velog. Usar map
function Home() {
    const [users, setUsers] = useState([])

    const [columns] = useState([
        { label: "ID", field: "id" },
        { label: "Nome", field: "name" },
        { label: "Cpf", field: "cpf" },
        { label: "Idade", field: "age" },
        { label: "Email", field: "email" },
        { label: "N°Apólice", field: "apolices[0].numApolice" },
        { label: "Seguradora", field: "apolices[0].nomeSeguradora" },
        { label: "Tipo", field: "apolices[0].tipoSeguro" },
        { label: "Ação", field: "action" }
    ]);

    async function getUsers() {
        const usersFromDB = await api.get('/users')
        setUsers(usersFromDB.data);
    }

    async function deleteUsers(id) {
        await api.delete(`/users/${id}`)
        getUsers()
    }

    useEffect(() => {
        getUsers()
    }, [])


    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <div className='container-home'>
                <div className='header-home'>
                    <h1>Cadastrar usuário</h1>
                </div>
                <form>
                    <div className='form-content'>
                        <BackButton className={openModal ? 'hidde' : 'backButton'} />
                        <button className={openModal ? 'hiddde' : 'createButton'} type='button' onClick={() => setOpenModal(true)}>
                            Criar usuário
                        </button>
                        <div className='line'></div>
                        <ModalCreateUser isOpen={openModal} setModalOpen={(isOpen) => setOpenModal(isOpen)} />

                        <Table columns={columns} data={users} onDelete={deleteUsers} openModal={openModal} />
                    </div>
                </form>
            </div>
        </>
    )
}
export default Home