import { Container, Message, Table, Button, Modal, Form } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";

export default function Admin() {
    const [items, setItems] = useState([]);
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { state, httpRequest } = useAuthContext();
    const [isPermitted, setPermission] = useState(false);
    const tempItem = {
        id: "",
        title: "",
        description: "",
        includes: "",
        intendedFor: "",
        color: "",
        material: "",
        price: 0,
        isAvailable: true,
        imageUrl: ""
    };

    const [newItem, setNewItem] = useState(tempItem);
    const baseUrl = process.env.REACT_APP_RESOURCE_SERVER_URL;

    const requestConfig = {
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        method: "GET",
        url: baseUrl + '/items',
        attachToken: false,
        withCredentials: false
    };

    useEffect(() => {
        console.log(state.allowedScopes);

        //if the allowedScopes has the ADD_ITEMS_SCOPE permission
        if (state.allowedScopes.includes(process.env.REACT_APP_ADD_ITEMS_SCOPE)) {
            async function fetchItems() {
                const response = await httpRequest(requestConfig);
                setItems(response.data);
            }
            fetchItems();
            setPermission(true);
        }
    }, []);

    useEffect(() => {
        document.title = "Admin | PetStore"
    }, []);

    const handleNewItemChange = (event) => {
        const { name, value } = event.target;
        const newValue = name === 'price' ? Number(value) : value;
        setNewItem((prevNewItem) => ({
            ...prevNewItem,
            [name]: newValue
        }));

        if (selectedItem) {
            setSelectedItem((prevSelectedItem) => ({
                ...prevSelectedItem,
                [name]: newValue
            }));
        }
    };

    const handleEditItem = (item) => {
        setSelectedItem(item);
        setNewItem(item);
        setShowAddItemModal(true);
    };

    const handleAddItem = (item) => {
        setSelectedItem(null);
        setNewItem(tempItem);
        setShowAddItemModal(true);
        // setShowAddItemModal(true);
    };


    // const handleAddItemSubmit = async () => {
    //     const response = [];

    //     const postRequestConfig = ({
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*,http://localhost:3000"
    //         },
    //         method: "POST",
    //         url: baseUrl + '/items',
    //         data: [newItem],
    //         withCredentials: false

    //     });

    //     httpRequest(postRequestConfig)
    //         .then((response) => {
    //              console.log(response);
    //              setItems((prevItems) => [...prevItems, response.data[0]]);
    //              setShowAddItemModal(false);
    //         })
    //         .catch((error) => {
    //              console.error(error);
    //         });
    // };

    const handleAddItemSubmit = async () => {
        const requestConfig = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*,http://localhost:3000"
            },
            method: selectedItem ? "PATCH" : "POST",
            url: baseUrl + '/items' + (selectedItem ? '/' + selectedItem.id + '/update' : ''),
            data: selectedItem ? selectedItem : [newItem],
            withCredentials: false
        };

        httpRequest(requestConfig)
            .then((response) => {
                console.log(response);
                if (selectedItem) {
                    setItems((prevItems) => prevItems.map((item) => item.id === selectedItem.id ? response.data : item));
                } else {
                    setItems((prevItems) => [...prevItems, response.data[0]]);
                }
                setShowAddItemModal(false);
                setSelectedItem(null);
                setNewItem(tempItem);
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        // if isPermitted is false show you are not authorized  message
        !isPermitted ?
            <Container>
                <Message negative>
                    <Message.Header>Access Denied</Message.Header>
                    <p>You do not have permission to access this page.</p>
                </Message>
            </Container>
            :
            <>
                <Container className="mt-5">
                    <Table bordered hover>
                        <thead>
                            <tr>

                                <th scope="col" width="150px">Title</th>
                                <th scope="col" width="400px">Description</th>
                                <th scope="col">Includes</th>
                                <th scope="col">Intended For</th>
                                <th scope="col" width="50px">Color</th>
                                <th scope="col">Material</th>
                                <th scope="col">Price</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="align-middle">
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.includes}</td>
                                    <td>{item.intendedFor}</td>
                                    <td>{item.color}</td>
                                    <td>{item.material}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <Button variant="primary" size="sm" onClick={() => handleEditItem(item)}>Edit</Button>&nbsp;
                                        <Button variant="danger" size="sm">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button onClick={() => { handleAddItem({}); }}>Add Item</Button>
                </Container>
                <Modal open={showAddItemModal} onClose={() => setShowAddItemModal(false)}>

                    <Modal.Header>{selectedItem ? 'Edit Item' : 'Add Item'}</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Code</label>
                                <input name="id" value={newItem.id} onChange={handleNewItemChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Title</label>
                                <input name="title" value={newItem.title} onChange={handleNewItemChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <input name="description" value={newItem.description} onChange={handleNewItemChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Includes</label>
                                <input name="includes" value={newItem.includes} onChange={handleNewItemChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Intended For</label>
                                <input name="intendedFor" value={newItem.intendedFor} onChange={handleNewItemChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Color</label>
                                <input name="color" value={newItem.color} onChange={handleNewItemChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Material</label>
                                <input name="material" value={newItem.material} onChange={handleNewItemChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input name="price" value={newItem.price} onChange={handleNewItemChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setShowAddItemModal(false)}>Cancel</Button>
                        <Button onClick={handleAddItemSubmit}>{selectedItem ? 'Save' : 'Add'}</Button>
                    </Modal.Actions>
                </Modal>
            </>
    );
}

