import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonContainerPressedEffectDark as DarkBtn } from '../../components/buttons/Default';
import ShoppingSummary from './ShoppingSummary';
import FormCheckoutWithNodeMailer from '../../components/forms/FormCheckoutWithNodeMailer';

export default function checkoutLocal() {
    return (
        <React.Fragment>
            <DivContainer className="container">
                <ShoppingSummary />
                <FormCheckoutWithNodeMailer />
            </DivContainer>
            <div className="container">
                <div className="row">
                    <Link to="/seu-carrinho" className="col-10 mx-auto text-uppercase my-4">
                        <DarkBtn>Voltar Carrinho</DarkBtn>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
}

const DivContainer = styled.div`
    * {
        box-sizing: border-box;
    }

    body {
        background: #92bde7;
        color: #485e74;
        line-height: 1.6em;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 1em;
    }

    .container {
        max-width: 1170px;
        margin-left: auto;
        margin-right: auto;
        padding: 1em;
    }

    ul {
        list-style: none;
        padding: 0;
    }

    .brand {
        text-align: center;
    }

    .brand span {
        color: var(--mainWhite);
    }

    .wrapper {
        box-shadow: 0 0 20px 0 rgba(72, 94, 116, 0.7);
    }

    .wrapper > * {
        padding: 2em;
    }

    .company-info {
        color: var(--mainWhite);
        background: var(--mainRed);
    }

    .company-info h3,
    .company-info ul {
        text-align: center;
        margin: 0 0 1rem 0;
    }

    .contact {
        background: #f9feff;
    }

    /* FORM STYLES */
    .contact form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        padding: 1em;
    }

    .contact form label {
        display: block;
    }

    .contact form p {
        margin: 0;
    }

    .contact form .full {
        grid-column: 1 / 3;
    }

    .contact form button,
    .contact form input,
    .contact form textarea,
    .contact form buyer-name {
        width: 100%;
        border: 1px solid #c9e6ff;
        height: 3em;
    }

    .contact form button {
        background: #c9e6ff;
        border: 0;
        text-transform: uppercase;
    }

    .contact form button:hover,
    .contact form button:focus {
        background: #92bde7;
        color: #fff;
        outline: 0;
        transition: background-color 2s ease-out;
    }

    /* LARGE SCREENS */
    @media (min-width: 700px) {
        .wrapper {
            display: grid;
            grid-template-columns: 1fr 2fr;
        }

        .wrapper > * {
            padding: 2em;
        }
        //.company-info h3, .company-info ul, .brand{
        text-align: left;
    }
`;

//ADPT THIS:
// import React, {Component} from 'react';
// import axios from 'axios';

// class ContactForm extends Component{
//     handleSubmit(e){
//         e.preventDefault();
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const message = document.getElementById('message').value;
//         axios({
//             method: "POST",
//             url:"http://localhost:3002/send",
//             data: {
//                 name: name,
//                 email: email,
//                 message: message
//             }
//         }).then((response)=>{
//             if (response.data.msg === 'success'){
//                 alert("Message Sent.");
//                 this.resetForm()
//             }else if(response.data.msg === 'fail'){
//                 alert("Message failed to send.")
//             }
//         })
//     }

//     resetForm(){
//         document.getElementById('contact-form').reset();
//     }

//     render(){
//         return(
//             <div className="col-sm-4 offset-sm-4">
//                 <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
//                     <div className="form-group">
//                         <label for="name">Name</label>
//                         <input type="text" className="form-control" id="name" />
//                     </div>
//                     <div className="form-group">
//                         <label for="exampleInputEmail1">Email address</label>
//                         <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
//                     </div>
//                     <div className="form-group">
//                         <label for="message">Message</label>
//                         <textarea className="form-control" rows="5" id="message"></textarea>
//                     </div>
//                     <button type="submit" className="btn btn-primary">Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

// export default ContactForm;