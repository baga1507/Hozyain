import React, {useState} from 'react';
import {Button, Form, FormGroup} from "react-bootstrap";
import "../styles/Filters.css"

const Filters = ({filter, setFilter, fetchProducts}) => {
    const [isShow, setIsShow] = useState(false)
    const [localMin, setLocalMin] = useState(null)
    const [localMax, setLocalMax] = useState(null)

    function reset() {
        setLocalMin(null)
        setLocalMax(null)
    }

    function toFilter(e) {
        e.preventDefault()
        setFilter({min_price: localMin, max_price: localMax})
    }

    return (
        <div className="Filters">
            <Button
                variant={isShow ? "danger" : "outline-danger"}
                onClick={() => setIsShow(!isShow)}
            >
                Фильтры
            </Button>
            {isShow &&
                <div className="Filters__content">
                    <Form onSubmit={toFilter}>
                        <FormGroup>
                            <Form.Label>Минимальная цена</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите минимальную сумму"
                                value={localMin !== null ? localMin : ""}
                                onChange={e => setLocalMin(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Максимальная цена</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Введите максимальную сумму"
                                value={localMax !== null ? localMax : ""}
                                min={10}
                                onChange={e => setLocalMax(e.target.value)}
                            />
                        </FormGroup>
                        <Button className="Filters__submit" variant="outline-danger" type="submit">
                            Отфильтровать
                        </Button>
                        <Button className="Filters__reset" variant="outline-dark" type="submit" onClick={reset}>
                            Сбросить
                        </Button>
                    </Form>
                </div>
            }
        </div>
    );
};

export default Filters;
