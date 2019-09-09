import React, { Component } from 'react';
import styled from 'styled-components';
import { ProductConsumer } from '../context';
import { ButtonContainerPressedEffectDark as DarkBtn, ButtonContainerPressedEffectYellow as YellowBtn} from './Button';
import { Link } from 'react-router-dom';

export default class Modal extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value) => {
                    const { modalOpen , closeModal } = value;
                    const { image, title, price } = value.modalProduct;
                    if(!modalOpen) {
                        return null;
                    } else {
                        return (
                            <ModalContainer>
                                <div className="container">
                                    <div className="row">
                                        <div
                                            id="modal"
                                            className="col-8 col-md-6 col-lg-4 mx-auto text-center text-capitalize p-5"
                                        >
                                            <h3 className="animated flip zoomIn slow mb-5 text-title"><strong>Item adicionado ao carrinho!</strong></h3>
                                            <img src={image} alt="product" className="img-fluid"/>
                                            <section className="my-2">
                                                <h5>{title}</h5>
                                                <h5 className="text-yellow">preço: R$ {price}</h5>
                                            </section>
                                            <div className="d-flex flex-row justify-content-center align-items-center mt-2">
                                                <Link to="/">
                                                    <DarkBtn onClick={()=> closeModal()}>
                                                        Vitrine
                                                    </DarkBtn>
                                                </Link>
                                                <Link to="/seu-carrinho">
                                                    <YellowBtn onClick={()=> closeModal()}>
                                                        Carinho
                                                    </YellowBtn>
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </ModalContainer>
                        );
                    }
                }}
            </ProductConsumer>
        );
    }
}

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    #modal {
        background: var(--mainWhite);
    }
`;