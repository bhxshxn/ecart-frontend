import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentMethodScreen = props => {
  const cart = useSelector(state => state.cart);
  const userSignIn = useSelector(state => state.userSignIn);

  const { shippingAddress } = cart;
  const { userInfo } = userSignIn;

  useEffect(() => {
    if (!userInfo) return props.history.push('/signin');
  }, [userInfo, props.history]);

  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Razorpay');
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div >
            <label htmlFor='Razorpay' className='pointer'>
              <input
                type='radio'
                id='Razorpay'
                value='Razorpay'
                name='paymentMethod'
                required
                checked
                onChange={e => setPaymentMethod(e.target.value)}
              />
              {'      '}
              Razorpay
            </label>
          </div>
        </div>
        <div>
          <div>
            {/* <label htmlFor='COD' className='pointer'>
              <input
                type='radio'
                id='COD'
                value='COD'
                name='paymentMethod'
                required
                onChange={e => setPaymentMethod(e.target.value)}
              />
              {'      '}
              COD
            </label> */}
          </div>
        </div>
        <div>
          <button className='primary' type='submit'>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodScreen;
