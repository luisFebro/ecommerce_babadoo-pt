import React, { useState, Fragment } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import ShowImgOrSkeleton from '../../ShowImgOrSkeleton';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { addFieldUser, deleteFieldUser } from '../../../redux/actions/userActions';
import { getItem } from '../../../redux/actions/productActions';
import { showSnackbar } from '../../../redux/actions/snackbarActions';
import { showModalRegister } from '../../../redux/actions/modalActions';
import { productType } from '../../../types';

// End Redux
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// helpers
import truncateWords from '../../../utils/string/truncateWords';
import PropTypes from 'prop-types';

Product.propTypes = {
    product: productType,
    isFav: PropTypes.bool
}

export default function Product({ product, isFav }) {
    const [isFavChanged, setIsFavChanged] = useState(false);
    const [showSkeleton, setShowSkeleton] = useState(true);
    // const [isAddedAsFav, setIsAddedAsFav] = useState(isFav);

    const { allProductsList, isUserAuthenticated, _idUser } = useStoreState(state => ({
        allProductsList: state.productReducer.cases.allProductsList,
        isUserAuthenticated: state.authReducer.cases.isUserAuthenticated,
        _idUser: state.userReducer.cases.currentUser['_id']
    }));
    const dispatch = useStoreDispatch();
    // console.log("isAuth", isUserAuthenticated); //Check this behavior: auth is running multiple 11 times
    const toggleFav = () => {
        setIsFavChanged(!isFavChanged);
    };
    const { _id, title, price, link  } = product;
    // need to include inCart here added from client
    const inCart = false;
    const bodyToSendFavorite = (AllProds, _id) => {
        const obj = getItem(AllProds, _id);
        return { favoriteList: obj };
    };
    const bodyFavorite = bodyToSendFavorite(allProductsList, _id);

    const showImage = () => (
        <Link to={`/produto/${link}`}>
            <ShowImgOrSkeleton
                id={_id}
                url="product"
                setStatus={setShowSkeleton}
                status={showSkeleton}
                skeletonOpt={{
                    variant: 'rect',
                    width: 191,
                    height: 191,
                }}
                imgOpt={{
                    className: "card-img-top",
                    alt: title
                }}
            />
        </Link>
    );

    const handleFavButton = () => (
        <button className="cart-fav" onClick={() => toggleFav()}>
            {isUserAuthenticated ? (
                isFavChanged || isFav ? (
                    <i
                        className="filledHeart fas fa-heart animated heartBeat fast"
                        onClick={() => {
                            deleteFieldUser(dispatch, bodyFavorite, _idUser);
                            showSnackbar(dispatch, 'Removido dos seus favoritos!');
                        }}
                        style={{
                            animationIterationCount: 3
                        }}
                    ></i>
                ) : (
                    <Fragment>
                        {showSkeleton
                        ? <Skeleton variant="circle" width={30} height={30} />
                        : (
                            <i
                            className="emptyHeart far fa-heart"
                            onClick={() => {
                                addFieldUser(dispatch, bodyFavorite, _idUser);
                                showSnackbar(dispatch, 'Adicionado aos Seus Favoritos', 'success');
                                // value.openModalFavorite(_id);
                            }}
                            ></i>
                        )}
                    </Fragment>
                )
            ) : (
                <i
                    className="emptyHeart far fa-heart"
                    onClick={() => {
                        showModalRegister(dispatch);
                        showSnackbar(
                            dispatch,
                            'Faça seu acesso para adicionar aos favoritos!'
                        );
                    }}
                ></i>
            )}
        </button>
    );

    const handleCartButton = () => (
        <button
            style={{ display: showSkeleton ? 'none' : 'block'}}
            className="cart-btn"
            disabled={inCart ? true : false}
            onClick={() => {
                // value.addToCart(_id);
                // value.openModal(_id);
            }}
        >
            {inCart ? (
                <p className="text-capitalize mb-0" disabled>
                    {' '}
                    No carrinho
                </p>
            ) : (
                <i className="fas fa-cart-plus"></i>
            )}
        </button>

    );

    // Footer
    const showTitle = () => (
        <p style={{ height: '4em', overflow: 'hidden' }} className="mb-0 text-capitalize">
            {showSkeleton
            ? (
                <Fragment>
                    <Skeleton variant="text" style={{marginTop: '5px'}}/>
                    <Skeleton variant="text" style={{marginLeft: '130px'}} />
                </Fragment>
            )
            : truncateWords(title, 40)}
        </p>
    );

    const showPrice = () => (
        <h5 className="mt-2 text-right mb-2 mr-2">
            <span
                style={{display: showSkeleton ? 'none' : 'block'}}
            >
                R$ {price}
            </span>
        </h5>
    );

    return (
        <ProductWrapper className="col-6 col-md-4 col-lg-3 mx-auto my-2">
            <div className="card">
                <div
                    className="img-container p-1 p-sm-3"
                >
                    {showImage()}
                    {handleFavButton()}
                    {handleCartButton()}
                </div>
                <div className="text-product-title p-1 card-footer d-flex flex-column text-center justify-content-between">
                    {showTitle()}
                    {showPrice()}
                </div>
            </div>
        </ProductWrapper>
    );
}

const ProductWrapper = styled.div`
    .card {
        box-shadow: 0 19px 38px rgba(0,0,0,0.20), 0 15px 12px rgba(0,0,0,0.12);
        border-color: transparent;
        transition: all 1s linear;
    }
    .card-footer {
        background: transparent;
        border-top: transparent;
        transition: all 1s linear;
    }
    &:hover {
        .card{
            box-shadow: 0 19px 38px rgba(0,0,0,0.40), 0 15px 12px rgba(250,0,0,0.32)
            border: .04rem solid rgba(0, 0, 0, .2);
        }
        .card-footer {
            background: rgba(247, 247, 247);
        }
    }

    .img-container {
        position: relative;
        overflow: hidden; //This is essencial for handle bigger pics
    }

    .card-img-top {
        transition: all .6s linear;
    }

    .img-container:hover .card-img-top {
        transform: scale(1.2);
    }

    .cart-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: .2rem .4rem;
        background: var(--mainYellow);
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: .5rem 0 0 0;
        transform: translate(0, 0); /*translate(100%, 100%)*/
        transition: all 1s linear;
    }

    .cart-fav {
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
    }

    .cart-fav i {
        color: var(--mainRed);
        font-size: 1.7rem;
        transition: .5s;
    }

    .cart-fav .emptyHeart {
        opacity: .3;
    }

    .cart-fav .filledHeart {
        opacity: 1;
        transform: scale(1.1);
    }

    .cart-fav .emptyHeart:hover {
        opacity: 1;
        transform: scale(1.1);
    }

    .cart-btn:hover {
        color: var(--mainBlue);
        cursor: pointer;
    }

    .cart-btn:focus, .cart-fav:focus {
        outline: none;
    }

    .img-container:hover .cart-btn {
        transform: translate(0, 0);
    }
`;
