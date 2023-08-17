import React, {useState} from 'react';
import {Button, Form, FormGroup} from "react-bootstrap";

const Filters = ({filter, setFilter, fetchProducts}) => {
    const [isShow, setIsShow] = useState(false)
    let localMin
    let localMax

    function toFilter(e) {
        e.preventDefault()
        e.target.reset()
        setFilter({min_price: localMin, max_price: localMax})
    }

    return (
        <div className="Filters">
            <Button variant="outline-primary" onClick={() => setIsShow(!isShow)}>Фильтры</Button>
            {isShow &&
                <div>
                    <Form onSubmit={toFilter}>
                        <FormGroup>
                            <Form.Label>Минимальная цена</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите минимальную сумму"
                                value={localMin}
                                onChange={e => localMin = e.target.value}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Максимальная цена</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите максимальную сумму"
                                value={localMax}
                                onChange={e => localMax = e.target.value}
                            />
                        </FormGroup>
                        <Button style={{marginTop: "5px"}} type="submit">Отфильтровать</Button>
                    </Form>
                </div>
            }
        </div>
    );
};

export default Filters;
