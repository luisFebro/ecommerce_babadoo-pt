import React, { useEffect, useState, Fragment } from 'react';
// Redux
import { useStoreState, useStoreDispatch } from 'easy-peasy';
import { getAllProducts } from '../../redux/actions/productActions';
import { checkForServerError } from '../../redux/actions/errorActions';
// End Redux
import LoadingIndicator from '../LoadingIndicator';
import Product from './Product';
import { ProductConsumer } from '../../data/contexts/mainContext';
import PropTypes from 'prop-types';

ProductList.propTypes = {
    checkForServerError: PropTypes.bool,
    getAllProducts: PropTypes.func,
    isLoading: PropTypes.bool,
    allProductsList: PropTypes.object,
}

export default function ProductList() {
    const [isError, setIsError] = useState(false);
    // Redux
    const { isLoading, allProductsList, serverStatus, allFavProductsList } = useStoreState(state => ({
        allFavProductsList: state.userReducer.cases.allFavProductsList,
        isLoading: state.productReducer.cases.isLoading,
        allProductsList: state.productReducer.cases.allProductsList,
        serverStatus: state.errorReducer.cases.status
    }));
    const dispatch = useStoreDispatch();
    // End Redux

    const IdFavList = allFavProductsList.map(fav => {
        return fav._id;
    });

    useEffect(() => {
        if(checkForServerError(serverStatus)) {
            console.log("errorServerDetected", serverStatus);
            setIsError(true);
        } else {
            console.log("ServerFine", serverStatus);
            getAllProducts(dispatch);
        }

    }, [serverStatus, setIsError]);

    return (
        <Fragment>
            <div className="py-5">
                <div className="container">
                    <div className="row text-center">
                        {isError && <div className="text-center text-sub-title">Ocorreu um problema no servidor.<br />Tente recarregar a página novamente<br />ou<br />Verifique sua conexão à internet</div>}
                        {isLoading ? (
                            <div className="col-10 mx-auto">
                                <LoadingIndicator />
                            </div>
                        ) : (
                            allProductsList.map(product => {
                                // Check if the product was added as favorite
                                // Warning: this iterator is being called multiple times
                                let isAddedFav = false;
                                if(IdFavList) {
                                    if(IdFavList.includes(product._id)) {
                                        isAddedFav = true;
                                    }
                                }
                                return <Product key={product._id} product={product} isFav={isAddedFav} />
                            })
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}