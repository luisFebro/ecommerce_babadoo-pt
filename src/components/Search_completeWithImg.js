import _ from 'lodash'
import { storeProducts } from '../data'
import React, { Component } from 'react'
import Search from '@bit/semantic-org.semantic-ui-react.search'
import styled from 'styled-components';
import { ProductConsumer } from "../context";
// const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

const source = storeProducts;
console.log("source", source);

class Search_completeWithImg extends Component {
    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)
            const source2 = this.props.products;
            console.log("source2", source2);
            this.setState({
                isLoading: false,
                results: _.filter(source2, isMatch),
            })
        }, 300)
    }


    render() {
        const { isLoading, value, results } = this.state

        return (
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                {...this.props}
            />
        )
    }
}

export default (()=> <DivContainer><Search_completeWithImg /></DivContainer>)

const DivContainer = styled.div`
    .ui.input>input {
        margin: 0;
        max-width: 30px;
        -webkit-box-flex: 1;
        -ms-flex: 1 0 auto;
        flex: 1 0 auto;
        outline: 0;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        text-align: left;
        line-height: 1.21428571em;
        font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        padding: .67857143em 1em;
        background: #fff;
        border: 1px solid rgba(34, 36, 38, .15);
        color: rgba(0, 0, 0, .87);
        border-radius: .28571429rem;
        -webkit-transition: border-color .1s ease, -webkit-box-shadow .1s ease;
        transition: border-color .1s ease, -webkit-box-shadow .1s ease;
        transition: box-shadow .1s ease, border-color .1s ease;
        transition: box-shadow .1s ease, border-color .1s ease, -webkit-box-shadow .1s ease;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .ui.search>.results .result:last-child {
        border-bottom: none !important;
    }

    .ui.search>.results .result {
        cursor: pointer;
        display: block;
        overflow: hidden;
        font-size: 1em;
        padding: .85714286em 1.14285714em;
        color: rgba(0, 0, 0, .87);
        line-height: 1.33;
        border-bottom: 1px solid rgba(34, 36, 38, .1);
    }

    .image {
        float: right;
        overflow: hidden;
        background: 0 0;
        width: 5em;
        height: 3em;
        border-radius: .25em;
    }

    .ui.search>.results .result .image+.content {
        margin: 0 6em 0 0;
    }

    .ui.search>.results .result .price {
        float: right;
        color: #21ba45;
    }

    .ui.search>.results .result .title {
        margin: -.14285714em 0 0;
        font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 700;
        font-size: 1em;
        color: rgba(0, 0, 0, .85);
    }

    .ui.search>.results .result .description {
        margin-top: 0;
        font-size: .92857143em;
        color: rgba(0, 0, 0, .4);
    }
`;

// HTML
/*<div class="ui grid">
    <div class="six wide column">
        <div class="ui search backGroundTemp" style="right: 0px; top: 15px; position: fixed; display: block;">
            <div class="ui icon input"><input type="text" tabindex="0" class="prompt" autocomplete="off" value="Kit Com 2 Algemas Velc"><i aria-hidden="true" class="search icon"></i></div>
            <div class="results transition">
                <div class="result">
                    <div class="image"><img src="https://imgur.com/QrOtS1h.png"></div>
                    <div class="content">
                        <div class="price">R$40,0</div>
                        <div class="title">Kit Com 2 Algemas Velcro</div>
                        <div class="description">sadomasoquismo</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>*/
