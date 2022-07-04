import './Products.css';
import React, {useEffect, useState} from 'react';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, TextField, Button, Modal} from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const url='http://localhost:8080/products';

// use of STYLED de MATERIAL
const PREFIX = 'Products';
const classes = {
    modal: `${PREFIX}-modal`,
    iconos: `${PREFIX}-iconos`,
    inputMaterial: `${PREFIX}-inputMaterial`,
}
const Root = styled('div')(({ theme }) => ({
    [`&.${classes.root}`]: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main
    },
    [`&.${classes.modal}`]: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    [`&.${classes.iconos}`]: {
        cursor: 'pointer'
    },
    [`&.${classes.inputMaterial}`]: {
        width: '100%'
    }
})) 
// *************************************************************************
const Products = () => {

    const token = localStorage.getItem('accessToken');
    const [ data, setData ]= useState([]);
    const [ modalInsertar, setmodalInsertar ]= useState(false);
    const [ newData, setNewData] = useState({
        product: '',
        price: '',
        type: '',
        dateEntry: '',
        image: '',
    });
    // datos que ingresan al INPUT del MODAL
    const handleChangeModal=e=>{
        const {name, value}=e.target;
        setNewData(prevState=>({
            ...prevState,
            [name]: value
        }))
    }

    //FETCH: obtención de datos GET
    const peticionGet = () => fetch(url,{
        method: "GET",
        headers:{
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(json => console.log(setData(json)))
    .catch(err => console.log(err));

    //FETCH subir datos POST
    const peticionPost = () => fetch(url,{
        method: 'POST',
        body: JSON.stringify({
            name:newData.product, 
            price:newData.price, 
            type:newData.type, 
            dateEntry:newData.dateEntry, 
            image:newData.image
        }),
        headers:{
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(response => {
        setData([...data, response]);
        abrirCerrarModalInsertar();
    })
    .catch(error => error)

    // función que ABRE o CIERAA el modal
    const abrirCerrarModalInsertar=()=>{
        setmodalInsertar(!modalInsertar);
    }    

    // muestra los datos obtenidos
    useEffect(()=>{
        peticionGet();
    },[])
    // Insertar el cuerpo del MODAL
    const bodyInsertarModal=(
        <div className={classes.modal}>
            <h3>Editar Consola</h3>
            <TextField name="product" className={classes.inputMaterial} label="Product" onChange={handleChangeModal}/>
            <br />
            <TextField name="price" className={classes.inputMaterial} label="Price" onChange={handleChangeModal}/>
            <br />
            <TextField name="type" className={classes.inputMaterial} label="Type" onChange={handleChangeModal}/>
            <br />
            <TextField name="dateEntry" className={classes.inputMaterial} label="DateEntry" onChange={handleChangeModal}/>
            <br />
            <TextField name="image" className={classes.inputMaterial} label="Image" onChange={handleChangeModal}/>
            <br /><br />
            <div>
                <Button color='primary' onClick={peticionPost}>INSERT</Button>
                <Button onClick={abrirCerrarModalInsertar}>CANCEL</Button>
            </div>
        </div>
    )

    return(
        <div className='Table'>
            <br />
            <Button onClick={abrirCerrarModalInsertar}>INSERTAR</Button>
            <br /><br />
            
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>DateEntry</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Tools</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.type}</TableCell>
                                <TableCell>{product.dateEntry}</TableCell>
                                <TableCell>{product.image}</TableCell>
                                <TableCell>
                                    <Edit />
                                    &nbsp;&nbsp;&nbsp;
                                    <Delete />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <Root className={classes.root}>                             
                <Modal
                open={modalInsertar}
                onClose={abrirCerrarModalInsertar}>
                    {bodyInsertarModal}   
                </Modal>
                </Root>
            </div>

        </div>       
    );
}

export default Products;