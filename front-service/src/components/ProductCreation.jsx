import React, {useState} from 'react';
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import "../styles/CreateProduct.css"
import {ProductService} from "./API/ProductService";

const ProductCreation = ({products, setProducts}) => {
    const [show, setShow] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [isTitleValid, setIsTitleValid] = useState(true)
    const [isPriceValid, setIsPriceValid] = useState(true)
    const [isImageValid, setIsImageValid] = useState(true)

     async function createProduct(e) {
        e.preventDefault()
        setIsTitleValid(title.length > 0)
        setIsPriceValid(price > 0)
        if (selectedImage === null || title.length === 0 || price <= 0)
            return

        const imageData = new FormData()
        imageData.append("image", selectedImage, "fileName")
        try {
            const newProduct = await ProductService.createProduct(imageData, title, price)
            setProducts([...products, newProduct])
            setSelectedImage(null)
            setTitle("")
            setPrice(0)
        } catch (e) {
            if (e.response.status === 406) {
                setIsTitleValid(false)
            }
        }
    }

    function handleImageChange(e) {
        const image = e.target.files[0]
        if (!image)
            return

        const imageType = image.name.split(".")[1]
        if ((imageType !== "jpg" && imageType !== "png") || image.size > 1048576) {
            setSelectedImage(null)
            setIsImageValid(false)
            return
        }

        setSelectedImage(image)
        setIsImageValid(true)
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h4/>
                <Button variant="warning" onClick={() => setShow(!show)}>Создать</Button>
            </div>
            {show &&
                <div className="content">
                    {selectedImage &&
                        <img
                            alt="not found"
                            width="250px"
                            src={URL.createObjectURL(selectedImage)}
                        />
                    }
                    <div>
                        <input
                            type="file"
                            alt=""
                            style={isImageValid ? {color: "black"} : {color: "red"}}
                            onChange={handleImageChange}
                        />
                    </div>
                    <Form onSubmit={createProduct}>
                        <FormGroup>
                            <FormLabel>Название товара</FormLabel>
                            <FormControl
                                className={isTitleValid ? "" : "is-invalid"}
                                type="text"
                                placeholder="Название товара"
                                value={title}
                                maxLength={16}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Стоимость товара</FormLabel>
                            <FormControl
                                className={isPriceValid ? "" : "is-invalid"}
                                type="number"
                                placeholder="Стоимость товара"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </FormGroup>
                        <Button className="submit-button" variant="danger" type="submit">Создать товар</Button>
                    </Form>
                </div>
            }
        </div>
    );
};

export default ProductCreation;