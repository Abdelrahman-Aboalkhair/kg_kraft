import prisma from "../config/database";

class CartRepository {
  async findCartByUserId(userId: string) {
    return prisma.cart.findUnique({
      where: { userId },
      include: { cartItems: { include: { product: true } } },
    });
  }

  async findCartById(id: string) {
    return prisma.cart.findUnique({
      where: { id },
      include: { cartItems: { include: { product: true } } },
    });
  }

  async createCart(data: { userId?: string; id?: string }) {
    return prisma.cart.create({
      data,
      include: { cartItems: { include: { product: true } } },
    });
  }

  async updateCart(cartId: string, data: { userId: string }) {
    return prisma.cart.update({
      where: { id: cartId },
      data: { userId: data.userId },
      include: { cartItems: true },
    });
  }

  async findCartItem(cartId: string, productId: string) {
    return prisma.cartItem.findFirst({
      where: { cartId, productId },
    });
  }

  async createCartItem(data: {
    cartId: string;
    productId: string;
    quantity: number;
  }) {
    return prisma.cartItem.create({ data });
  }

  async updateCartItem(id: string, data: { quantity: number }) {
    return prisma.cartItem.update({
      where: { id },
      data,
    });
  }

  async deleteCartItem(id: string) {
    return prisma.cartItem.delete({ where: { id } });
  }

  async deleteCartItemsByCartId(cartId: string) {
    return prisma.cartItem.deleteMany({ where: { cartId } });
  }

  async deleteCart(id: string) {
    return prisma.cart.delete({ where: { id } });
  }

  async findCartWithItemsById(id: string) {
    return prisma.cart.findUnique({
      where: { id },
      include: { cartItems: true },
    });
  }
  async createOrder(data: {
    userId: string;
    amount: number;
    orderItems: { productId: string; quantity: number }[];
  }) {
    return prisma.order.create({
      data: {
        userId: data.userId,
        amount: data.amount,
        orderItems: {
          create: data.orderItems,
        },
      },
      include: { orderItems: true },
    });
  }
}

export default CartRepository;
