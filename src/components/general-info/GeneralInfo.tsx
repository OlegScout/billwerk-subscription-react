import React, { Component } from 'react';
import * as constants from '../../constants';
import GeneralInfoProps from '../../interfaces/general-info/generalInfoProps';
import GeneralInfoState from '../../interfaces/general-info/generalInfoState';
import Cart from '../../interfaces/general-info/cart';
import Customer from '../../interfaces/general-info/customer';
import PaymentData from '../../interfaces/general-info/paymentData';
// import UrlHelper from '../../helpers/urlHelper'
import './GeneralInfo.css';
declare var SubscriptionJS: any;

class GeneralInfo extends Component<GeneralInfoProps, GeneralInfoState> {
    constructor(props: GeneralInfoProps) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            cardNumber: '',
            expiryMonth: '',
            expiryYear: '',
            cardHolder: '',
            cvc: '',
            generationTime: '',
            isLoading: false
        };
        this.handleSignup = this.handleSignup.bind(this)
    }

    handleSignup(event: any) {
        event.preventDefault();
        let root = this;
        root.setState({isLoading: true});

        let signupService = new SubscriptionJS.Signup();
        let paymentService = new SubscriptionJS.Payment(
            {
                publicApiKey: constants.publicApiKey,
                providerReturnUrl: constants.providerReturnUrl
            },
            function () {
                createOrder();
            },
            function () {
                alert("PSP initialization failed.");
            }
        );

        let cart: Cart = {
            // planVariantId: UrlHelper.getPlanVariantId()
            planVariantId: constants.planVariantId
        };

        let customer: Customer = {
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };

        let paymentData: PaymentData = {
            bearer: 'CreditCard:' + constants.paymentServiceProvider,
            cardNumber: this.state.cardNumber,
            expiryMonth: this.state.expiryMonth,
            expiryYear: this.state.expiryYear,
            cardHolder: this.state.cardHolder,
            cvc: this.state.cvc
        };

        let createOrder = function () {
            signupService.createOrder(cart, customer, pay, errorHandler);
        };

        let pay = function (order: any) {
            signupService.paySignupInteractive(paymentService, paymentData, order, paymentHandler, errorHandler);
        };

        let paymentHandler = function (result: any) {
            root.setState({isLoading: false});
            if (!result.Url) {
                alert("Signup successful completed!");
            }
            else {
                window.location.href = result.Url;
            }
        };

        let errorHandler = function (errorData: any) {
            root.setState({isLoading: false});
            alert("Subscription failed. Check your data.");
            console.log(errorData);
        };
    }

    render() {
        return (
            <div className="general-info">
                <div className={!this.state.isLoading ? 'hidden loader' : 'loader'}>
                    <div className="loader-animation">Loading data…</div>
                </div>

                <form onSubmit={this.handleSignup}>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="section">
                                <div className="section-header">
                                    <h4>Your Personal Data</h4>
                                </div>
                                <div className="section-content person-data-section">
                                    <div className="row">
                                        <div className="form-group col-sm-6">
                                            <label className="control-label">First Name</label>
                                            <input
                                                required={true}
                                                type="text"
                                                className="form-control"
                                                placeholder="John"
                                                onChange={event => this.setState({ firstName: event.target.value })} />
                                        </div>
                                        <div className="form-group col-sm-6">
                                            <label className="control-label">Last Name</label>
                                            <input
                                                required={true}
                                                type="text"
                                                className="form-control"
                                                placeholder="Smith"
                                                onChange={event => this.setState({ lastName: event.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="section">
                                <div className="section-header">
                                    <h4>Your Payment Data</h4>
                                </div>
                                <div className="section-content payment-section">
                                    <div className="row">
                                        <div className="payment-cc">
                                            <div className="form-group col-lg-12 col-xs-12 col-sm-12">
                                                <label className="control-label">Card Holder</label>
                                                <input
                                                    required={true}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="John Smith"
                                                    onChange={event => this.setState({ cardHolder: event.target.value })} />
                                            </div>

                                            <div className="form-group col-lg-8 col-xs-12 col-sm-8">
                                                <label className="control-label">Credit Card Number</label>
                                                <input
                                                    required={true}
                                                    maxLength={16}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0000000000000000"
                                                    onChange={event => this.setState({ cardNumber: event.target.value })} />
                                            </div>

                                            <div className="form-group col-lg-4 col-xs-12 col-sm-4">
                                                <label className="control-label">CVC</label>
                                                <input
                                                    maxLength={4}
                                                    required={true}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="0000"
                                                    onChange={event => this.setState({ cvc: event.target.value })} />
                                            </div>

                                            <div className="col-lg-4 col-xs-4 col-sm-4 text-right">
                                                <label className="control-label">valid until</label>
                                            </div>

                                            <div className="col-lg-4 col-xs-4 col-sm-4">
                                                <select
                                                    required={true}
                                                    className="form-control col-lg-4"
                                                    onChange={event => this.setState({ expiryMonth: event.target.value })}
                                                    defaultValue="" >
                                                    <option value="" disabled={true}>MM</option>
                                                    <option value="01">01</option>
                                                    <option value="02">02</option>
                                                    <option value="03">03</option>
                                                    <option value="04">04</option>
                                                    <option value="05">05</option>
                                                    <option value="06">06</option>
                                                    <option value="07">07</option>
                                                    <option value="08">08</option>
                                                    <option value="09">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select>
                                            </div>

                                            <div className="col-lg-4 col-xs-4 col-sm-4">
                                                <select
                                                    required={true}
                                                    className="form-control"
                                                    onChange={event => this.setState({ expiryYear: event.target.value })}
                                                    defaultValue="" >
                                                    <option value="" disabled={true}>JJ</option>
                                                    <option value="2020">20</option>
                                                    <option value="2021">21</option>
                                                    <option value="2022">22</option>
                                                    <option value="2023">23</option>
                                                    <option value="2024">24</option>
                                                    <option value="2025">25</option>
                                                    <option value="2026">26</option>
                                                    <option value="2026">27</option>
                                                    <option value="2026">28</option>
                                                    <option value="2026">29</option>
                                                    <option value="2026">30</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <button className="btn action-button pull-right">
                                Chargeable order
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default GeneralInfo;
