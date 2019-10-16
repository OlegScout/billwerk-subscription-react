interface GeneralInfoState {
    firstName: string,
    lastName: string,
    cardNumber: string,
    expiryMonth: string,
    expiryYear: string,
    cardHolder: string,
    cvc: string,
    generationTime?: string,
    isLoading: boolean
}

export default GeneralInfoState