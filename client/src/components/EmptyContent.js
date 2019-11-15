import React, { Fragment } from 'react';

export default function EmptyContent({ text, img }) {
    return (
        <Fragment>
            <h2 className="text-center text-sub-title-upper">{text}</h2>
            <div className="container-center">
                <img className="image-center shadow-elevation" src={img} alt="conteúdo da página está vazio" />
            </div>
        </Fragment>
    );
}
