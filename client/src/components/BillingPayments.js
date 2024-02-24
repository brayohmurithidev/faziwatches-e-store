import React, {useState} from 'react';
import {Button, Divider, Grid, Paper, Tooltip} from "@mui/material";
import {useSelector} from "react-redux";
import mastercard from '../assets/icons/mastercard-2.png';
import mpesa from '../assets/icons/mpesa.png';
import paypal from '../assets/icons/paypal.png';
import visa from '../assets/icons/visa.png';
import DynamicModal from "./DynamicModal";
import {AddNewPaymentMethodForm, EditPaymentForm, EditShippingAddressForm, RemoveBilling} from "./CustomForms";


const BillingPayment = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState('')
    const {userInfo} = useSelector(state => state.auth)
    const [formData, setFormData] = useState({});


    const handleEdit = (method) => {
        setSelectedAction('editPayment');
        setFormData(method)
        setIsModalOpen(true)
    }

    const handleEditAddress = (address) => {
        setSelectedAction('shippingAddress');
        setFormData(address)
        setIsModalOpen(true)
    }

    const handleAddPaymentMethod = () => {
        setSelectedAction('addPaymentMethod');
        setIsModalOpen(true)
    }
    const handleAddShippingAddress = () => {
        setSelectedAction('addShippingAddress');
        setIsModalOpen(true)
    }

    const handleDelete = (data, type) => {
        setSelectedAction('remove');
        setFormData({
            type,
            id: data?.id
        })
        setIsModalOpen(true)

    }


    return (
        <div>
            {selectedAction !== '' && <DynamicModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {selectedAction === 'editPayment' ?
                    <EditPaymentForm data={formData}/> : selectedAction === 'shippingAddress' ?
                        <EditShippingAddressForm
                            data={formData}/> : selectedAction === 'addPaymentMethod' ?
                            <AddNewPaymentMethodForm/> : selectedAction === 'addShippingAddress' ?
                                <EditShippingAddressForm/> : selectedAction === 'remove' ?
                                    <RemoveBilling data={formData}/> : 'You not about to edit'}
            </DynamicModal>}
            {/*    */}
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <h2>Shipping information</h2>
                    <Paper elevation={3} className='billing-data-wrapper'>
                        {userInfo?.addresses?.length === 0 ?
                            <div><Button onClick={handleAddShippingAddress} variant='contained'>Add Billing
                                Information</Button>
                            </div> : userInfo.addresses.map((address, i) => (
                                <div className='billing-info' key={i}>

                                    <div className='billing-data'>
                                        <h4>Name</h4>
                                        <p style={{
                                            textTransform: 'capitalize',
                                        }}>{userInfo.name}</p>
                                    </div>
                                    <div className='billing-data'>
                                        <h4>Address</h4>
                                        <p>{address.address} - {address.postalCode}</p>
                                    </div>
                                    <div className='billing-data'>
                                        <h4>Country</h4>
                                        <p>{address.country}</p>
                                    </div>
                                    <div className='billing-data'>
                                        <h4>State</h4>
                                        <p>{address.state}</p>
                                    </div>
                                    <div className='billing-data'>
                                        <h4>City</h4>
                                        <p>{address.city}</p>
                                    </div>
                                    {/*    EDIT BUTTON*/}
                                    <Button disabled={address?.isPrimary} sx={{alignSelf: 'end'}}
                                            onClick={() => handleDelete(address, 'Shipping address')}>Set
                                        Default</Button>
                                    <Button onClick={() => handleEditAddress(address)} sx={{alignSelf: 'end'}}
                                            variant='outlined'>Edit Shipping
                                        Information</Button>
                                    {userInfo.addresses.length > 1 && <Divider sx={{marginBottom: '30px'}}/>}
                                </div>

                            ))}
                    </Paper>
                </Grid>

                {/*PAYMENT METHODS*/}
                <Grid item md={12}>
                    <h2>Payments Methods</h2>
                    <Paper className='billing-data-wrapper' elevation={3}>
                        <Button onClick={handleAddPaymentMethod} className='add-payment-btn' variant='contained'>Add
                            Payment
                            Method</Button>
                        {userInfo?.paymentMethods?.length === 0 ?
                            <h1>You have no payment method</h1> : userInfo?.paymentMethods?.map((method, i) => (
                                <div className='billing-payment-wrapper' key={i}>
                                    <div>
                                        {/*<Checkbox/>*/}
                                        <img
                                            src={method.type === 'mpesa' ? mpesa : method.type === 'masterCard' ? mastercard : method.type === 'paypal' ? paypal : method.type === 'visa' ? visa : ''}/>
                                        <p><span>{method.type}</span> **** {method?.details.number?.slice(-4)}</p>
                                    </div>

                                    <div className='billing-payment-actions'>
                                        <Tooltip title="You can't remove your primary payment Method" arrow>
                                    <span>
                                        <Button onClick={() => handleDelete(method, 'Payment method')}
                                                disabled={method?.isPrimary}
                                                d>Remove</Button>
                                    </span>

                                        </Tooltip>

                                        <Button onClick={() => handleEdit(method)}
                                                sx={{color: '#246fd0'}}>Edit</Button>
                                    </div>
                                </div>
                            ))
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default BillingPayment;
