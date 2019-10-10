import React, { Fragment } from 'react';
import Title from '../../components/Title';
import { bizEmail } from '../../data/dataBiz';
import { useStoreState } from 'easy-peasy';
import RegisteredUsersList from './RegisteredUsersList';

export default function Dashboard() {
    const { email } = useStoreState(state => ({
        email: state.authReducer.cases.user.email
    }));

    return (
        <div>
            { (email === bizEmail) ?
                <Fragment>
                    <Title title="Painel de Controle Babadoo" />
                    <h2 className="text-title text-center">Somente a Conta Admin tem acesso a esta página com autentificação válida</h2>
                    <br />
                    <br />
                    <br />
                    <RegisteredUsersList />
                </Fragment> :
                <Title title="Oops! Você não tem permissão de acessar esta página." />
            }
        </div>
    );
}