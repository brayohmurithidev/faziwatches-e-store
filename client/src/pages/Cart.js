import { Grid } from "@mui/material";

const Cart = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        Cart
      </Grid>
      <Grid item xs={12} md={6}>
        Checkout
      </Grid>
    </Grid>
  );
};

export default Cart;
