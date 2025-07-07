import { prisma } from "../db";
import AppError from "../utils/AppError";

const createOrder = async (req: any, res: any, next: any) => {
  try {
    const { items, buyer, seller } = req.body;

    const createdOrder = await prisma.order.create({
      data: {
        buyerId: buyer,
        sellerId: seller,
        items: {
          create: items.map((item: any) => ({
            serviceId: item.service_id,
            quantity: item.quantity,
            extras: item.extras,
            price: item.price,
            time: item.time,
            status: item.status || 'pending'
          }))
        }
      },
      include: {
        buyer: true,
        seller: true,
        items: {
          include: {
            service: true
          }
        }
      }
    });

    res.send({ message: "Order created successfully!", createdOrder });
  } catch (error) {
    return next(new AppError("Failed to create order.", 500));
  }
};

const getAllOrders = async (req: any, res: any, next: any) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        buyer: true,
        seller: true,
        items: {
          include: {
            service: true
          }
        }
      }
    });

    res.send(orders);
  } catch (error) {
    return next(new AppError("Failed to fetch orders.", 500));
  }
};

const getOrderById = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const orderId = parseInt(req.params.id);
    
    // Check if ID is a valid number
    if (isNaN(orderId)) {
      return next(new AppError("Invalid Order ID.", 400));
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: true,
        seller: true,
        items: {
          include: {
            service: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    if (!order) {
      return next(new AppError("Order not found.", 404));
    }

    res.send(order);
  } catch (error) {
    return next(new AppError("Failed to fetch order.", 500));
  }
};

const getOrderByBuyerId = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const buyerId = parseInt(req.params.id);
    
    // Check if ID is a valid number
    if (isNaN(buyerId)) {
      return next(new AppError("Invalid Buyer ID.", 400));
    }

    const orders = await prisma.order.findMany({
      where: { buyerId: buyerId },
      include: {
        buyer: true,
        seller: true,
        items: {
          include: {
            service: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    res.send({ order: orders });
  } catch (error) {
    return next(new AppError("Failed to fetch orders.", 500));
  }
};

const getOrderBySellerId = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const sellerId = parseInt(req.params.id);
    
    // Check if ID is a valid number
    if (isNaN(sellerId)) {
      return next(new AppError("Invalid Seller ID.", 400));
    }

    const orders = await prisma.order.findMany({
      where: { sellerId: sellerId },
      include: {
        buyer: true,
        seller: true,
        items: {
          include: {
            service: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    res.send({ orders });
  } catch (error) {
    return next(new AppError("Failed to fetch orders.", 500));
  }
};

const updateOrderStatus = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const orderId = parseInt(req.params.id);
    
    // Check if ID is a valid number
    if (isNaN(orderId)) {
      return next(new AppError("Invalid Order ID.", 400));
    }

    // Find the order first
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true
      }
    });

    // Check if the order exists
    if (!order) return next(new AppError("Order not found!", 404));

    // Update the status of the first item (assuming single item orders)
    if (order.items.length > 0) {
      const updatedOrder = await prisma.orderItem.update({
        where: { id: order.items[0].id },
        data: { status: req.body.status },
        include: {
          order: {
            include: {
              buyer: true,
              seller: true,
              items: {
                include: {
                  service: true
                }
              }
            }
          }
        }
      });

      res.send({ message: "Order status updated successfully!", updatedOrder: updatedOrder.order });
    } else {
      return next(new AppError("No items found in order.", 404));
    }
  } catch (error) {
    return next(new AppError("Failed to update order status.", 500));
  }
};

const updateOrderChat = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const orderId = parseInt(req.params.id);
    
    // Check if ID is a valid number
    if (isNaN(orderId)) {
      return next(new AppError("Invalid Order ID.", 400));
    }

    // Update the chat history
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { chatHistory: req.body.chatHistory },
      include: {
        buyer: true,
        seller: true,
        items: {
          include: {
            service: true
          }
        }
      }
    });

    res.send({ message: "Order chat updated successfully!", updatedOrder });
  } catch (error) {
    return next(new AppError("Failed to update order chat.", 500));
  }
};

const updateOrderReviewStatus = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const orderId = parseInt(req.params.id);
    
    // Check if ID is a valid number
    if (isNaN(orderId)) {
      return next(new AppError("Invalid Order ID.", 400));
    }

    // Update the review status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { reviewed: req.body.reviewed },
      include: {
        buyer: true,
        seller: true,
        items: {
          include: {
            service: true
          }
        }
      }
    });

    res.send({ message: "Order review status updated successfully!", updatedOrder });
  } catch (error) {
    return next(new AppError("Failed to update order review status.", 500));
  }
};

const deleteOrder = async (req: any, res: any, next: any) => {
  try {
    // Convert string ID to integer for PostgreSQL
    const orderId = parseInt(req.params.id);
    
    // Check if ID is a valid number
    if (isNaN(orderId)) {
      return next(new AppError("Invalid Order ID.", 400));
    }

    // Delete the order (this will cascade delete order items due to foreign key constraints)
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
      include: {
        buyer: true,
        seller: true,
        items: {
          include: {
            service: true
          }
        }
      }
    });

    res.send({ message: "Order deleted successfully!", deletedOrder });
  } catch (error) {
    return next(new AppError("Order was not found or failed to delete.", 500));
  }
};

export {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByBuyerId,
  getOrderBySellerId,
  updateOrderStatus,
  updateOrderReviewStatus,
  updateOrderChat,
  deleteOrder,
};
