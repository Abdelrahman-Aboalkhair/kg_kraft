import { Request } from "express";
import CartService from "../services/cartService";

export const getEffectiveCart = async (
  req: Request,
  cartService: CartService
) => {
  if (req.user) {
    console.log("found user to get the cart => ", req.user);
    const userId = req.user.id;
    return await cartService.getCart({ userId });
  }

  if (req.session.cart?.id) {
    console.log("Found session cart => ", req.session.cart);
    return await cartService.getCart({ cartId: req.session.cart.id });
  }

  const newCart = await cartService.getCart();
  console.log("Created new cart => ", newCart);
  req.session.cart = { id: newCart.id, items: [] };
  return newCart;
};

export const handleCartMergeAfterLogin = async (
  req: Request,
  cartService: CartService | undefined,
  userId: string
) => {
  const guestCartId = req.session.cart?.id;
  if (guestCartId) {
    await cartService?.mergeGuestCartIntoUserCart(guestCartId, userId);
    delete req.session.cart;
    console.log("Guest cart merged and session cart deleted.");
  }
};
